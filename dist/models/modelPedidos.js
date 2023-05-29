"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PedidosSchema = new mongoose_1.Schema({
    tokeIdUser: { type: String, required: true },
    id_subProducto: { type: String, required: true },
    id_provedor: { type: String, required: true },
    id_bodega: { type: String, required: true, },
    company: { type: String, required: true },
    unidades: { type: Number, required: true },
    tipo: { type: String, },
    fecha: { type: String },
    totalCompra: { type: Number, required: true },
    idPedidoProvider: { type: String, required: true },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Pedidos', PedidosSchema);
//# sourceMappingURL=modelPedidos.js.map