"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const providerSchema = new mongoose_1.Schema({
    idCategory: { type: String, required: true },
    tokenIdUser: { type: String, required: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('Provider', providerSchema);
//# sourceMappingURL=modelProviders.js.map