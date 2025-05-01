// src/controllers/userController.js
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as AuthMiddleware from '../middleware/authMiddleware.js';

export const login = async (req, res) => {
    const { value, password } = req.body;

    try {
        // Tìm người dùng theo email, username hoặc phone
        const existingUser = await User.findOne({
            $or: [
                { email: value },
                { username: value },
                { phone: value }
            ]
        });

        // Nếu không tìm thấy người dùng
        if (!existingUser) {
            return res.status(400).json({ message: 'Tài khoản không tồn tại' });
        }

        // Kiểm tra mật khẩu
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Mật khẩu không đúng' });
        }

        const currentTime = Date.now();

        // Tạo token không có thời hạn
        const token = jwt.sign(
            { id: existingUser._id, currentTime: currentTime },
            process.env.JWT_SECRET
        );

        // Lưu token vào cơ sở dữ liệu
        existingUser.token = token;
        await existingUser.save();

        const { password: _, ...userData } = existingUser.toObject();

        // Trả về thông tin người dùng và token
        return res.status(200).json({
            message: 'Đăng nhập thành công',
            user: userData,
            token
        });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

export const validateToken = async (req, res) => {
    await AuthMiddleware._validateToken(req, res);

    return res.status(200).json({ message: "Token validated successfully" });
};

// Hàm tạo user mới (bạn đã có)
export const createUser = async (req, res) => {
    const { name, username, email, phone, password, role } = req.body;
    try {
        const existingUser = await User.findOne({
            $or: [
                { email },
                { username },
                { phone }
            ]
        });
        if (existingUser) {
            let errorMessage = '';

            if (existingUser.email === email) {
                errorMessage = 'Email đã được sử dụng';
            } else if (existingUser.username === username) {
                errorMessage = 'Tên người dùng đã tồn tại';
            } else if (existingUser.phone === phone) {
                errorMessage = 'Số điện thoại đã được đăng ký';
            }

            return res.status(400).json({ message: errorMessage });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, username, email, phone, password: hashedPassword, role });
        await newUser.save();
        return res.status(201).json({
            message: 'User created successfully',
            user: { name: newUser.name, email: newUser.email, role: newUser.role }
        });
    } catch (error) {
        console.error('createUser error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Hàm cập nhật user theo ID
export const updateUser = async (req, res) => {
    const { name, email, phone, image } = req.body;

    try {
        // Validate user via token
        const user = await AuthMiddleware._validateToken(req, res);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const duplicateCheck = await User.findOne({
            $or: [{ email }, { phone }],
            _id: { $ne: user._id },
        });

        if (duplicateCheck) {
            return res.status(400).json({
                message: 'Email hoặc số điện thoại đã được sử dụng',
            });
        }

        // Prepare update data and increment version
        const updates = {
            name,
            email,
            phone,
            image,
            updatedAt: Date.now(),
        };

        // Find the user and update
        const updated = await User.findByIdAndUpdate(
            user._id,
            {
                $set: updates,
                $inc: { __v: 1 },
            },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove sensitive data before sending the response
        const { password: _, ...userData } = updated.toObject();
        return res.status(200).json({
            message: 'User updated successfully',
            user: userData,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


/** 
 * Đổi mật khẩu
 * - req.params.id: ID của user
 * - req.body.oldPassword: mật khẩu cũ
 * - req.body.newPassword: mật khẩu mới
 */
export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        // 1. Tìm user theo ID
        let user = await AuthMiddleware._validateToken(req, res);

        // 2. Kiểm tra mật khẩu cũ
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        // 3. Hash mật khẩu mới và cập nhật
        const hashedNew = await bcrypt.hash(newPassword, 10);
        user.password = hashedNew;
        await user.save();

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('changePassword error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUser = async (req, res) => {
    try {
        let user = await AuthMiddleware._validateToken(req, res);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};