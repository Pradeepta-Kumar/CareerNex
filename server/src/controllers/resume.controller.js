import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import User from "../models/User.model.js";

const AZURE_ENDPOINT = "https://models.github.ai/inference";
const GPT_MODEL = "openai/gpt-4.1";


const createResume = async (req, res) => {
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
    achievements,
    jobDescription,
    hobbies,
  } = req.body;

  // Validate required fields
  if (!fullname || !email || !phone || !jobDescription) {
    console.log("Missing required fields");
    return res.status(400).json({ 
      success: false,
      message: "Missing required fields" 
    });
  }

  try {
    const client = ModelClient(AZURE_ENDPOINT, new AzureKeyCredential(process.env.GITHUB_TOKEN));

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
      achievements,
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
    console.log({generatedText});

    user.resume = generatedText;
    await user.save();

    return res.status(200).json({
      message: "Cover letter generated successfully using GPT-4.1",
      resume: generatedText,
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
  achievements,
  jobDescription,
  hobbies,
}) => {
  return `
You are a professional resume writer with expertise in ATS (Applicant Tracking Systems).
Generate a resume that is highly optimized (95%+ ATS score) for the following job description. 
The resume must include and be tailored to these details, and use appropriate keywords found in the job description. 
Format the resume in a clean and professional structure suitable for .docx or PDF, and avoid using tables or graphics. 
Use clearly labeled sections with proper headers.

Details:
Full Name: ${fullname}
Email: ${email}
Phone: ${phone}
LinkedIn: ${linkedInURL}
GitHub: ${githubURL}
Address: ${address}
Work Experience: ${experience}
Projects: ${projects}
Skills: ${skills}
Education: ${education}
Certifications: ${certifications}
Achievements: ${achievements}
Hobbies: ${hobbies}

Job Description:
${jobDescription}`;

}

export { createResume };
