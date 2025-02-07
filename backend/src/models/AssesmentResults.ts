// // models/AssessmentResult.ts
// import mongoose, { Document } from 'mongoose';

// interface IStudentInfo {
//   name: string;
//   // Add other student info fields as needed
// }

// export interface IAssessmentResult extends Document {
//   userId: mongoose.Types.ObjectId;
//   studentInfo: IStudentInfo;
//   answers: any[];
//   traitScores: Record<string, any>;
//   careerAnalysis: string;
//   topicReports: any[];
//   careerGoal: string;
// }



// const assessmentResultSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, required: true },
//   studentInfo: { type: Object, required: true },
//   answers: { type: Array, required: true },
//   traitScores: { type: Object, required: true },
//   careerAnalysis: { type: String, required: true },
//   topicReports: { type: Array, required: true },
//   careerGoal: { type: String, required: true }
// });

// export const AssessmentResult = mongoose.model<IAssessmentResult>('AssessmentResult', assessmentResultSchema);