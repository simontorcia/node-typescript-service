"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGroup = deleteGroup;
const db_1 = __importDefault(require("../../database/db"));
async function deleteGroup(id) {
    const [result] = await db_1.default.execute('DELETE FROM `groups` WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
