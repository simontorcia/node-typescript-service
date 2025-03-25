"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroups = getGroups;
const db_1 = __importDefault(require("../../database/db"));
async function getGroups() {
    const [rows] = await db_1.default.execute('SELECT * FROM `groups` ORDER BY created_at DESC');
    return rows;
}
