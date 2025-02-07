// pages/Questionnaire.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProgressBar from '../components/Questionnaire/ProgressBar';
import Question from '../components/Questionnaire/Question';
import { Question as QuestionType, QuestionResponse } from '../types/types';

const Questionnaire: React.FC = () => {
  const navigate = useNavigate();
  useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuestionResponse[]>([]);

  // Mock questions data (replace with your 50 questions)
  const mockQuestions: QuestionType[] = [
    {
      id: 1,
      text: "Which of these school subjects do you like the most?",
      type: 'radio',
      options: ['Math', 'Science', 'English/Reading', 'History/Social Studies', 'Art/Music', 'None specifically'],
      required: true,
    },
    {
      id: 2,
      text: "When you learn something new in class, how quickly do you usually understand it?",
      type: 'radio',
      options: ['Very quickly', 'Pretty quickly', 'At a normal pace', 'I need extra time to understand'],
      required: true,
    },
    {
      id: 3,
      text: "When you have a difficult problem to solve, what do you usually do?",
      type: 'radio',
      options: [
        'Break it into smaller parts and solve each one',
        'Try out different ideas from the start',
        'Ask someone to help me find the answer',
        'Take time to understand and start'
      ],
      required: true,
    },
    {
      id: 4,
      text: "Which of these activities help you learn best?",
      type: 'checkbox',
      options: [
        'Reading books',
        'Watching videos',
        'Discussing with friends',
        'Doing projects with your hands',
        'Doing research yourself',
        'Looking at pictures and diagrams'
      ],
      required: true,
    },
    {
      id: 5,
      text: "Over the past few years, how have your school grades been?",
      type: 'radio',
      options: [
        'They have been getting better',
        'They have stayed about the same',
        'They have gone down a little',
        'They have changed a lot'
      ],
      required: true,
    },
    {
      id: 6,
      text: "Over the past few years, how have your school grades been?",
      type: 'radio',
      options: [
        'They have been getting better',
        'They have stayed about the same',
        'They have gone down a little',
        'They have changed a lot'
      ],
      required: true,
    },
    {
      id: 7,
      text: "In class, do you prefer...",
      type: 'radio',
      options: [
        'Listening to lectures',
        'Participating in discussions',
        'Working on projects',
        'Doing individual tasks'
      ],
      required: true,
    },
    {
      id: 8,
      text: "When you have to understand something new, how do you like to do it?",
      type: 'radio',
      options: [
        'By asking a lot of questions',
        'By thinking about it quietly by myself',
        'By watching someone else do it',
        'By trying it out right away'
      ],
      required: true,
    },

    // Section 2: Activities and Hobbies
    {
      id: 9,
      text: "Which sports do you play?",
      type: 'checkbox',
      options: [
        'Football/Soccer',
        'Basketball',
        'Cricket',
        'Swimming',
        'Running/Track',
        'Other (Please write: ______)',
        'None'
      ],
      required: true,
    },
    {
      id: 10,
      text: "Have you ever led a group or a team at school, in a club, or in sports? If yes, tell us about what you did.",
      type: 'textarea',
      required: false,
    },
    {
      id: 11,
      text: "What kind of school clubs are you a part of?",
      type: 'checkbox',
      options: [
        'Tech/Robot Club',
        'Debate Club',
        'Drama/Acting Club',
        'Art/Music Club',
        'Helping others/Social Service Club',
        'Book/Reading Club',
        'Other (Please write: ______)',
        'None'
      ],
      required: true,
    },
    {
      id: 12,
      text: "Have you done any work to help your community? If yes, please describe.",
      type: 'textarea',
      required: false,
    },
    {
      id: 13,
      text: "Have you ever won any awards or been recognized for something you did at school or outside? Any online certificates or competitions? Please tell us",
      type: 'textarea',
      required: false,
    },
    {
      id: 14,
      text: "Do you do any of these creative things?",
      type: 'checkbox',
      options: [
        'Drawing/Painting',
        'Playing an instrument',
        'Writing stories or poems',
        'Acting/Drama',
        'Digital Art',
        'None of these'
      ],
      required: false,
    },
    {
      id: 15,
      text: "Do you like being the one who plans and organizes events or activities?",
      type: 'radio',
      options: [
        'Yes, I like planning things',
        'I don\'t mind planning if needed',
        'I prefer that someone else does it'
      ],
      required: true,
    },
    {
      id: 16,
      text: "When you are not studying or at school, what do you usually do?",
      type: 'checkbox',
      options: [
        'play sports',
        'watch TV/movies',
        'play video games',
        'Read books',
        'spend time with friends',
        'None of the above'
      ],
      required: false,
    },

    // Section 3: You as a Person
    {
      id: 17,
      text: "Do you prefer to work by yourself or with a group of people?",
      type: 'radio',
      options: [
        'I like to work by myself a lot',
        'I like to work by myself',
        'I am fine with both',
        'I like to work with others',
        'I like to work with others a lot'
      ],
      required: true,
    },
    {
      id: 18,
      text: "When faced with something new, what do you do?",
      type: 'radio',
      options: [
        'I try new things right away',
        'I\'m okay trying after some planning',
        'I like to do things I know',
        'I don\'t like trying new things'
      ],
      required: true,
    },
    {
      id: 19,
      text: "When doing a project in a group, what do you usually do?",
      type: 'radio',
      options: [
        'Share new ideas',
        'Do my part alone',
        'Help everyone talk about what to do',
        'Help others stay on task',
        'I am happy to do any task'
      ],
      required: true,
    },
    {
      id: 20,
      text: "How do you usually get your work done?",
      type: 'radio',
      options: [
        'I finish well before it\'s due',
        'I finish before deadline',
        'I sometimes finish late',
        'I usually finish late'
      ],
      required: true,
    },
    {
      id: 21,
      text: "When you have to make a decision, what do you do?",
      type: 'radio',
      options: [
        'I decide quickly',
        'I consider all sides before choosing',
        'I ask for advice before deciding',
        'I struggle to make a decision'
      ],
      required: true,
    },
    {
      id: 22,
      text: "How organized are you usually?",
      type: 'radio',
      options: [
        'I am very organized',
        'I am somewhat organized',
        'I am not very organized',
        'I am very disorganized'
      ],
      required: true,
    },
    {
      id: 23,
      text: "When you feel stressed or worried, how do you usually handle it?",
      type: 'radio',
      options: [
        'I like to tackle it',
        'I do something else to distract myself',
        'I ask someone for help',
        'I avoid dealing with it.'
      ],
      required: true,
    },
    {
      id: 24,
      text: "Do you enjoy helping others?",
      type: 'radio',
      options: [
        'Yes, I enjoy it a lot',
        'Yes, I am okay with helping',
        'I don\'t enjoy it'
      ],
      required: true,
    },
    {
      id: 25,
      text: "When you make a mistake what do you usually do?",
      type: 'radio',
      options: [
        'I try to learn from it',
        'I try to ignore it',
        'I ask others for help',
        'I am bothered by it'
      ],
      required: true,
    },

    // Section 4: Your Future and Technology
    {
      id: 26,
      text: "Which of these jobs are you interested in?",
      type: 'checkbox',
      options: [
        'Doctor/Nurse',
        'Engineer',
        'Computer/Tech Job',
        'Business/Accounting',
        'Artist/Designer',
        'Lawyer',
        'Teacher',
        'Scientist',
        'I am not sure'
      ],
      required: true,
    },
    {
      id: 27,
      text: "Describe, what kind of job you would like to have in detail.",
      type: 'textarea',
      required: false,
    },
    {
      id: 28,
      text: "How comfortable are you with using computers and other technology?",
      type: 'radio',
      options: [
        'I\'m very comfortable',
        'I\'m comfortable',
        'I\'m somewhat comfortable',
        'I am not very comfortable'
      ],
      required: true,
    },
    {
      id: 29,
      text: "Which of the following do you find interesting?",
      type: 'checkbox',
      options: [
        'AI/Smart tech',
        'Building websites',
        'Creating digital art',
        'Analysing data/information',
        'Game design',
        'Designing/working with robots',
        'Cloud/Online services',
        'Security software/cybersecurity',
        'None'
      ],
      required: true,
    },
    {
      id: 30,
      text: "Do you have an online profile or work that shows what you are good at or what you love doing? If so, tell us about it!",
      type: 'textarea',
      required: false,
    },
    {
      id: 31,
      text: "How quickly do you learn new things about technology?",
      type: 'radio',
      options: ['Very quickly', 'Quite quickly', 'Average', 'Slowly'],
      required: true,
    },
    {
      id: 32,
      text: "Do you prefer to work in an office, outdoors, or in a different setting?",
      type: 'textarea',
      required: false,
    },

    // Section 5: Thinking Skills
    {
      id: 33,
      text: "Do you enjoy solving puzzles or riddles?",
      type: 'radio',
      options: ['Yes, a lot', 'Yes, sometimes', 'Not really', 'I dislike them.'],
      required: true,
    },
    {
      id: 34,
      text: "Are you good at noticing patterns in things?",
      type: 'radio',
      options: ['Yes, very good', 'Yes, somewhat', 'I don\'t notice them', 'No.'],
      required: true,
    },
    {
      id: 35,
      text: "How well do you usually remember things?",
      type: 'radio',
      options: [
        'I remember a lot easily',
        'I remember things well',
        'I remember things only if they are important',
        'I find it hard to remember'
      ],
      required: true,
    },
    {
      id: 36,
      text: "When you solve a problem do you tend to..",
      type: 'radio',
      options: [
        'Use a traditional method',
        'Try different approaches',
        'Give up',
        'ask others for solutions'
      ],
      required: true,
    },

    // Section 6: Social skills
    {
      id: 37,
      text: "How comfortable are you talking to people you've just met?",
      type: 'radio',
      options: ['Very comfortable', 'Somewhat comfortable', 'Not very comfortable', 'Uncomfortable'],
      required: true,
    },
    {
      id: 38,
      text: "How easy is it for you to work with other people?",
      type: 'radio',
      options: ['Very easy', 'Somewhat easy', 'Not very easy', 'Difficult'],
      required: true,
    },
    {
      id: 39,
      text: "How easy is it for you to make friends?",
      type: 'radio',
      options: [
        'I make friends easily',
        'I make friends normally',
        'I find it hard to make friends',
        'I dislike making new friends'
      ],
      required: true,
    },
    {
      id: 40,
      text: "Are you comfortable sharing your ideas with others?",
      type: 'radio',
      options: [
        'yes, I enjoy sharing ideas.',
        'Yes, I am ok with sharing',
        'I am uncomfortable sharing',
        'I don\'t like sharing ideas.'
      ],
      required: true,
    },

    // Section 7: Personal Preferences
    {
      id: 41,
      text: "Do you prefer working on your own or with others?",
      type: 'radio',
      options: [
        'I strongly prefer working alone.',
        'I prefer working alone',
        'I like both the same',
        'I prefer working with others',
        'I strongly prefer working with others'
      ],
      required: true,
    },
    {
      id: 42,
      text: "Do you like following instructions?",
      type: 'radio',
      options: [
        'I like to follow instructions',
        'I like to follow instructions but sometimes want to try something different.',
        'I prefer to do things my way.'
      ],
      required: true,
    },
    {
      id: 43,
      text: "Do you like to plan before doing an activity?",
      type: 'radio',
      options: [
        'Yes, I like to plan everything before hand.',
        'I prefer to plan, but sometimes I want to do things randomly',
        'I prefer to just do things as they come.'
      ],
      required: true,
    },
    {
      id: 44,
      text: "How long can you focus on a particular task?",
      type: 'radio',
      options: [
        'I can focus for a long time.',
        'I can focus for a while',
        'I get distracted easily',
        'I am not able to focus at all'
      ],
      required: true,
    },
    {
      id: 45,
      text: "Do you prefer talking to others or listening to them?",
      type: 'radio',
      options: [
        'I prefer talking to others',
        'I like listening to others',
        'I like both',
        'I dislike both'
      ],
      required: true,
    },

    // Section 8: Personal Reflection
    {
      id: 46,
      text: "What do you think are your biggest strengths?",
      type: 'textarea',
      required: false,
    },
    {
      id: 47,
      text: "What do you think you need to improve on?",
      type: 'textarea',
      required: false,
    },
    {
      id: 48,
      text: "What is your biggest fear in life?",
      type: 'textarea',
      required: false,
    },
    {
      id: 49,
      text: "What is your biggest dream in life?",
      type: 'textarea',
      required: false,
    },
    {
      id: 50,
      text: "Do you want to add anything else about yourself that we might not have asked?",
      type: 'textarea',
      required: false,
    },
  ];

  // Fetch questions (replace with API call if needed)
  useEffect(() => {
    setQuestions(mockQuestions);
    // Initialize answers with proper structure
    const initialAnswers = mockQuestions.map((q) => ({
      questionId: q.id,
      answer: q.type === 'checkbox' ? [] : q.type === 'number' ? 0 : '',
    }));
    setAnswers(initialAnswers);
  }, []);

  // Handle answer input
  const handleAnswer = (answer: string | number | string[]) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionId: questions[currentQuestion].id,
      answer,
    };
    setAnswers(newAnswers);
  };

  // Navigate to the next question or submit
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitAnswers();
    }
  };

  // Navigate to the previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Submit answers to the backend
  // E:\career-guide\src\Pages\Questionnaire.tsx
const submitAnswers = async () => {
  try {
    // Get the token from wherever you store it (localStorage, context, etc.)
    const token = localStorage.getItem('token'); // Adjust based on your auth implementation

    const response = await fetch('/api/questionnaire/submit-answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Ensure this matches your backend expectation
      },
      body: JSON.stringify({
        answers,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit answers');
    }

    const data = await response.json();
    console.log('Questionnaire submitted:', data);
    
    // Show success message
    alert('Questionnaire submitted successfully!');
    
    // Navigate to dashboard
    navigate('/dashboard');
  } catch (error) {
    console.error('Failed to submit answers:', error);
    
    // Show error message to user
    alert(error instanceof Error ? error.message : 'Unable to submit questionnaire. Please try again.');
  }
};

  // Validate if the current question's answer is valid
  const isAnswerValid = (answer?: QuestionResponse) => {
    const question = questions[currentQuestion];
    if (!question.required) return true;
    if (!answer) return false;
    if (question.type === 'checkbox') {
      return (answer.answer as string[]).length > 0;
    }
    return answer.answer !== '' && answer.answer !== undefined;
  };

  // Show loading spinner if questions are not loaded
if (!questions.length) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002D74]" />
    </div>
  );
}

return (
  <section className="bg-gray-50 min-screen flex items-center justify-center" style={{ width: '100vw', height: '100vh' }}>
    <div className="bg-gray-100 flex rounded-2xl shadow-lg w-full max-w-4xl mx-4 p-5 items-center">
      <div className="w-full px-8 md:px-16">
        <ProgressBar current={currentQuestion + 1} total={questions.length} />

        <br />

        <div className="space-y-6 mt-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <Question
              question={questions[currentQuestion]}
              value={answers[currentQuestion]?.answer || ''}
              onChange={handleAnswer}
            />
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="w-1/2 py-2 px-4 bg-white border rounded-xl hover:scale-105 duration-300 text-[#002D74] disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!isAnswerValid(answers[currentQuestion])}
              className="w-1/2 py-2 px-4 bg-[#002D74] text-white rounded-xl hover:scale-105 duration-300 disabled:opacity-50"
            >
              {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};

export default Questionnaire;


// // src/pages/Questionnaire.tsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import ProgressBar from '../components/Questionnaire/ProgressBar';
// import Question from '../components/Questionnaire/Question';
// import { Question as QuestionType, QuestionResponse } from '../types/types';

// const Questionnaire: React.FC = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [questions, setQuestions] = useState<QuestionType[]>([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState<QuestionResponse[]>([]);
//   const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   // Mock questions data 
//   const mockQuestions: QuestionType[] = [
//     {
//       id: 1,
//       text: "Which of these school subjects do you like the most?",
//       type: 'radio',
//       options: ['Math', 'Science', 'English/Reading', 'History/Social Studies', 'Art/Music', 'None specifically'],
//       required: true,
//     },
//     {
//       id: 2,
//       text: "When you learn something new in class, how quickly do you usually understand it?",
//       type: 'radio',
//       options: ['Very quickly', 'Pretty quickly', 'At a normal pace', 'I need extra time to understand'],
//       required: true,
//     },
//         {
//       id: 3,
//       text: "When you have a difficult problem to solve, what do you usually do?",
//       type: 'radio',
//       options: [
//         'Break it into smaller parts and solve each one',
//         'Try out different ideas from the start',
//         'Ask someone to help me find the answer',
//         'Take time to understand and start'
//       ],
//       required: true,
//     },
//     {
//       id: 4,
//       text: "Which of these activities help you learn best?",
//       type: 'checkbox',
//       options: [
//         'Reading books',
//         'Watching videos',
//         'Discussing with friends',
//         'Doing projects with your hands',
//         'Doing research yourself',
//         'Looking at pictures and diagrams'
//       ],
//       required: true,
//     },
//     {
//       id: 5,
//       text: "Over the past few years, how have your school grades been?",
//       type: 'radio',
//       options: [
//         'They have been getting better',
//         'They have stayed about the same',
//         'They have gone down a little',
//         'They have changed a lot'
//       ],
//       required: true,
//     },
//     {
//       id: 6,
//       text: "Over the past few years, how have your school grades been?",
//       type: 'radio',
//       options: [
//         'They have been getting better',
//         'They have stayed about the same',
//         'They have gone down a little',
//         'They have changed a lot'
//       ],
//       required: true,
//     },
//     {
//       id: 7,
//       text: "In class, do you prefer...",
//       type: 'radio',
//       options: [
//         'Listening to lectures',
//         'Participating in discussions',
//         'Working on projects',
//         'Doing individual tasks'
//       ],
//       required: true,
//     },
//     {
//       id: 8,
//       text: "When you have to understand something new, how do you like to do it?",
//       type: 'radio',
//       options: [
//         'By asking a lot of questions',
//         'By thinking about it quietly by myself',
//         'By watching someone else do it',
//         'By trying it out right away'
//       ],
//       required: true,
//     },

//     // Section 2: Activities and Hobbies
//     {
//       id: 9,
//       text: "Which sports do you play?",
//       type: 'checkbox',
//       options: [
//         'Football/Soccer',
//         'Basketball',
//         'Cricket',
//         'Swimming',
//         'Running/Track',
//         'Other (Please write: ______)',
//         'None'
//       ],
//       required: true,
//     },
//     {
//       id: 10,
//       text: "Have you ever led a group or a team at school, in a club, or in sports? If yes, tell us about what you did.",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 11,
//       text: "What kind of school clubs are you a part of?",
//       type: 'checkbox',
//       options: [
//         'Tech/Robot Club',
//         'Debate Club',
//         'Drama/Acting Club',
//         'Art/Music Club',
//         'Helping others/Social Service Club',
//         'Book/Reading Club',
//         'Other (Please write: ______)',
//         'None'
//       ],
//       required: true,
//     },
//     {
//       id: 12,
//       text: "Have you done any work to help your community? If yes, please describe.",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 13,
//       text: "Have you ever won any awards or been recognized for something you did at school or outside? Any online certificates or competitions? Please tell us",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 14,
//       text: "Do you do any of these creative things?",
//       type: 'checkbox',
//       options: [
//         'Drawing/Painting',
//         'Playing an instrument',
//         'Writing stories or poems',
//         'Acting/Drama',
//         'Digital Art',
//         'None of these'
//       ],
//       required: false,
//     },
//     {
//       id: 15,
//       text: "Do you like being the one who plans and organizes events or activities?",
//       type: 'radio',
//       options: [
//         'Yes, I like planning things',
//         'I don\'t mind planning if needed',
//         'I prefer that someone else does it'
//       ],
//       required: true,
//     },
//     {
//       id: 16,
//       text: "When you are not studying or at school, what do you usually do?",
//       type: 'checkbox',
//       options: [
//         'play sports',
//         'watch TV/movies',
//         'play video games',
//         'Read books',
//         'spend time with friends',
//         'None of the above'
//       ],
//       required: false,
//     },

//     // Section 3: You as a Person
//     {
//       id: 17,
//       text: "Do you prefer to work by yourself or with a group of people?",
//       type: 'radio',
//       options: [
//         'I like to work by myself a lot',
//         'I like to work by myself',
//         'I am fine with both',
//         'I like to work with others',
//         'I like to work with others a lot'
//       ],
//       required: true,
//     },
//     {
//       id: 18,
//       text: "When faced with something new, what do you do?",
//       type: 'radio',
//       options: [
//         'I try new things right away',
//         'I\'m okay trying after some planning',
//         'I like to do things I know',
//         'I don\'t like trying new things'
//       ],
//       required: true,
//     },
//     {
//       id: 19,
//       text: "When doing a project in a group, what do you usually do?",
//       type: 'radio',
//       options: [
//         'Share new ideas',
//         'Do my part alone',
//         'Help everyone talk about what to do',
//         'Help others stay on task',
//         'I am happy to do any task'
//       ],
//       required: true,
//     },
//     {
//       id: 20,
//       text: "How do you usually get your work done?",
//       type: 'radio',
//       options: [
//         'I finish well before it\'s due',
//         'I finish before deadline',
//         'I sometimes finish late',
//         'I usually finish late'
//       ],
//       required: true,
//     },
//     {
//       id: 21,
//       text: "When you have to make a decision, what do you do?",
//       type: 'radio',
//       options: [
//         'I decide quickly',
//         'I consider all sides before choosing',
//         'I ask for advice before deciding',
//         'I struggle to make a decision'
//       ],
//       required: true,
//     },
//     {
//       id: 22,
//       text: "How organized are you usually?",
//       type: 'radio',
//       options: [
//         'I am very organized',
//         'I am somewhat organized',
//         'I am not very organized',
//         'I am very disorganized'
//       ],
//       required: true,
//     },
//     {
//       id: 23,
//       text: "When you feel stressed or worried, how do you usually handle it?",
//       type: 'radio',
//       options: [
//         'I like to tackle it',
//         'I do something else to distract myself',
//         'I ask someone for help',
//         'I avoid dealing with it.'
//       ],
//       required: true,
//     },
//     {
//       id: 24,
//       text: "Do you enjoy helping others?",
//       type: 'radio',
//       options: [
//         'Yes, I enjoy it a lot',
//         'Yes, I am okay with helping',
//         'I don\'t enjoy it'
//       ],
//       required: true,
//     },
//     {
//       id: 25,
//       text: "When you make a mistake what do you usually do?",
//       type: 'radio',
//       options: [
//         'I try to learn from it',
//         'I try to ignore it',
//         'I ask others for help',
//         'I am bothered by it'
//       ],
//       required: true,
//     },

//     // Section 4: Your Future and Technology
//     {
//       id: 26,
//       text: "Which of these jobs are you interested in?",
//       type: 'checkbox',
//       options: [
//         'Doctor/Nurse',
//         'Engineer',
//         'Computer/Tech Job',
//         'Business/Accounting',
//         'Artist/Designer',
//         'Lawyer',
//         'Teacher',
//         'Scientist',
//         'I am not sure'
//       ],
//       required: true,
//     },
//     {
//       id: 27,
//       text: "Describe, what kind of job you would like to have in detail.",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 28,
//       text: "How comfortable are you with using computers and other technology?",
//       type: 'radio',
//       options: [
//         'I\'m very comfortable',
//         'I\'m comfortable',
//         'I\'m somewhat comfortable',
//         'I am not very comfortable'
//       ],
//       required: true,
//     },
//     {
//       id: 29,
//       text: "Which of the following do you find interesting?",
//       type: 'checkbox',
//       options: [
//         'AI/Smart tech',
//         'Building websites',
//         'Creating digital art',
//         'Analysing data/information',
//         'Game design',
//         'Designing/working with robots',
//         'Cloud/Online services',
//         'Security software/cybersecurity',
//         'None'
//       ],
//       required: true,
//     },
//     {
//       id: 30,
//       text: "Do you have an online profile or work that shows what you are good at or what you love doing? If so, tell us about it!",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 31,
//       text: "How quickly do you learn new things about technology?",
//       type: 'radio',
//       options: ['Very quickly', 'Quite quickly', 'Average', 'Slowly'],
//       required: true,
//     },
//     {
//       id: 32,
//       text: "Do you prefer to work in an office, outdoors, or in a different setting?",
//       type: 'textarea',
//       required: false,
//     },

//     // Section 5: Thinking Skills
//     {
//       id: 33,
//       text: "Do you enjoy solving puzzles or riddles?",
//       type: 'radio',
//       options: ['Yes, a lot', 'Yes, sometimes', 'Not really', 'I dislike them.'],
//       required: true,
//     },
//     {
//       id: 34,
//       text: "Are you good at noticing patterns in things?",
//       type: 'radio',
//       options: ['Yes, very good', 'Yes, somewhat', 'I don\'t notice them', 'No.'],
//       required: true,
//     },
//     {
//       id: 35,
//       text: "How well do you usually remember things?",
//       type: 'radio',
//       options: [
//         'I remember a lot easily',
//         'I remember things well',
//         'I remember things only if they are important',
//         'I find it hard to remember'
//       ],
//       required: true,
//     },
//     {
//       id: 36,
//       text: "When you solve a problem do you tend to..",
//       type: 'radio',
//       options: [
//         'Use a traditional method',
//         'Try different approaches',
//         'Give up',
//         'ask others for solutions'
//       ],
//       required: true,
//     },

//     // Section 6: Social skills
//     {
//       id: 37,
//       text: "How comfortable are you talking to people you've just met?",
//       type: 'radio',
//       options: ['Very comfortable', 'Somewhat comfortable', 'Not very comfortable', 'Uncomfortable'],
//       required: true,
//     },
//     {
//       id: 38,
//       text: "How easy is it for you to work with other people?",
//       type: 'radio',
//       options: ['Very easy', 'Somewhat easy', 'Not very easy', 'Difficult'],
//       required: true,
//     },
//     {
//       id: 39,
//       text: "How easy is it for you to make friends?",
//       type: 'radio',
//       options: [
//         'I make friends easily',
//         'I make friends normally',
//         'I find it hard to make friends',
//         'I dislike making new friends'
//       ],
//       required: true,
//     },
//     {
//       id: 40,
//       text: "Are you comfortable sharing your ideas with others?",
//       type: 'radio',
//       options: [
//         'yes, I enjoy sharing ideas.',
//         'Yes, I am ok with sharing',
//         'I am uncomfortable sharing',
//         'I don\'t like sharing ideas.'
//       ],
//       required: true,
//     },

//     // Section 7: Personal Preferences
//     {
//       id: 41,
//       text: "Do you prefer working on your own or with others?",
//       type: 'radio',
//       options: [
//         'I strongly prefer working alone.',
//         'I prefer working alone',
//         'I like both the same',
//         'I prefer working with others',
//         'I strongly prefer working with others'
//       ],
//       required: true,
//     },
//     {
//       id: 42,
//       text: "Do you like following instructions?",
//       type: 'radio',
//       options: [
//         'I like to follow instructions',
//         'I like to follow instructions but sometimes want to try something different.',
//         'I prefer to do things my way.'
//       ],
//       required: true,
//     },
//     {
//       id: 43,
//       text: "Do you like to plan before doing an activity?",
//       type: 'radio',
//       options: [
//         'Yes, I like to plan everything before hand.',
//         'I prefer to plan, but sometimes I want to do things randomly',
//         'I prefer to just do things as they come.'
//       ],
//       required: true,
//     },
//     {
//       id: 44,
//       text: "How long can you focus on a particular task?",
//       type: 'radio',
//       options: [
//         'I can focus for a long time.',
//         'I can focus for a while',
//         'I get distracted easily',
//         'I am not able to focus at all'
//       ],
//       required: true,
//     },
//     {
//       id: 45,
//       text: "Do you prefer talking to others or listening to them?",
//       type: 'radio',
//       options: [
//         'I prefer talking to others',
//         'I like listening to others',
//         'I like both',
//         'I dislike both'
//       ],
//       required: true,
//     },

//     // Section 8: Personal Reflection
//     {
//       id: 46,
//       text: "What do you think are your biggest strengths?",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 47,
//       text: "What do you think you need to improve on?",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 48,
//       text: "What is your biggest fear in life?",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 49,
//       text: "What is your biggest dream in life?",
//       type: 'textarea',
//       required: false,
//     },
//     {
//       id: 50,
//       text: "Do you want to add anything else about yourself that we might not have asked?",
//       type: 'textarea',
//       required: false,
//     },
    
//   ];

//   useEffect(() => {
//     setQuestions(mockQuestions);
//     const initialAnswers = mockQuestions.map((q) => ({
//       questionId: q.id,
//       answer: q.type === 'checkbox' ? [] : q.type === 'number' ? 0 : '',
//     }));
//     setAnswers(initialAnswers);
//   }, []);

//   const handleAnswer = (answer: string | number | string[]) => {
//     const newAnswers = [...answers];
//     newAnswers[currentQuestion] = {
//       questionId: questions[currentQuestion].id,
//       answer,
//     };
//     setAnswers(newAnswers);
//   };

//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       submitAnswers();
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const formatAnswersForSubmission = () => {
//     const formattedAnswers: Record<string, any> = {};
//     answers.forEach((answer) => {
//       formattedAnswers[`question${answer.questionId}`] = answer.answer;
//     });
//     return formattedAnswers;
//   };

//   const submitAnswers = async () => {
//     setSubmissionStatus('submitting');
//     setErrorMessage(null);

//     try {
//       const token = localStorage.getItem('token');
//       const formattedAnswers = formatAnswersForSubmission();
      
//       const response = await fetch('http://localhost:3001/api/submit-assessment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           answers: formattedAnswers,
//           studentName: `${user?.firstName} ${user?.lastName}`,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to submit answers');
//       }

//       setSubmissionStatus('success');
      
//       // Show success message and redirect
//       alert('Data submitted successfully!');
//       setTimeout(() => {
//         navigate('/dashboard');
//       }, 2000);
//     } catch (error) {
//       console.error('Failed to submit answers:', error);
//       setSubmissionStatus('error');
//       setErrorMessage(error instanceof Error ? error.message : 'Unable to submit questionnaire. Please try again.');
//     }
//   };

//   const isAnswerValid = (answer?: QuestionResponse) => {
//     const question = questions[currentQuestion];
//     if (!question.required) return true;
//     if (!answer) return false;
//     if (question.type === 'checkbox') {
//       return (answer.answer as string[]).length > 0;
//     }
//     return answer.answer !== '' && answer.answer !== undefined;
//   };

//   if (!questions.length) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002D74]" />
//       </div>
//     );
//   }

//   if (submissionStatus === 'success') {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Data submitted successfully!</h2>
//           <p className="text-gray-600">Redirecting to dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="bg-gray-50 min-screen flex items-center justify-center" style={{ width: '100vw', height: '100vh' }}>
//       <div className="bg-gray-100 flex rounded-2xl shadow-lg w-full max-w-4xl mx-4 p-5 items-center">
//         <div className="w-full px-8 md:px-16">
//           <ProgressBar current={currentQuestion + 1} total={questions.length} />
//           <br />
//           <div className="space-y-6 mt-6">
//             {errorMessage && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//                 {errorMessage}
//               </div>
//             )}
//             <div className="bg-white rounded-xl p-6 shadow-sm">
//               <Question
//                 question={questions[currentQuestion]}
//                 value={answers[currentQuestion]?.answer || ''}
//                 onChange={handleAnswer}
//               />
//             </div>
//             <div className="flex justify-between gap-4">
//               <button
//                 onClick={handlePrevious}
//                 disabled={currentQuestion === 0 || submissionStatus === 'submitting'}
//                 className="w-1/2 py-2 px-4 bg-white border rounded-xl hover:scale-105 duration-300 text-[#002D74] disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={handleNext}
//                 disabled={!isAnswerValid(answers[currentQuestion]) || submissionStatus === 'submitting'}
//                 className="w-1/2 py-2 px-4 bg-[#002D74] text-white rounded-xl hover:scale-105 duration-300 disabled:opacity-50"
//               >
//                 {submissionStatus === 'submitting' ? 'Submitting...' : 
//                  currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Questionnaire;