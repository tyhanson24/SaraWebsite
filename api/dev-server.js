import express from "express";

const app = express();
app.use(express.json({ limit: "1mb" }));

// Dynamic import for the serverless functions
async function loadHandler(mod) {
  const module = await import(mod);
  return module.default;
}

app.all("/api/agent", async (req, res) => {
  const handler = await loadHandler("./agent.js");
  handler(req, res);
});

app.all("/api/wp", async (req, res) => {
  const handler = await loadHandler("./wp.js");
  handler(req, res);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API dev server running on http://localhost:${PORT}`);
});
