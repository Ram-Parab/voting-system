import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

// Load environment variables first
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Log environment variables (excluding sensitive data)
console.log('Environment variables loaded:', {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
  JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set',
  VOTER_REGISTRY_CONTRACT_ADDRESS: process.env.VOTER_REGISTRY_CONTRACT_ADDRESS
});

// Import routes after environment variables are loaded
import authRoutes from './routes/auth';
import registrationRoutes from './routes/registration';

const app = express();

// More permissive CORS configuration for development
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/registration', registrationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 