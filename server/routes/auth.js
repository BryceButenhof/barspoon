import { UserModel } from "../models/userModel.js";
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secretKey = process.env.SECRET_KEY;
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ error: 'Authentication failed' });
    }
});

export { router as AuthRouter };