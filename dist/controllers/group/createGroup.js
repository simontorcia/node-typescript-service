"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroupController = createGroupController;
const groupService_1 = require("../../services/groupService");
async function createGroupController(req, res) {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ message: 'Group name is required' });
            return;
        }
        const groupId = await (0, groupService_1.createGroup)(name);
        res.status(201).json({ message: 'Group created', groupId });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
