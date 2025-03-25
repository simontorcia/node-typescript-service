"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
const db_1 = __importDefault(require("../../database/db"));
async function getUsers(limit = 10, offset = 0) {
    const [rows] = await db_1.default.execute(`SELECT * FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?`, [limit, offset]);
    const [countRows] = await db_1.default.execute(`SELECT COUNT(*) as total FROM users`);
    const total = countRows[0].total;
    return {
        data: rows,
        total
    };
}
