"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdController = getUserByIdController;
const userService_1 = require("../../services/userService");
async function getUserByIdController(req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await (0, userService_1.getUserById)(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
