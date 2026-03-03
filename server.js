import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

// Serve static files from the "public" folder (this makes widget.js accessible)
app.use(express.static("public"));

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are a friendly lead-capture assistant for Quality Spa Care & Repair,
a hot tub and spa maintenance and repair business based in Heber City, Utah.

Your goals:
- Understand the visitor's hot tub issue.
- Ask for: name, phone number, address (city + street), and a brief description of the problem.
- Be warm, concise, and local-sounding.
- Do NOT give exact prices. You can say "we'll confirm pricing when we talk."
- Once you have name, phone, and address, say you'll pass it to the tech.

Always keep answers short and conversational.
`;

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Hot tub chat bot listening on port ${PORT}`);
});
