"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TranslateSubPSchema = new mongoose_1.default.Schema({
    idAdmin: { type: String, required: true },
    idDestino: { type: String, required: true },
    idOrigen: { type: String, required: true },
    idSubProducto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    userCorreo: { type: String, required: true },
    origen: { type: String, required: true },
    responsable: { type: String, required: true },
    estado: {
        enum: ["Pendiente", "Aceptado", "Rechazado"],
        type: String,
        default: "Pendiente",
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = mongoose_1.default.model("TranslateSubP", TranslateSubPSchema);
//# sourceMappingURL=TranslateSubP.Model.js.map