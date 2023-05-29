"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subProductSchema = new mongoose_1.Schema({
    tokenIdUser: { type: String, required: true },
    name: { type: String, required: true },
    priceCompra: {
        type: Number,
        required: true,
    },
    priceVenta: {
        type: Number,
        required: true,
    },
    stockMinimo: {
        type: Number,
        required: true,
    },
    stockMaximo: {
        type: Number,
        required: true,
    },
    unidad: {
        type: Number,
        required: true,
    },
    caducidad: {
        type: String,
        required: true,
    },
    idInventory: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("SubProduct", subProductSchema);
//# sourceMappingURL=SubProductos.model.js.map