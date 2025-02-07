// services/PromptManager.ts
import { GeminiClient } from './GeminiClient';
import { StudentInfo, TopicReport } from './types';

export class PromptManager {
  private geminiClient: GeminiClient;
  
  constructor(geminiClient: GeminiClient) {
    this.geminiClient = geminiClient;
  }

  async extractCareerGoal(answers: Record<string, any>): Promise<string> {
    // Convert answers to text for analysis
    const relevantAnswers = [
      answers.question27,
      answers.question30,
      answers.question32,
      answers.question46,
      answers.question47,
      answers.question48,
      answers.question49,
      answers.question50
    ].filter(Boolean).join(' ');

    const prompt = `
    Based on these student responses:
    ${relevantAnswers}
    
    What is the primary career direction or goal indicated? Respond with only the career goal or field name.`;

    try {
      const response = await this.geminiClient.generateContent(prompt, 100, 0.3);
      return response.trim() || 'Career Exploration';
    } catch (error) {
      console.error('Failed to extract career goal:', error);
      return 'Career Exploration';
    }
  }

  async generateTopicReports(
    context: string,
    careerGoal: string,
    studentName: string
  ): Promise<Record<string, TopicReport>> {
    const reports: Record<string, TopicReport> = {};
    
    for (const [topic, promptTemplate] of Object.entries(this.topicPrompts)) {
      try {
        const prompt = promptTemplate
          .replace('{student_name}', studentName)
          .replace('{career_goal}', careerGoal);
          
        const content = await this.geminiClient.generateContent(prompt, 2048, 0.7);
        reports[topic] = {
          title: this.getTopicTitle(topic),
          content
        };
        
        // Add delay between API calls to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Failed to generate ${topic} report:`, error);
        reports[topic] = {
          title: this.getTopicTitle(topic),
          content: 'Failed to generate report due to technical error.'
        };
      }
    }
    
    return reports;
  }

  private readonly topicPrompts: Record<string, string> = {
    personal_traits: `
    Analyze {student_name}'s suitability for {career_goal} (1000+ words):
    1. Core competencies assessment
    2. Personality alignment with career demands
    3. Skill gap analysis
    4. Development roadmap
    5. Mentorship recommendations`,

    skills_excel: `
    Comprehensive skills development plan for {career_goal}:
    1. Technical skills matrix (priority levels)
    2. Soft skills development timeline
    3. Learning resources (courses, books, podcasts)
    4. Practical application projects
    5. Certification roadmap
    6. Industry networking strategy`,

    top_careers: `
    8 alternative careers for {career_goal} (500 words each):
    - Career title
    - Required qualifications
    - Skill transfer matrix
    - Growth projections (1/5/10 years)
    - Transition roadmap
    - Industry demand analysis
    - Salary benchmarks`,

    career_intro: `
    Comprehensive 5-page guide to {career_goal}:
    1. Role evolution history
    2. Day-to-day responsibilities
    3. Industry verticals
    4. Global market trends
    5. Regulatory landscape
    6. Technology adoption
    7. Success case studies`,

    career_education: `
    Education plan for {career_goal}:
    1. Global degree options (BS/MS/PhD)
    2. Certification hierarchy
    3. Online learning pathways
    4. Institution rankings
    5. Admission strategies
    6. Scholarship opportunities`,

    indian_colleges: `
    10 Indian institutions for {career_goal} (detailed):
    - NIRF/NAAC rankings
    - Program structure
    - Admission process
    - Placement statistics (3 years)
    - Industry partnerships
    - Research facilities
    - Notable alumni
    - Campus infrastructure
    - Fee structure
    - Scholarship programs`,

    industry_analysis: `
    5-year industry analysis for {career_goal}:
    1. Market size projections
    2. Key players analysis
    3. Regulatory challenges
    4. Technology adoption
    5. Sustainability initiatives
    6. Regional opportunities`
  };

  private getTopicTitle(topic: string): string {
    const titles: Record<string, string> = {
      personal_traits: 'Personal Traits Analysis',
      skills_excel: 'Skills Development Plan',
      top_careers: 'Alternative Career Paths',
      career_intro: 'Career Introduction Guide',
      career_education: 'Educational Roadmap',
      indian_colleges: 'Indian Educational Institutions',
      industry_analysis: 'Industry Analysis'
    };
    return titles[topic] || topic;
  }
}