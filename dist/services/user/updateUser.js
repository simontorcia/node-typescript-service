"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = updateUser;
const db_1 = __importDefault(require("../../database/db"));
async function updateUser(id, updates) {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    if (!keys.length)
        return false;
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const [result] = await db_1.default.execute(`UPDATE users SET ${setClause} WHERE id = ?`, [...values, id]);
    return result.affectedRows > 0;
}
