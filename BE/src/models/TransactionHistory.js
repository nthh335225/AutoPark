// models/TransactionHistory.ts
import mongoose, { Schema } from 'mongoose';

const TransactionHistorySchema = new mongoose.Schema({
  userId: {type: String, required: true},
  transactionType: { type: Number, required: true },
  sourcePayment: { type: String, required: false },
  amount: { type: Number, required: true },
  balance: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TransactionHistory = mongoose.model('TransactionHistory', TransactionHistorySchema);

export default TransactionHistory;
