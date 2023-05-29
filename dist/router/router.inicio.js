"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GestionInicio_1 = __importDefault(require("../controllers/GestionInicio"));
const router = (0, express_1.Router)();
class RouterInicio extends GestionInicio_1.default {
    GetModules() {
        router.get('/modules/:id', this.getModules);
        return router;
    }
}
exports.default = RouterInicio;
//# sourceMappingURL=router.inicio.js.map