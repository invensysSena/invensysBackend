"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    tokeIdUser: { type: String, require: true },
    name_category: { type: String, require: true },
    description: { type: String, require: true },
    imgURL: { type: String },
    imgId: { type: String },
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Category", CategorySchema);
//# sourceMappingURL=CategoryM.js.map