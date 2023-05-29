"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PedidoProvider = new mongoose_1.default.Schema({
    tokeIdUser: { type: String, required: true },
    NR: { type: String, required: true },
    name: { type: String, required: true },
    fecha: { type: String, required: true },
    cantidadProductos: { type: Number, required: true },
    totalComprap: { type: Number, required: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("PedidoProvider", PedidoProvider);
//# sourceMappingURL=PedidosProvedor.js.map