"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PedidosPendientesSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    precioCompra: {
        type: String,
        required: true,
    },
    precioVenta: {
        type: Number,
        required: true,
    },
    unidades: {
        type: Number,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    idBodega: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = (0, mongoose_1.model)('PedidosPendientes', PedidosPendientesSchema);
//# sourceMappingURL=modelPedidosPendientes.js.map