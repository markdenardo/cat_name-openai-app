const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/api/generate-description", async (req, res) => {
  const { catName } = req.body;

  try {
    const prompt = `Describe a cat named ${catName}.`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7,
    });

    const description = response.data.choices[0].text.trim();
    res.json({ description });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate description" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
