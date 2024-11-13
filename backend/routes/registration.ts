import { Router, Request, Response, NextFunction } from 'express';
import Web3 from 'web3';
import jwt from 'jsonwebtoken';
import Voter from '../models/Voter';
import { RequestHandler } from 'express';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import VoterRegistryABI from '../contracts/build/VoterRegistry.json';

// Define interface for the JWT payload
interface JwtPayload {
  userId: string;
}

// Extend Express Request type
interface AuthRequest extends Request {
  user?: JwtPayload;
}

// Define blockchain transaction result type
interface TransactionResult {
  events?: {
    VoterRegistered?: {
      returnValues: {
        voterAddress: string;
      };
    };
  };
  transactionHash: string;
}

const router = Router();

// Initialize Web3 with proper typing
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

// Get contract address from environment variables
const CONTRACT_ADDRESS = process.env.VOTER_REGISTRY_CONTRACT_ADDRESS;
console.log('Contract address:', CONTRACT_ADDRESS);

if (!CONTRACT_ADDRESS) {
  console.error('VOTER_REGISTRY_CONTRACT_ADDRESS not found in environment variables');
  process.exit(1);
}

// Test route to verify the API is working
router.get('/test', (req, res) => {
  res.json({ message: 'Registration API is working' });
});

// Middleware to verify JWT token
const verifyToken: RequestHandler = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Register voter
router.post('/register', verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log('Registration request received:', req.body);

    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const voter = await Voter.findById(req.user.userId);
    if (!voter) {
      res.status(404).json({ message: 'Voter not found' });
      return;
    }

    if (!['not-registered', 'rejected'].includes(voter.registrationStatus)) {
      res.status(400).json({ 
        message: 'Cannot register with current status',
        currentStatus: voter.registrationStatus 
      });
      return;
    }

    const {
      fullName,
      dateOfBirth,
      gender,
      address,
      phoneNumber,
      governmentId
    } = req.body;

    // Initialize contract
    const contract = new web3.eth.Contract(
      VoterRegistryABI.abi as AbiItem[],
      CONTRACT_ADDRESS
    );

    // Get accounts
    const accounts = await web3.eth.getAccounts();
    const senderAddress = accounts[0];

    console.log('Sending transaction from:', senderAddress);

    // Store voter data on blockchain
    const result = await contract.methods
      .registerVoter(
        fullName,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        governmentId,
        'no_photo'
      )
      .send({ 
        from: senderAddress, 
        gas: '3000000'
      }) as TransactionResult;

    // Update voter status in MongoDB
    voter.registrationStatus = 'pending';
    if (result.events?.VoterRegistered?.returnValues.voterAddress) {
      voter.blockchainAddress = result.events.VoterRegistered.returnValues.voterAddress;
    }
    
    // Update voter details
    voter.fullName = fullName;
    voter.dateOfBirth = dateOfBirth;
    voter.gender = gender;
    voter.address = address;
    voter.phoneNumber = phoneNumber;
    voter.governmentId = governmentId;
    
    await voter.save();

    res.json({
      message: 'Registration submitted successfully',
      status: 'pending',
      blockchainAddress: voter.blockchainAddress,
      transactionHash: result.transactionHash
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Registration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get registration status
router.get('/status', verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const voter = await Voter.findById(req.user.userId);
    if (!voter) {
      res.status(404).json({ message: 'Voter not found' });
      return;
    }

    let blockchainData = null;
    if (voter.blockchainAddress) {
      try {
        const contract = new web3.eth.Contract(
          VoterRegistryABI.abi as AbiItem[],
          CONTRACT_ADDRESS
        );
        
        blockchainData = await contract.methods
          .getVoter(voter.blockchainAddress)
          .call();

        // Log the blockchain data to debug
        console.log('Blockchain data retrieved:', blockchainData);

        // Verify the data structure
        if (!blockchainData || !blockchainData.fullName) {
          throw new Error('Invalid blockchain data structure');
        }
      } catch (error) {
        console.error('Error fetching blockchain data:', error);
        res.status(500).json({ 
          message: 'Error fetching blockchain data',
          status: voter.registrationStatus,
          blockchainAddress: voter.blockchainAddress,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        return;
      }
    }

    res.json({
      status: voter.registrationStatus,
      blockchainData,
      blockchainAddress: voter.blockchainAddress
    });
  } catch (error) {
    console.error('Status fetch error:', error);
    res.status(500).json({ message: 'Error fetching status' });
  }
});

export default router;