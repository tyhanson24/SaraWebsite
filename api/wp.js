import { callWP } from "./lib/wp-client.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { endpoint, method, body } = req.body;
  if (!endpoint) return res.status(400).json({ error: "Missing endpoint" });

  const result = await callWP({ endpoint, method, body });
  return res.json(result);
}
