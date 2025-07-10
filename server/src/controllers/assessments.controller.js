import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import User from "../models/User.model.js";

const AZURE_ENDPOINT = "https://models.github.ai/inference";
const GPT_MODEL = "openai/gpt-4.1";

const generateQuestions = async (req, res) => {
  const { id } = req.params;
  const { skills, position } = req.body;

  try {
    const client = ModelClient(
      AZURE_ENDPOINT,
      new AzureKeyCredential(process.env.GITHUB_TOKEN)
    );

    const prompt = buildPrompt({
      skills,
      position,
    });

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

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    console.log({ generatedText });

    user.assessments = generatedText;
    await user.save();

    return res.status(200).json({
      message: "Asssessment questions generated successfully using GPT-4.1",
      assessments: generatedText,
    });
  } catch (err) {
    console.error("Error generating assessment questions (GPT):", err);
    return res.status(500).json({ error: "Failed to generate questions" });
  }
};


const buildPrompt = ({ skills, position }) => {
  return `You are an expert interviewer with deep understanding of technical interviews.
        Generate a set of 50 interview questions along with the answers of each question tailored to the following skills and industry:
        Skills: ${skills}
        position: ${position}
        The questions should be challenging, relevant, and designed to assess the candidate's expertise in these areas.`;
};

export { generateQuestions };
