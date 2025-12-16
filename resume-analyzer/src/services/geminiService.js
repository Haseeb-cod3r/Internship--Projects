import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey:import.meta.env.VITE_GOOGLE_API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    overallScore: {
      type: Type.INTEGER,
      description: "A score from 0 to 100 representing the quality of the resume.",
    },
    summary: {
      type: Type.STRING,
      description: "A professional executive summary of the candidate's profile.",
    },
    technicalSkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of technical hard skills extracted.",
    },
    softSkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of soft skills extracted.",
    },
    matchLevel: {
      type: Type.STRING,
      enum: ["High", "Medium", "Low"],
      description: "How well the candidate fits the provided job description or general industry standards.",
    },
    strengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Key strong points of the resume.",
    },
    weaknesses: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Areas where the resume is lacking or could be improved.",
    },
    improvementPlan: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Actionable steps to improve the resume score.",
    },
  },
  required: [
    "overallScore",
    "summary",
    "technicalSkills",
    "softSkills",
    "matchLevel",
    "strengths",
    "weaknesses",
    "improvementPlan",
  ],
};

export const analyzeResume = async (
  base64Data,
  mimeType,
  jobDescription
) => {
  const model = "gemini-2.5-flash";

  let prompt = `You are an expert HR Consultant and Technical Recruiter with 20 years of experience. 
  Analyze the attached resume.`;

  if (jobDescription.trim()) {
    prompt += `
    SPECIFICALLY analyze this resume against the following Job Description:
    ---
    ${jobDescription}
    ---
    Evaluate how well the candidate fits this specific role.
    `;
  } else {
    prompt += `
    Since no specific job description was provided, evaluate this resume based on general industry standards for the role implied by the candidate's experience.
    `;
  }

  prompt += `
  Provide a critical, honest, and constructive analysis. 
  Identify the ATS readability, impact of bullet points, and clarity of the career trajectory.
  Return the response in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.4, 
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
};
