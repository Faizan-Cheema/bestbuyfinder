import User from '../Models/userModel.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
        res.redirect('/login');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};




export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log(`User Password: ${user.password}`);
        console.log(`User: ${user}`);

        if (!user || user.password !== password) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Send user ID in the response
        res.json({ userId: user._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
