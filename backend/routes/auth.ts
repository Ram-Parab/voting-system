import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Voter from '../models/Voter';

interface SignupBody {
  fullName: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

const router = Router();

// Signup route handler
const signupHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password } = req.body as SignupBody;

    // Check if user already exists
    const existingVoter = await Voter.findOne({ email });
    if (existingVoter) {
      res.status(400).json({ message: 'Email already registered' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new voter
    const voter = new Voter({
      fullName,
      email,
      password: hashedPassword,
    });

    await voter.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: voter._id },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Voter registered successfully',
      token,
      voter: {
        id: voter._id,
        fullName: voter.fullName,
        email: voter.email,
        registrationStatus: voter.registrationStatus,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login route handler
const loginHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as LoginBody;

    // Find voter
    const voter = await Voter.findOne({ email });
    if (!voter) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, voter.password);
    if (!isValidPassword) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: voter._id },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      voter: {
        id: voter._id,
        fullName: voter.fullName,
        email: voter.email,
        registrationStatus: voter.registrationStatus,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Register routes
router.post('/voter-signup', signupHandler);
router.post('/voter-login', loginHandler);

export default router;
