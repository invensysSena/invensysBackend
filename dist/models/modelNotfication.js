"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NotificationSchema = new mongoose_1.default.Schema({
    tokeIdUser: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    type: { type: String, require: true },
    estado: { type: Number, require: true, default: 1 },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Notification", NotificationSchema);
//# sourceMappingURL=modelNotfication.js.map