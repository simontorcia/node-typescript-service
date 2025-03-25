"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGroupSchema = exports.groupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.groupSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).required()
});
exports.updateGroupSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100)
});
