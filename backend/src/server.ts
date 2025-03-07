// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import authRoutes from './routes/authRoutes'; // Ensure this import is correct

// // Load environment variables
// dotenv.config();

// const app = express();

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI!)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Middleware
// app.use(cors());
// app.use(express.json()); // Ensure this is used to parse JSON bodies

// // Routes
// app.use('/api/auth', authRoutes); // Ensure this is correctly mounted

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// E:\career-guide\backend\src\server.ts
// E:\career-guide\backend\src\server.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import questionnaireRoutes from './routes/questionnaireRoutes';
import marksRoutes from './routes/marksRoutes';

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes - Mount each route under a specific sub-path under /api
app.use('/api/auth', authRoutes);
app.use('/api/questionnaire', questionnaireRoutes);
app.use('/api/marks', marksRoutes); // This is correct

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));