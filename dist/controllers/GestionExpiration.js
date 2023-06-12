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
const SubProductos_model_1 = __importDefault(require("../models/SubProductos.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const Notification_Todo_1 = __importDefault(require("../class/Notification.Todo"));
class ManageExpiration {
    CreateExpiration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const Token = req.headers["authorization"];
            const veryfyToken = jsonwebtoken_1.default.verify(Token, config_1.SECRET);
            const tokenIdUser = veryfyToken.id;
            const dataSubProduct = yield SubProductos_model_1.default.find({
                tokenIdUser: tokenIdUser,
            }, { createdAt: 1, _id: 0 });
            dataSubProduct.forEach((element) => {
                const fechaVencimiento = element.createdAt;
                const diasRestantes = Math.floor((fechaVencimiento - Date.now()) / (1000 * 60 * 60 * 24));
                if (diasRestantes <= 0) {
                    new Notification_Todo_1.default().createNotificationClass("Producto Vencido", "El producto " + element._id + " esta vencido", "caducidad", tokenIdUser);
                }
                else if (diasRestantes > 7) {
                    new Notification_Todo_1.default().createNotificationClass("Producto por vencer", "El producto " + element._id + " esta por vencer", "caducidad", tokenIdUser);
                }
            });
        });
    }
    GetExpiration() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSubProduct = yield SubProductos_model_1.default.find({}, { createdAt: 1, _id: 0 });
            console.log("---------", dataSubProduct);
        });
    }
}
exports.default = ManageExpiration;
//# sourceMappingURL=GestionExpiration.js.map