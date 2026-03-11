import Anthropic from "@anthropic-ai/sdk";
import { tools, WRITE_TOOLS } from "./lib/tools.js";
import { executeTool } from "./lib/tool-executor.js";

const SYSTEM_PROMPT = `You are a helpful WordPress assistant for persuadables.com. Sara (the site owner) will describe changes she wants in plain English. Your job is to figure out which WordPress API calls to make and carry them out.

Guidelines:
- Always start by reading (GET) before writing. For example, if asked to update a page, first get_pages to find the correct ID.
- Explain what you're doing in simple, non-technical language.
- When you need to make a change (update, create, delete), describe exactly what you plan to do so Sara can confirm.
- Be careful with content — preserve existing formatting when making targeted edits.
- If something fails, explain what went wrong and suggest next steps.
- Keep responses concise and friendly.`;

const MAX_ITERATIONS = 10;

async function runAgentLoop(client, messages) {
  let iterations = 0;

  while (iterations < MAX_ITERATIONS) {
    iterations++;

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      tools,
      messages,
    });

    // Collect text and tool_use blocks
    const textParts = [];
    const toolUses = [];

    for (const block of response.content) {
      if (block.type === "text") textParts.push(block.text);
      if (block.type === "tool_use") toolUses.push(block);
    }

    // No tool calls — return the text response
    if (toolUses.length === 0) {
      return { type: "text", text: textParts.join("\n") };
    }

    // Check if any tool is a WRITE tool — needs confirmation
    const writeToolUse = toolUses.find((t) => WRITE_TOOLS.has(t.name));
    if (writeToolUse) {
      return {
        type: "confirmation",
        text: textParts.join("\n"),
        toolName: writeToolUse.name,
        toolInput: writeToolUse.input,
        toolUseId: writeToolUse.id,
        // Save full message history + assistant response so we can resume
        messages: [...messages, { role: "assistant", content: response.content }],
      };
    }

    // All tools are GET — execute them all and continue loop
    messages.push({ role: "assistant", content: response.content });

    const toolResults = [];
    for (const tu of toolUses) {
      const result = await executeTool(tu.name, tu.input);
      toolResults.push({
        type: "tool_result",
        tool_use_id: tu.id,
        content: JSON.stringify(result),
      });
    }

    messages.push({ role: "user", content: toolResults });
  }

  return { type: "text", text: "I reached the maximum number of steps. Please try a more specific request." };
}

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured." });

  const client = new Anthropic({ apiKey });
  const { action, message, history, confirmation } = req.body;

  try {
    if (action === "plan") {
      // Build messages from history + new user message
      const messages = [...(history || [])];
      if (message) messages.push({ role: "user", content: message });

      const result = await runAgentLoop(client, messages);
      return res.json(result);
    }

    if (action === "execute") {
      // Execute the confirmed write tool
      const { toolName, toolInput, toolUseId, messages } = confirmation;
      const result = await executeTool(toolName, toolInput);

      // Feed result back to Claude for a summary
      const updatedMessages = [
        ...messages,
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: toolUseId,
              content: JSON.stringify(result),
            },
          ],
        },
      ];

      const summaryResult = await runAgentLoop(client, updatedMessages);
      return res.json(summaryResult);
    }

    return res.status(400).json({ error: "Invalid action. Use 'plan' or 'execute'." });
  } catch (err) {
    console.error("Agent error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
