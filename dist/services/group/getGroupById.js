"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupById = getGroupById;
const db_1 = __importDefault(require("../../database/db"));
async function getGroupById(id) {
    const [rows] = await db_1.default.execute('SELECT * FROM `groups` WHERE id = ?', [id]);
    const groups = rows;
    return groups.length ? groups[0] : null;
}
