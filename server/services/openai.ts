import OpenAI from "openai";
import { type MedicalAnalysis, type MedicineInfo, medicalAnalysisSchema, medicineInfoSchema } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || process.env.API_KEY 
});

export async function analyzeMedicalReport(
  extractedText: string, 
  reportType?: string, 
  personContext?: { name: string; age?: number; sex?: string; height?: number; weight?: number }
): Promise<MedicalAnalysis> {
  try {
    let contextInfo = "";
    let bmiInfo = "";
    
    if (personContext) {
      // Calculate BMI if height and weight are available
      if (personContext.height && personContext.weight) {
        const heightInM = personContext.height / 100;
        const bmi = (personContext.weight / (heightInM * heightInM)).toFixed(1);
        bmiInfo = `- BMI: ${bmi} (calculated from height/weight)`;
      }
      
      contextInfo = `
    
    PATIENT PROFILE FOR PERSONALIZED ANALYSIS:
    - Name: ${personContext.name}
    ${personContext.age ? `- Age: ${personContext.age} years old` : ''}
    ${personContext.sex ? `- Sex: ${personContext.sex}` : ''}
    ${personContext.height ? `- Height: ${personContext.height} cm` : ''}
    ${personContext.weight ? `- Weight: ${personContext.weight} kg` : ''}
    ${bmiInfo}
    
    IMPORTANT: Use this demographic information to:
    1. Apply age and sex-specific reference ranges for all values
    2. Mention the person by name throughout the analysis
    3. Consider demographic factors (e.g., age-related normal variations, sex-specific ranges)
    4. Explain how results relate specifically to someone of their age, sex, and physical characteristics
    5. Use BMI context if weight/height related findings are present`;
    }

    const prompt = `You are a medical expert providing personalized explanations of medical reports in simple, non-technical language.
    
    Analyze this medical report and provide a detailed, person-specific explanation:
    
    "${extractedText}"${contextInfo}
    
    Respond with a JSON object containing:
    - summary: A personalized overview${personContext ? ` specifically for ${personContext.name}, mentioning their age/sex where relevant to the findings` : ''}
    - normalResults: Array of normal findings with person-specific context (e.g., "For a ${personContext?.age}-year-old ${personContext?.sex?.toLowerCase()}, this cholesterol level of X is excellent/normal...")
    - needsAttention: Array of concerning findings with demographic context (e.g., "For someone of ${personContext?.name}'s age and sex, this reading suggests...")
    - explanation: A detailed paragraph${personContext ? ` addressing ${personContext.name} personally, explaining how their age, sex, and physical characteristics relate to these results. Use "your" when appropriate` : ''}
    - reportType: The type of medical report
    
    PERSONALIZATION REQUIREMENTS:
    ${personContext ? `
    - Address ${personContext.name} by name throughout
    - Reference their specific age (${personContext.age}) and sex (${personContext.sex}) in explanations
    - Apply age/sex-specific normal ranges where applicable
    - Consider their BMI context if relevant to findings
    - Use second person ("your results show...") for more personal connection
    ` : ''}
    
    Use simple language, avoid medical jargon, and make the explanation feel personalized and relevant to their specific demographic profile.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a compassionate medical information assistant specializing in personalized explanations. Your role is to:
          1. Explain medical reports in simple, personalized terms using the patient's demographic information
          2. Apply age and sex-specific reference ranges when interpreting results
          3. Address the patient by name and use "your" to create personal connection
          4. Consider how age, sex, height, weight, and BMI relate to the findings
          5. Never provide medical advice or treatment recommendations
          6. Always encourage consulting healthcare professionals for medical decisions
          7. Make explanations feel relevant and specific to the individual patient`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return medicalAnalysisSchema.parse(result);
  } catch (error) {
    console.error("Error analyzing medical report:", error);
    throw new Error("Failed to analyze medical report. Please try again.");
  }
}

export async function analyzeMedicalImage(base64Image: string, fileType: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all visible text from this medical report image. Focus on medical data, test results, measurements, and any diagnostic information. Return only the extracted text content."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${fileType};base64,${base64Image}`
              }
            }
          ],
        },
      ],
      max_tokens: 1000,
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("Error analyzing medical image:", error);
    throw new Error("Failed to extract text from image. Please try again.");
  }
}

export async function getMedicineInformation(medicineName: string): Promise<MedicineInfo> {
  try {
    const prompt = `Provide detailed information about the medicine "${medicineName}" in simple, patient-friendly language.
    
    Please respond with a JSON object containing:
    - medicineName: The name of the medicine
    - medicineType: What type of medicine it is (e.g., "Pain reliever", "Antibiotic", etc.)
    - whatItDoes: Simple explanation of what this medicine does
    - expectedEffects: Array of what patients can expect when taking this medicine
    - sideEffects: Object with three arrays:
      - common: Common side effects (>1% of patients)
      - rare: Rare side effects (<1% of patients) 
      - serious: Serious side effects that require immediate medical attention
    - contraindications: Array of who should not take this medicine
    - importantNotes: Array of important reminders about dosage, interactions, etc.
    
    Use simple language, avoid medical jargon, and focus on practical information patients need to know. Do not provide dosage recommendations or medical advice.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful pharmaceutical information assistant. Provide medicine information in simple terms without giving medical advice or specific dosage recommendations. Always remind users to consult healthcare professionals."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return medicineInfoSchema.parse(result);
  } catch (error) {
    console.error("Error getting medicine information:", error);
    throw new Error("Failed to get medicine information. Please try again.");
  }
}
