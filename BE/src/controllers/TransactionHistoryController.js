// controllers/transactionHistoryController.ts
import TransactionHistory from '../models/TransactionHistory.js';

// Tạo giao dịch mới
export const createTransaction = async (req, res) => {
  try {
    const user = await AuthMiddleware._validateToken(req, res);
    const { transactionType, amount, balance, sourcePayment } = req.body;
    const newTransaction = new TransactionHistory({
      userId: user._id,
      transactionType,
      sourcePayment,
      amount,
      balance,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Lấy tất cả giao dịch
export const getListTransactions = async (req, res) => {
  try {
    const user = await AuthMiddleware._validateToken(req, res);
    const transactions = await TransactionHistory.find({ userId: user._id });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const user = await AuthMiddleware._validateToken(req, res);
    const { _id} = req.body;
    const transaction = await TransactionHistory.findById(_id);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
