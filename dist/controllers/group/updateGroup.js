"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGroupController = updateGroupController;
const groupService_1 = require("../../services/groupService");
async function updateGroupController(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ message: 'Group name is required' });
            return;
        }
        const updated = await (0, groupService_1.updateGroup)(id, name);
        if (!updated) {
            res.status(404).json({ message: 'Group not found or no changes made' });
            return;
        }
        res.json({ message: 'Group updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
