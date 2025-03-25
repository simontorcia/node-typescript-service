"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGroupController = deleteGroupController;
const groupService_1 = require("../../services/groupService");
async function deleteGroupController(req, res) {
    try {
        const id = parseInt(req.params.id);
        const deleted = await (0, groupService_1.deleteGroup)(id);
        if (!deleted) {
            res.status(404).json({ message: 'Group not found' });
            return;
        }
        res.json({ message: 'Group deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
