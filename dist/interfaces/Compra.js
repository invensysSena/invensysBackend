"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CompraSchema = new mongoose_1.default.Schema({
    tokeIdUser: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    fecha: { type: String, required: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Compra', CompraSchema);
//# sourceMappingURL=Compra.js.map