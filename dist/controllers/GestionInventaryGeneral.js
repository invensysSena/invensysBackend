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
const InventaryGeneral_1 = __importDefault(require("../class/InventaryGeneral"));
const config_1 = require("../config/config");
const SubProductos_model_1 = __importDefault(require("../models/SubProductos.model"));
class MaganeIGeneral {
    postInventaryGeneral(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idCreated = req.headers["authorization"];
                const typeUser = req.headers["typeuser"];
                const decoded = jsonwebtoken_1.default.verify(idCreated, config_1.SECRET);
                const idTokenAdmin = decoded.id;
                yield new InventaryGeneral_1.default().setProperties(idTokenAdmin, typeUser, req.body);
                return res.status(200).json({ message: "sucess" });
            }
            catch (error) {
                return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
            }
        });
    }
    getInventaryGeneral(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const dataSubProduct = yield SubProductos_model_1.default.find({ idInventario: id });
                return res.status(200).json({ message: "sucess", dataSubProduct });
            }
            catch (error) {
                return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
            }
        });
    }
    putInventaryGeneral(req, res, next) {
        res.send("putInventaryGeneral");
    }
    deleteInventaryGeneral(req, res, next) {
        res.send("deleteInventaryGeneral");
    }
}
exports.default = MaganeIGeneral;
//# sourceMappingURL=GestionInventaryGeneral.js.map