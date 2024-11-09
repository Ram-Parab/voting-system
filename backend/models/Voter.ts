import mongoose from 'mongoose';

const voterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationStatus: {
    type: String,
    enum: ['not-registered', 'pending', 'accepted', 'rejected'],
    default: 'not-registered'
  },
  blockchainAddress: { type: String },
  fullName: { type: String },
  dateOfBirth: { type: String },
  gender: { type: String },
  address: { type: String },
  phoneNumber: { type: String },
  governmentId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Voter', voterSchema); 