const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/generate-tags", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Extract 3 to 5 lowercase tags (no hashtags or punctuation) from the following text. Respond only with JSON (no markdown).

Text:
"${content}"`,
    });

    let raw = result.text.trim();

    if (raw.startsWith("```")) {
      raw = raw.replace(/```json|```/g, "").trim();
    }

    const parsed = JSON.parse(raw);
    res.json(parsed);
  } catch (err) {
    console.error("Gemini tag generation error:", err);
    res.status(500).json({ error: "Failed to generate tags" });
  }
});

module.exports = router;
