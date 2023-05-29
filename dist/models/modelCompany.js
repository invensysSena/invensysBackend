"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CompanySchema = new mongoose_1.default.Schema({
    tokenIdUser: { type: String, require: true },
    tipoPersona: { type: String, require: true },
    nit: { type: Number, require: true },
    tipoIdentificacion: { type: String, require: true },
    numero: { type: Number, require: true },
    nombre: { type: String, require: true },
    correo: { type: String, require: true },
    telefono: { type: Number, require: true },
    pais: { type: String, require: true },
    departamento: { type: String, require: true },
    ciudad: { type: String, require: true },
    direccion: { type: String, require: true },
});
exports.default = mongoose_1.default.model('Company', CompanySchema);
//# sourceMappingURL=modelCompany.js.map