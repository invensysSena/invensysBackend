"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modelCompany_1 = __importDefault(require("../models/modelCompany"));
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ManageCompany {
    postCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenCreated = req.headers["authorization"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenCreated, config_1.SECRET);
                const tokenIdUser = verifyToken.id;
                if (!tokenIdUser) {
                    return res.status(400).json({
                        message: "No existe el token",
                    });
                }
                else {
                    const { tipoPersona, nit, tipoIdentificacion, numero, nombre, correo, telefono, pais, departamento, ciudad, direccion, } = req.body.data;
                    const company = new modelCompany_1.default({
                        tokenIdUser,
                        tipoPersona,
                        nit,
                        tipoIdentificacion,
                        numero,
                        nombre,
                        correo,
                        telefono,
                        pais,
                        departamento,
                        ciudad,
                        direccion,
                    });
                    const CompanyCreated = yield company.save();
                    return res.status(200).json({
                        message: "Company created successfully",
                        CompanyCreated,
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal server error",
                    error,
                });
            }
        });
    }
    getCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenCreated = req.headers["authorization"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenCreated, config_1.SECRET);
                const tokenIdUser = verifyToken.id;
                if (!tokenIdUser) {
                    return res.status(400).json({
                        message: "No existe el token",
                    });
                }
                else {
                    const company = yield modelCompany_1.default.find({ tokenIdUser });
                    return res.status(200).json({
                        message: "Company created successfully",
                        company,
                    });
                }
            }
            catch (error) {
                return new Error(error);
            }
        });
    }
    updateCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenCreated = req.headers["x-id-token"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenCreated, config_1.SECRET);
                const tokenIdUser = verifyToken.id;
                if (!tokenIdUser) {
                    return res.status(400).json({
                        message: "No existe el token",
                    });
                }
                else {
                    const { id } = req.params;
                    const { tipoPersona, nit, tipoIdentificacion, numero, nombre, correo, telefono, pais, departamento, ciudad, direccion, } = req.body;
                    const company = yield modelCompany_1.default.findByIdAndUpdate(id, {
                        tipoPersona,
                        nit,
                        tipoIdentificacion,
                        numero,
                        nombre,
                        correo,
                        telefono,
                        pais,
                        departamento,
                        ciudad,
                        direccion,
                    }, { new: true });
                    return res.status(200).json({
                        message: "Company updated successfully",
                        company,
                    });
                }
            }
            catch (error) { }
        });
    }
    deleteCompany(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenCreated = req.headers["x-id-token"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenCreated, config_1.SECRET);
                const tokenIdUser = verifyToken.id;
                if (!tokenIdUser) {
                    return res.status(400).json({
                        message: "No existe el token",
                    });
                }
                else {
                    const { id } = req.params;
                    const company = yield modelCompany_1.default.findByIdAndDelete(id);
                    return res.status(200).json({
                        message: "Company deleted successfully",
                        company,
                    });
                }
            }
            catch (error) {
                return new Error(error);
            }
        });
    }
}
exports.default = ManageCompany;
//# sourceMappingURL=GestionCompany.js.map