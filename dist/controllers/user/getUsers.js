"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersController = getUsersController;
const userService_1 = require("../../services/userService");
const pagination_1 = require("../../utils/pagination");
async function getUsersController(req, res) {
    try {
        const page = Number(req.query.page);
        const pageSize = Number(req.query.pageSize);
        const { offset, limit } = (0, pagination_1.calculatePagination)(page, pageSize);
        const { data, total } = await (0, userService_1.getUsers)(limit, offset);
        const pagination = {
            totalItems: total,
            ...(0, pagination_1.createPaginationMetadata)(page, total, pageSize)
        };
        res.json({
            users: data,
            pagination
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
