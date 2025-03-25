"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/user/userRoutes"));
const groupRoutes_1 = __importDefault(require("./routes/group/groupRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware per il parsing del JSON
app.use('/api/users', userRoutes_1.default);
app.use('/api/groups', groupRoutes_1.default);
exports.default = app;
