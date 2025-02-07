// // routes/assessmentRoutes.ts
// import express, { Response } from 'express';
// import { AssessmentManager } from '../services/AssessmentManager';
// import { GeminiClient } from '../services/GeminiClient';
// import { PromptManager } from '../services/PromptManager';
// import { AssessmentResult, IAssessmentResult } from '../models/AssesmentResults';
// import { AuthRequest, verifyToken as authenticateToken } from '../middleware/authMiddleware';

// const router = express.Router();

// // Initialize services
// const geminiClient = new GeminiClient();
// const promptManager = new PromptManager(geminiClient);
// const assessmentManager = new AssessmentManager();

// router.post('/submit', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     const { answers, studentInfo } = req.body;
//     const userId = req.user?.userId;

//     if (!answers || !studentInfo) {
//       res.status(400).json({ success: false, error: 'Missing required assessment data' });
//       return;
//     }

//     const traitScores = assessmentManager.calculateScores(answers);
//     const careerAnalysis = await geminiClient.generateCareerAnalysis(traitScores, studentInfo);
//     const careerGoal = await promptManager.extractCareerGoal(answers);
//     const topicReports = await promptManager.generateTopicReports(careerAnalysis, careerGoal, studentInfo.name);

//     const result = await AssessmentResult.create({
//       userId,
//       studentInfo,
//       answers,
//       traitScores,
//       careerAnalysis,
//       topicReports,
//       careerGoal
//     });

//     res.json({
//       success: true,
//       resultId: result._id,
//       traitScores,
//       careerAnalysis,
//       topicReports,
//       careerGoal
//     });
//   } catch (error) {
//     console.error('Assessment submission error:', error);
//     res.status(500).json({ success: false, error: 'Failed to process assessment' });
//   }
// });

// router.get('/results/:resultId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     const result = await AssessmentResult.findOne({
//       _id: req.params.resultId,
//       userId: req.user?.userId
//     });

//     if (!result) {
//       res.status(404).json({
//         success: false,
//         error: 'Assessment result not found'
//       });
//       return;
//     }

//     res.json({
//       success: true,
//       result
//     });
//   } catch (error) {
//     console.error('Error fetching assessment result:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to fetch assessment result'
//     });
//   }
// });

// export default router;