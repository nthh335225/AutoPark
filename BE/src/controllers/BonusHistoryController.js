// controllers/BonusHistoryController.ts
import BonusHistory from '../models/BonusHistory.js';

// Tạo giao dịch mới
export const createBonus = async (req, res) => {
  try {
    const user = await AuthMiddleware._validateToken(req, res);
    const { BonusType, amount, balance, sourcePayment } = req.body;
    const newBonus = new BonusHistory({
      userId: user._id,
      BonusType,
      sourcePayment,
      amount,
      balance,
    });

    await newBonus.save();
    res.status(201).json(newBonus);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Lấy tất cả giao dịch
export const getListBonuss = async (req, res) => {
  try {
    const user = await AuthMiddleware._validateToken(req, res);
    const Bonuss = await BonusHistory.find({ userId: user._id });
    res.status(200).json(Bonuss);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
