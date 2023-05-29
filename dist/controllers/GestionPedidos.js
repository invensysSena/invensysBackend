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
const modelPedidos_1 = __importDefault(require("../models/modelPedidos"));
const PedidosProvedor_1 = __importDefault(require("../models/PedidosProvedor"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const Pedidos_model_1 = __importDefault(require("../class/Pedidos.model"));
class ManagePedidos {
    postPedidos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenAccesId = req.headers["authorization"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenAccesId, config_1.SECRET);
                const idTokenAdmin = verifyToken.id;
                yield new Pedidos_model_1.default().setProperties(req.body.data, idTokenAdmin);
                const responseClass = null;
                res.status(200).json({ message: "sucess", responseClass });
            }
            catch (error) {
                return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
            }
        });
    }
    getPedidos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenAccesId = req.headers["authorization"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenAccesId, config_1.SECRET);
                const idTokenAdmin = verifyToken.id;
                const pedidos = yield modelPedidos_1.default.find({ tokeIdUser: idTokenAdmin });
                const pedidosproveedor = yield PedidosProvedor_1.default.find({ tokeIdUser: idTokenAdmin });
                return res.status(200).json({ message: "PEDIDOS_FOUND", pedidos, pedidosproveedor });
            }
            catch (error) {
                return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
            }
        });
    }
    getPedidosId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const pedidos = yield modelPedidos_1.default.findById(id);
                return res.status(200).json({ message: "PEDIDOS_FOUND", pedidos });
            }
            catch (error) {
                return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
            }
        });
    }
    putPedidos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id_producto, id_provedor, id_inventario, company, cantidad, fecha, } = req.body;
                const pedidos = yield modelPedidos_1.default.findByIdAndUpdate(id, {
                    id_producto,
                    id_provedor,
                    id_inventario,
                    company,
                    cantidad,
                    fecha,
                }, { new: true });
                return res.status(200).json({ message: "PEDIDOS_UPDATED", pedidos });
            }
            catch (error) {
                return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
            }
        });
    }
    deletePedidos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const pedidos = yield modelPedidos_1.default.findByIdAndDelete(id);
                return res.status(200).json({ message: "PEDIDOS_DELETED", pedidos });
            }
            catch (error) {
                return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
            }
        });
    }
}
exports.default = ManagePedidos;
//# sourceMappingURL=GestionPedidos.js.map