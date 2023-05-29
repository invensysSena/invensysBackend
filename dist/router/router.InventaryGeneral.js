"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GestionInventaryGeneral_1 = __importDefault(require("../controllers/GestionInventaryGeneral"));
const router = (0, express_1.Router)();
class RouterInventaryGeneral extends GestionInventaryGeneral_1.default {
    PostInventaryGeneral() {
        router.post("/inventGeneral", this.postInventaryGeneral);
        return router;
    }
    GetInventaryGeneral() {
        router.get("/inventGeneral/:id", this.getInventaryGeneral);
        return router;
    }
    PutInventaryGeneral() {
        router.put("/inventGeneral/:id", this.putInventaryGeneral);
        return router;
    }
    DeleteInventaryGeneral() {
        router.delete("/inventGeneral/:id", this.deleteInventaryGeneral);
        return router;
    }
}
exports.default = RouterInventaryGeneral;
//# sourceMappingURL=router.InventaryGeneral.js.map