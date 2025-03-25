"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = deleteUser;
const db_1 = __importDefault(require("../../database/db"));
async function deleteUser(id) {
    const [result] = await db_1.default.execute(`DELETE FROM users WHERE id = ?`, [id]);
    return result.affectedRows > 0;
}
