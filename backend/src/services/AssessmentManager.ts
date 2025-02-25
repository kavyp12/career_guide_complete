// import fs from 'fs';
// import path from 'path';

// export class AssessmentManager {
//   private scoringSystem: any;
//   private traitScores: Record<string, number>;

//   constructor() {
//     const scoringPath = path.join(__dirname, '../config/scoring_system.json');
//     this.scoringSystem = JSON.parse(fs.readFileSync(scoringPath, 'utf-8'));
//     this.traitScores = this.initializeTraitScores();
//   }

//   private initializeTraitScores(): Record<string, number> {
//     return {
//         'Logical Thinking': 0,
//         'Analytical Abilities': 0,
//         'Verbal Skills': 0,
//         'Creative Thinking': 0,
//         'Learning Speed': 0,
//         'Problem-solving Abilities': 0,
//         'Critical Thinking': 0,
//         'Spatial Reasoning': 0,
//         'People Skills': 0,
//         'Sports Participation': 0,
//         'Physical Activity': 0,
//         'Leadership Roles': 0,
//         'Teamwork': 0,
//         'Clubs/Interest Groups': 0,
//         'Technological Affinity': 0,
//         'Social Engagement': 0,
//         'Volunteering and Social Engagement': 0,
//         'Social Responsibility': 0,
//         'Awards and Recognitions': 0,
//         'Online Certifications': 0,
//         'Competitions/Olympiads': 0,
//         'Independence': 0,
//         'Risk-taking': 0,
//         'Communication Skills': 0,
//         'Work Ethic': 0,
//         'Planning': 0,
//         'Discipline': 0,
//         'Career Interest Surveys': 0,
//         'Digital Footprint': 0,
//         'Online Presence': 0,
//         'Nature Smartness': 0,
//         'Picture Smartness': 0,
//         'Music Smartness': 0,
//         'Memory Smartness': 0,
//         'Adaptability': 0,
//         'Resilience': 0,
//         'Empathy': 0,
//         'Decisiveness': 0,
//         'Passive Activity': 0,
//         'Grade Trends': 0,
//         'Interest in Specific Subjects': 0,
//         'Technical Skills': 0,
//         'Attention to Detail': 0,
//         'Creativity': 0,
//         'Artistic Skills': 0,
//         'Social Awareness': 0,
//         'Leadership': 0,
//         'Decision Making': 0,
//         'Collaboration': 0,
//         'Self-reliance': 0,
//         'Math Skills': 0,
//         'Writing Skills': 0,
//         'Physical Skills': 0,
//         'Hand-eye Coordination': 0,
//         'Stability Seeking': 0,
//         'Financial Management': 0,
//         'Solitary Work': 0,
//         'Sustainability': 0,
//         'Logic': 0,
//         'Curiosity': 0,
//         'Financial Literacy': 0,
//         'Conventional Thinking': 0,
//         'Independent Thinking': 0,
//         'Science and Research': 0,
//         'Public Speaking': 0,
//         'Networking': 0,
//         'Aesthetic Sense': 0,
//         'Market Dynamics': 0,
//         'Economics': 0,
//         'Artistic Expression': 0,
//         'Creative Freedom': 0,
//         'Emotional Intelligence': 0,
//         'Negotiation': 0,
//         'Humanitarian Work': 0,
//         'Research Skills': 0,
//         'Business Acumen': 0,
//         'Service Orientation': 0,
//         'Written Communication': 0,
//         'Physical Endurance': 0,
//         'Machine Learning': 0,
//         'Designing': 0,
//         'Comfort with Technology': 0,
//         'Social Interaction': 0,
//         'Confidence': 0,
//         'Creative Problem Solving': 0,
//         'Future-Oriented Thinking': 0,
//         'Listening Skills': 0,
//         'Crisis Management': 0,
//         'People Management': 0,
//         'Arts and Humanities': 0,
//         'Athletic Ability': 0,
//         'Data Analysis': 0,
//         'Mental Stamina': 0,
//         'Engineering': 0,
//         'Scientific Research': 0,
//         'Customer Relations': 0,
//         'Human Behavior Analysis': 0,
//         'Public Relations': 0,
//         'Budgeting Skills': 0,
//         'Interpersonal Skills': 0,
//         'Innovation': 0,
//         'Writing': 0,
//         'Entrepreneurial Spirit': 0,
//         'Social Skills': 0,
//         'Environmental Science': 0,
//         'Tradition': 0,
//         'Risk Taking': 0,
//         'Coding': 0,
//         'Technical Accuracy': 0,
//         'Precision': 0,
//         'Persuasion': 0,
//         'Market Analysis': 0,
//         'Psychology': 0,
//         'Artificial Intelligence': 0,
//         'Experimental Thinking': 0,
//         'Business': 0,
//         'Entrepreneurship': 0,
//         'Long-term Planning': 0,
//         'Compassion': 0,
//         'Big Picture Thinking': 0,
//         'Visionary Thinking': 0
      
//     };
//   }

//   public calculateScores(answers: Record<string, any>): Record<string, number> {
//     // Reset scores
//     this.traitScores = this.initializeTraitScores();

//     // Process each answer
//     for (const [questionId, answer] of Object.entries(answers)) {
//       if (!this.scoringSystem[questionId]) continue;

//       if (Array.isArray(answer)) {
//         // Handle multiple choice answers
//         for (const choice of answer) {
//           if (this.scoringSystem[questionId][choice]) {
//             this.addTraitScores(this.scoringSystem[questionId][choice]);
//           }
//         }
//       } else if (this.scoringSystem[questionId][answer]) {
//         // Handle single choice answers
//         this.addTraitScores(this.scoringSystem[questionId][answer]);
//       }
//     }

//     return this.normalizeScores();
//   }

//   private addTraitScores(traitValues: Record<string, number>): void {
//     for (const [trait, value] of Object.entries(traitValues)) {
//       if (trait in this.traitScores) {
//         this.traitScores[trait] += value;
//       }
//     }
//   }

//   private normalizeScores(): Record<string, number> {
//     const maxPossible: Record<string, number> = {};
//     const normalized: Record<string, number> = {};

//     // Calculate maximum possible scores
//     for (const question of Object.values(this.scoringSystem)) {
//       for (const choice of Object.values(question as Record<string, Record<string, number>>)) {
//         for (const [trait, value] of Object.entries(choice as Record<string, number>)) {
//           maxPossible[trait] = Math.max(maxPossible[trait] || 0, value);
//         }
//       }
//     }

//     // Normalize scores
//     for (const [trait, score] of Object.entries(this.traitScores)) {
//       normalized[trait] = maxPossible[trait] > 0
//         ? Math.round((score / maxPossible[trait]) * 100 * 100) / 100
//         : 0;
//     }

//     return normalized;
//   }

//   public getCareerPredictionPrompt(traitScores: Record<string, number>, studentInfo: any): string {
//     return `Based on the following assessment of ${studentInfo.name}:

// Trait Scores Analysis:
// ${JSON.stringify(traitScores, null, 2)}

// Student Profile:
// - Age: ${studentInfo.age}
// - Academic Background: ${studentInfo.academicInfo}
// - Interests: ${studentInfo.interests}
// - Notable Achievements: ${studentInfo.achievements || 'Not provided'}

// Please provide a detailed career analysis including:
// 1. Top 5 recommended career paths based on the trait scores
// 2. Required skills and development roadmap for each career
// 3. Educational requirements and recommended certifications
// 4. Industry growth prospects and future outlook
// 5. Potential challenges and strategies to overcome them`;
//   }
// }

