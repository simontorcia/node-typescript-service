"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(50).required(),
    surname: joi_1.default.string().min(2).max(50).required(),
    birth_date: joi_1.default.date().iso().required(), // ISO = YYYY-MM-DD
    sex: joi_1.default.string().valid('M', 'F', 'O').required(), // O = other
});
exports.updateUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(50),
    surname: joi_1.default.string().min(2).max(50),
    birth_date: joi_1.default.date().iso(),
    sex: joi_1.default.string().valid('M', 'F', 'O'),
});
