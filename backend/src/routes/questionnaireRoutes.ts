// // E:\career-guide\backend\src\routes\questionnaireRoutes.ts
// import express, { Request, Response, NextFunction } from 'express';
// import { verifyToken, AuthRequest } from '../middleware/authMiddleware';
// import Questionnaire from '../models/QuestionnaireModel';
// import User from '../models/User';

// const router = express.Router();

// // Helper function to handle async routes
// const asyncHandler = (fn: (req: Request | AuthRequest, res: Response, next: NextFunction) => Promise<any>) => 
//   (req: Request | AuthRequest, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch(next);
//   };

// router.post('/submit-answers', verifyToken, asyncHandler(async (req: AuthRequest, res: Response) => {
//   try {
//     // Ensure user is authenticated
//     if (!req.user) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     // Find the full user details
//     const user = await User.findById(req.user.userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if user already submitted questionnaire
//     const existingQuestionnaire = await Questionnaire.findOne({ userId: user._id });
//     if (existingQuestionnaire) {
//       return res.status(400).json({ message: 'Questionnaire already submitted' });
//     }

//     // Transform answers into the desired format
//     const transformedAnswers = req.body.answers.reduce((acc: any, curr: any) => {
//       acc[`question${curr.questionId}`] = curr.answer;
//       return acc;
//     }, {});

//     // Create new questionnaire submission
//     const newQuestionnaire = new Questionnaire({
//       userId: user._id,
//       studentName: `${user.firstName} ${user.lastName}`,
//       age: user.age || '', // Add age if available in user profile
//       academicInfo: `${user.standard} Grade`, // Using standard as academic info
//       interests: user.interests || '', // Add interests if available
//       answers: transformedAnswers
//     });

//     // Save questionnaire
//     await newQuestionnaire.save();

//     res.status(201).json({ 
//       message: 'Questionnaire submitted successfully',
//       questionnaireId: newQuestionnaire._id 
//     });
//   } catch (error) {
//     console.error('Questionnaire submission error:', error);
//     res.status(500).json({ message: 'Failed to submit questionnaire' });
//   }
// }));

// // Route to get user's questionnaire
// router.get('/get-answers', verifyToken, asyncHandler(async (req: AuthRequest, res: Response) => {
//   try {
//     // Ensure user is authenticated
//     if (!req.user) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const questionnaire = await Questionnaire.findOne({ userId: req.user.userId });
    
//     if (!questionnaire) {
//       return res.status(404).json({ message: 'No questionnaire found' });
//     }

//     res.status(200).json(questionnaire);
//   } catch (error) {
//     console.error('Error fetching questionnaire:', error);
//     res.status(500).json({ message: 'Failed to fetch questionnaire' });
//   }
// }));

// export default router;



import express, { Request, Response, NextFunction } from 'express';
import { verifyToken, AuthRequest } from '../middleware/authMiddleware';
import Questionnaire from '../models/QuestionnaireModel';
import User from '../models/User';
import axios from 'axios';

const router = express.Router();

// Helper function to handle async routes
const asyncHandler = (fn: (req: Request | AuthRequest, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.post('/submit-answers', verifyToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  try {
    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find the full user details
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user already submitted questionnaire
    const existingQuestionnaire = await Questionnaire.findOne({ userId: user._id });
    if (existingQuestionnaire) {
      return res.status(400).json({ message: 'Questionnaire already submitted' });
    }

    // Transform answers into the desired format
    const transformedAnswers = req.body.answers.reduce((acc: any, curr: any) => {
      acc[`question${curr.questionId}`] = curr.answer;
      return acc;
    }, {});

    // Create new questionnaire submission
    const newQuestionnaire = new Questionnaire({
      userId: user._id,
      studentName: `${user.firstName} ${user.lastName}`,
      age: user.age || '',
      academicInfo: `${user.standard} Grade`,
      interests: user.interests || '',
      answers: transformedAnswers
    });

    // Save questionnaire
    await newQuestionnaire.save();

    // Format data for AI service
    const aiServiceData = {
      studentName: newQuestionnaire.studentName,
      age: newQuestionnaire.age,
      academicInfo: newQuestionnaire.academicInfo,
      sportsInterests: newQuestionnaire.interests,
      answers: transformedAnswers
    };

    try {
      // Send data to AI service
      const aiResponse = await axios.post('http://localhost:3001/api/submit-assessment', aiServiceData);
      
      // Return combined response
      res.status(201).json({ 
        message: 'Questionnaire submitted successfully',
        questionnaireId: newQuestionnaire._id,
        aiResponse: aiResponse.data
      });
    } catch (aiError) {
      console.error('AI service error:', aiError);
      // Still return success for questionnaire submission even if AI service fails
      res.status(201).json({ 
        message: 'Questionnaire submitted successfully, but AI processing failed',
        questionnaireId: newQuestionnaire._id,
        aiError: 'Failed to process with AI service'
      });
    }

  } catch (error) {
    console.error('Questionnaire submission error:', error);
    res.status(500).json({ message: 'Failed to submit questionnaire' });
  }
}));

// Route to get user's questionnaire and process with AI
router.get('/process-questionnaire/:id', verifyToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  try {
    const questionnaire = await Questionnaire.findById(req.params.id);
    if (!questionnaire) {
      return res.status(404).json({ message: 'Questionnaire not found' });
    }

    // Format data for AI service
    const aiServiceData = {
      studentName: questionnaire.studentName,
      age: questionnaire.age,
      academicInfo: questionnaire.academicInfo,
      sportsInterests: questionnaire.interests,
      answers: questionnaire.answers
    };

    // Send to AI service
    const aiResponse = await axios.post('http://localhost:3001/api/submit-assessment', aiServiceData);
    
    res.status(200).json({
      questionnaire,
      aiResponse: aiResponse.data
    });

  } catch (error) {
    console.error('Error processing questionnaire:', error);
    res.status(500).json({ message: 'Failed to process questionnaire' });
  }
}));

// Existing get-answers route remains the same
router.get('/get-answers', verifyToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const questionnaire = await Questionnaire.findOne({ userId: req.user.userId });
    
    if (!questionnaire) {
      return res.status(404).json({ message: 'No questionnaire found' });
    }

    res.status(200).json(questionnaire);
  } catch (error) {
    console.error('Error fetching questionnaire:', error);
    res.status(500).json({ message: 'Failed to fetch questionnaire' });
  }
}));

export default router;