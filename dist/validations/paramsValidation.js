"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.idParamSchema = joi_1.default.object({
    id: joi_1.default.number().integer().min(1).required()
});
