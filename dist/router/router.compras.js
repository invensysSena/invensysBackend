"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GestionCompras_1 = __importDefault(require("../controllers/GestionCompras"));
const router = (0, express_1.Router)();
class RouterCompras extends GestionCompras_1.default {
    PostComprasRouter() {
        router.post("/compras", this.postCompras);
        return router;
    }
    GetComprasRouter() {
        router.get("/compras/:id", this.getCompras);
        return router;
    }
    GetComprasFvRouter() {
        router.get("/comprasfv", this.getComprasFv);
        return router;
    }
}
exports.default = RouterCompras;
//# sourceMappingURL=router.compras.js.map