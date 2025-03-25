"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = updateUserController;
const userService_1 = require("../../services/userService");
async function updateUserController(req, res) {
    try {
        const id = parseInt(req.params.id);
        const updates = req.body;
        const updated = await (0, userService_1.updateUser)(id, updates);
        if (!updated) {
            res.status(404).json({ message: 'User not found or no changes made' });
            return;
        }
        res.json({ message: 'User updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
