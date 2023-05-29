"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const validateToken = (req, res, next) => {
    const tokenCreate = req.headers.authorization;
    const veryfyToken = jsonwebtoken_1.default.verify(tokenCreate, config_1.SECRET);
    const tokenIdUser = veryfyToken.id;
    if (!tokenIdUser) {
        return res.json({
            message: "El token no existe!",
        });
    }
    next();
};
exports.validateToken = validateToken;
//# sourceMappingURL=ValidationToken.js.map