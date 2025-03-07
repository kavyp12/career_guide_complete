"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const QuestionnaireModel_1 = __importDefault(require("../models/QuestionnaireModel"));
const User_1 = __importDefault(require("../models/User"));
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
// Helper function for async route handling
const asyncHandler = (fn) => (req, res) => {
    Promise.resolve(fn(req, res)).catch((error) => {
        console.error('Route error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    });
};
// Submit answers route
router.post('/submit-answers', authMiddleware_1.verifyToken, asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }
    try {
        // Find user
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check for existing questionnaire
        const existingQuestionnaire = await QuestionnaireModel_1.default.findOne({ userId });
        if (existingQuestionnaire) {
            return res.status(400).json({ message: 'Questionnaire already submitted' });
        }
        // Update user status to Analyzing
        await User_1.default.findByIdAndUpdate(userId, { status: 'Analyzing' });
        // Transform answers for AI service
        const transformedAnswers = req.body.answers.reduce((acc, curr) => {
            acc[`question${curr.questionId}`] = curr.answer;
            return acc;
        }, {});
        // Create new questionnaire
        const newQuestionnaire = new QuestionnaireModel_1.default({
            userId: userId,
            studentName: `${user.firstName} ${user.lastName}`,
            age: user.age || '',
            academicInfo: `${user.standard} Grade`,
            interests: user.interests || '',
            answers: transformedAnswers
        });
        await newQuestionnaire.save();
        // Prepare data for AI service
        const aiServiceData = {
            studentName: newQuestionnaire.studentName,
            age: newQuestionnaire.age,
            academicInfo: newQuestionnaire.academicInfo,
            interests: newQuestionnaire.interests,
            answers: transformedAnswers
        };
        try {
            // Send to AI service
            const aiResponse = await axios_1.default.post('https://p.enhc.tech/api/submit-assessment', aiServiceData);
            console.log('AI service response:', aiResponse.data);
            if (aiResponse.data.report_url) {
                // Extract filename from URL
                const reportPath = aiResponse.data.report_url.split('/').pop();
                // Update user with report info
                await User_1.default.findByIdAndUpdate(userId, {
                    status: 'Report Generated',
                    reportPath: reportPath
                });
                return res.status(201).json({
                    message: 'Questionnaire submitted and report generated successfully',
                    reportUrl: aiResponse.data.report_url
                });
            }
            // If no report URL in response
            throw new Error('No report URL received from AI service');
        }
        catch (aiError) {
            console.error('AI service error:', aiError);
            // Update user status to error
            await User_1.default.findByIdAndUpdate(userId, { status: 'Error' });
            return res.status(500).json({
                message: 'Failed to process with AI service',
                error: aiError instanceof Error ? aiError.message : 'Unknown error'
            });
        }
    }
    catch (error) {
        console.error('Questionnaire submission error:', error);
        // Update user status to error
        await User_1.default.findByIdAndUpdate(userId, { status: 'Error' });
        return res.status(500).json({
            message: 'Failed to submit questionnaire',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}));
// Get report status route
router.get('/report-status', authMiddleware_1.verifyToken, asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }
    try {
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({
            status: user.status || 'Pending',
            reportPath: user.reportPath || null
        });
    }
    catch (error) {
        console.error('Status fetch error:', error);
        return res.status(500).json({
            message: 'Failed to fetch report status',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}));
// Get answers route
router.get('/get-answers', authMiddleware_1.verifyToken, asyncHandler(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }
    try {
        const questionnaire = await QuestionnaireModel_1.default.findOne({ userId });
        if (!questionnaire) {
            return res.status(404).json({ message: 'No questionnaire found for this user' });
        }
        return res.status(200).json(questionnaire);
    }
    catch (error) {
        console.error('Questionnaire fetch error:', error);
        return res.status(500).json({
            message: 'Failed to fetch questionnaire',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}));
exports.default = router;
