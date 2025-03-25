"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = getUserById;
const db_1 = __importDefault(require("../../database/db"));
async function getUserById(id) {
    const [rows] = await db_1.default.execute(`SELECT * FROM users WHERE id = ?`, [id]);
    const users = rows;
    return users.length ? users[0] : null;
}
