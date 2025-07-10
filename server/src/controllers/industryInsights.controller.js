import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import User from "../models/User.model.js";

const AZURE_ENDPOINT = "https://models.github.ai/inference";
const GPT_MODEL = "openai/gpt-4.1";

const getIndustryInsights = async (req, res) => {
  // const { id } = req.params;

  try {
    const client = ModelClient(
      AZURE_ENDPOINT,
      new AzureKeyCredential(process.env.GITHUB_TOKEN)
    );

    const prompt = `You are an expert in industry insights.

Return a structured JSON object analyzing the sofware industry and domains with the following keys:
{
  "trends": [{ "label": "AI", "value": 80 }, { "label": "Cloud Computing", "value": 70 }],
  "challenges": [{ "label": "Talent Shortage", "value": 65 }],
  "opportunities": [{ "label": "Automation", "value": 90 }],
  "future": [{ "label": "5-Year Growth Projection", "value": 85 }],
  "past": [{ "label": "Past 5-Year Performance", "value": 75 }],
  "salary": [
  { "label": "Entry Level", "value": 90000 },
  { "label": "Average", "value": 135000 },
  { "label": "Senior Level", "value": 180000 }
]

  
}

⚠️ Return ONLY JSON. No explanation, no markdown.`;

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "" },
          { role: "user", content: prompt },
        ],
        temperature: 1,
        top_p: 1,
        model: GPT_MODEL,
      },
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const generatedText = response.body.choices[0].message.content;
    console.log({ generatedText });

    return res.status(200).json({
      message: "Insights generated successfully using GPT-4.1",
      insights:  JSON.parse(generatedText),
    });
  } catch (err) {
    console.error("Error generating insights (GPT):", err);
    return res.status(500).json({ error: "Failed to generate insights" });
  }
};

export { getIndustryInsights };
