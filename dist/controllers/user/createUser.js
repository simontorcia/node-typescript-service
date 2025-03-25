"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = createUserController;
const userService_1 = require("../../services/userService");
async function createUserController(req, res) {
    try {
        const user = req.body;
        if (!user.name || !user.surname || !user.birth_date || !user.sex) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        const userId = await (0, userService_1.createUser)(user);
        res.status(201).json({ message: 'User created', userId });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
