// middleware/authMiddleware.ts
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

export const _validateToken = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: `Token không được cung cấp ${req.headers.Authorization}` });
    }

    try {
        // Giải mã token để lấy thông tin người dùng
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu không
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        // Gán thông tin người dùng vào request để sử dụng ở các middleware hoặc route handler
        return user;

    } catch (error) {
        return res.status(401).json({ message: error.message || 'Token không hợp lệ hoặc hết hạn' });
    }
};
