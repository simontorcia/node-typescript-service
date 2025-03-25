"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGroup = updateGroup;
const db_1 = __importDefault(require("../../database/db"));
async function updateGroup(id, name) {
    const [result] = await db_1.default.execute('UPDATE `groups` SET name = ? WHERE id = ?', [name, id]);
    return result.affectedRows > 0;
}
