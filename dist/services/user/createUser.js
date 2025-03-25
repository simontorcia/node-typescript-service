"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
const db_1 = __importDefault(require("../../database/db"));
async function createUser(user) {
    const { name, surname, birth_date, sex } = user;
    const [result] = await db_1.default.execute(`INSERT INTO users (name, surname, birth_date, sex) VALUES (?, ?, ?, ?)`, [name, surname, birth_date, sex]);
    return result.insertId;
}
