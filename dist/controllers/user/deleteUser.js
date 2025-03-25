"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = deleteUserController;
const userService_1 = require("../../services/userService");
async function deleteUserController(req, res) {
    try {
        const id = parseInt(req.params.id);
        const deleted = await (0, userService_1.deleteUser)(id);
        if (!deleted) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
