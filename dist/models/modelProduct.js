"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//import autoincrement from "mongoose-auto-increment";
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, },
    iva: Number,
    tokenIdUser: { type: String, require: true },
    category: String,
    price: Number,
    priceBuy: Number,
    description: String,
    fechaInicio: String,
    fechaFin: String,
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Product", ProductSchema);
//# sourceMappingURL=modelProduct.js.map