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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const comprasModelClass_1 = __importDefault(require("../class/comprasModelClass"));
const Compras_1 = __importDefault(require("../models/Compras"));
const Compras_Salidas_1 = __importDefault(require("../interfaces/Compras.Salidas"));
class ComprasClass {
    getCompras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idToken = req.headers.authorization;
                const verifyToken = jsonwebtoken_1.default.verify(idToken, config_1.SECRET);
                const response = yield Compras_1.default.find({
                    idCompra: req.params.id,
                });
                return res.status(200).json({ message: "OK_SUCESSFUL_COMPRA", response });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "Error en el servidor ok", error });
            }
        });
    }
    getComprasFv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idToken = req.headers.authorization;
                const verifyToken = jsonwebtoken_1.default.verify(idToken, config_1.SECRET);
                const responseFv = yield Compras_Salidas_1.default.find({
                    tokeIdUser: verifyToken.id,
                });
                return res
                    .status(200)
                    .json({ message: "OK_SUCESSFUL_COMPRA", responseFv });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "Error en el servidor ok", error });
            }
        });
    }
    postCompras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idToken = req.headers.authorization;
                const verifyToken = jsonwebtoken_1.default.verify(idToken, config_1.SECRET);
                const response = new comprasModelClass_1.default().setProperties(req.body.data, verifyToken.id);
                return res.status(200).json({ message: "OK_SUCESSFUL_COMPRA", response });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "Error en el servidor ok", error });
            }
        });
    }
    putCompras(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    deleteCompras(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = ComprasClass;
//# sourceMappingURL=GestionCompras.js.map