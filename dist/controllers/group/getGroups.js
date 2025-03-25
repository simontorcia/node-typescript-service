"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupsController = getGroupsController;
const groupService_1 = require("../../services/groupService");
async function getGroupsController(req, res) {
    try {
        const groups = await (0, groupService_1.getGroups)();
        res.json(groups);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
