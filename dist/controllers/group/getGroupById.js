"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupByIdController = getGroupByIdController;
const groupService_1 = require("../../services/groupService");
async function getGroupByIdController(req, res) {
    try {
        const id = parseInt(req.params.id);
        const group = await (0, groupService_1.getGroupById)(id);
        if (!group) {
            res.status(404).json({ message: 'Group not found' });
            return;
        }
        res.json(group);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
