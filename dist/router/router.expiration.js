"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GestionExpiration_1 = __importDefault(require("../controllers/GestionExpiration"));
const router = (0, express_1.Router)();
class ExpirationRouter extends GestionExpiration_1.default {
    PostCaducidad() {
        router.post("/caducidad", this.CreateExpiration);
        return router;
    }
    GetCaducidad() {
        router.get("/caducidad", this.GetExpiration);
        return router;
    }
}
exports.default = ExpirationRouter;
//# sourceMappingURL=router.expiration.js.map