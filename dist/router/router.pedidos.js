"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GestionPedidos_1 = __importDefault(require("../controllers/GestionPedidos"));
const router = (0, express_1.Router)();
class RouterPedidos extends GestionPedidos_1.default {
    PostPedidos() {
        router.post('/pedidos', this.postPedidos);
        return router;
    }
    GetPedidos() {
        router.get('/pedidos', this.getPedidos);
        return router;
    }
    GetPedidosId() {
        router.get('/pedidos/:id', this.getPedidosId);
        return router;
    }
    PutPedidos() {
        router.put('/pedidos/:id', this.putPedidos);
        return router;
    }
    DeletePedidos() {
        router.delete('/pedidos/:id', this.deletePedidos);
        return router;
    }
}
exports.default = RouterPedidos;
//# sourceMappingURL=router.pedidos.js.map