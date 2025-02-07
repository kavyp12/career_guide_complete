// services/GeminiClient.ts
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

export class GeminiClient {
  private model: GenerativeModel;
  private static readonly MAX_RETRIES = 3;
  private static readonly TIMEOUT = 30000;

  constructor() {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_API_KEY is not configured in environment variables');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }
  async generateContent(prompt: string, maxTokens = 2048, temperature = 0.7): Promise<string> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < GeminiClient.MAX_RETRIES; attempt++) {
      try {
        const result = await Promise.race([
          this.model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
              temperature,
              maxOutputTokens: maxTokens,
              topP: 0.9,
            },
          }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), GeminiClient.TIMEOUT)
          ),
        ]);

        const response = await result;
        const responseText = (response as { response: { text: string } }).response.text;
        if (!responseText) {
          throw new Error('Empty response from Gemini API');
        }

        return responseText;
      } catch (error) {
        lastError = error as Error;
        console.error(`Attempt ${attempt + 1} failed:`, error);
        
        // Wait before retrying (exponential backoff)
        if (attempt < GeminiClient.MAX_RETRIES - 1) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    throw new Error(`Failed to generate content after ${GeminiClient.MAX_RETRIES} attempts: ${lastError?.message}`);
  }

  async generateCareerAnalysis(
    traitScores: Record<string, number>, 
    studentInfo: any
  ): Promise<string> {
    const prompt = `
    Based on the following assessment results for ${studentInfo.name}:

    Trait Scores:
    ${Object.entries(traitScores)
      .map(([trait, score]) => `${trait}: ${score}`)
      .join('\n')}

    Student Information:
    - Age: ${studentInfo.age}
    - Academic Background: ${studentInfo.academicInfo}
    - Interests: ${studentInfo.interests}
    ${studentInfo.achievements ? `- Achievements: ${studentInfo.achievements}` : ''}

    Please provide a comprehensive career analysis including:
    1. Top 5 most suitable career paths based on trait scores
    2. Detailed skill requirements and development plan for each career
    3. Educational pathway and certification recommendations
    4. Industry outlook and growth potential
    5. Potential challenges and mitigation strategies
    6. Practical next steps for career preparation

    Format the response in clear sections with detailed explanations.`;

    return this.generateContent(prompt, 4096, 0.8);
  }
}

