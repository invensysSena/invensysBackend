"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const InventorySchema = new mongoose_1.Schema({
    tokeIdUser: { type: String, require: true },
    name_inventory: { type: String, require: true },
    description: { type: String, require: true },
    estadoInventory: { type: String },
    responsableInventory: { type: String },
    type: { type: String },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Inventory", InventorySchema);
//# sourceMappingURL=modelInventario.js.map