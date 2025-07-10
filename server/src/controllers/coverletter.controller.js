import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import User from "../models/User.model.js";

const AZURE_ENDPOINT = "https://models.github.ai/inference";
const GPT_MODEL = "openai/gpt-4.1";

const createCoverLetter = async (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    email,
    phone,
    linkedInURL,
    githubURL,
    address,
    projects,
    skills,
    education,
    experience,
    certifications,
    acheivements,
    jobDescription,
    hobbies,
  } = req.body;

  try {
    const client = ModelClient(
      AZURE_ENDPOINT,
      new AzureKeyCredential(process.env.GITHUB_TOKEN)
    );

    const prompt = buildPrompt({
      fullname,
      email,
      phone,
      linkedInURL,
      githubURL,
      address,
      projects,
      skills,
      education,
      experience,
      certifications,
      acheivements,
      jobDescription,
      hobbies,
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

    user.coverLetter = generatedText;
    await user.save();

    return res.status(200).json({
      message: "Cover letter generated successfully using GPT-4.1",
      coverLetter: generatedText,
    });
  } catch (err) {
    console.error("Error generating cover-letter (GPT):", err);
    return res.status(500).json({ error: "Failed to generate cover letter" });
  }
};

const buildPrompt = ({
  fullname,
  email,
  phone,
  linkedInURL,
  githubURL,
  address,
  projects,
  skills,
  education,
  experience,
  certifications,
  acheivements,
  jobDescription,
  hobbies,
}) => {
  return `You are an expert professional cover letter writer with a deep understanding of what gets candidates hired.

Create a personalized, ATS-optimized, concise, and impactful cover letter tailored to the following job. Highlight the candidate's most relevant skills, experience, achievements, and projects. The letter should:
- Be no longer than 350 words.
- Use a formal and confident tone.
- Emphasize the value the candidate brings.
- Include a call to action for an interview.
- Be cleanly formatted.

Candidate Details:
Full Name: ${fullname}
Email: ${email}
Phone: ${phone}
LinkedIn: ${linkedInURL}
GitHub: ${githubURL}
Address: ${address}
Experience: ${experience}
Projects: ${projects}
Skills: ${skills}
Education: ${education}
Certifications: ${certifications}
Achievements: ${acheivements}
Hobbies: ${hobbies}
Date: use curremt day's date
Job Description:
${jobDescription}`;
};

export { createCoverLetter };
