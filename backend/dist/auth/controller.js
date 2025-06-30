"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.me = me;
const user_model_1 = require("./user.model");
async function register(req, res, next) {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await user_model_1.UserModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Create new user
        const user = await user_model_1.UserModel.create({ name, email, password });
        // Set session
        req.session.userId = user.id;
        req.session.userName = user.name;
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
}
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await user_model_1.UserModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Check password
        const isValidPassword = await user_model_1.UserModel.comparePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Set session
        req.session.userId = user.id;
        req.session.userName = user.name;
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
}
async function logout(req, res, next) {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: 'Logout failed' });
            }
            res.clearCookie('connect.sid');
            res.json({ message: 'Logged out successfully' });
        });
    }
    catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Logout failed' });
    }
}
async function me(req, res, next) {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const user = await user_model_1.UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.error('Me error:', error);
        res.status(500).json({ error: 'Failed to get user' });
    }
}
