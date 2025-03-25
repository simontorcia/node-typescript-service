"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroup = createGroup;
const db_1 = __importDefault(require("../../database/db"));
async function createGroup(name) {
    const [result] = await db_1.default.execute('INSERT INTO `groups` (name) VALUES (?)', [name]);
    return result.insertId;
}
