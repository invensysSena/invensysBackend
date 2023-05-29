"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GestionInventory_1 = __importDefault(require("../controllers/GestionInventory"));
const router = (0, express_1.Router)();
class RouterInventory extends GestionInventory_1.default {
    PostInventory() {
        router.post("/inventory", this.postInventory);
        return router;
    }
    GetInventory() {
        router.get("/inventory/:id", this.getInventory);
        return router;
    }
    PutInventoryId() {
        router.put("/inventory/:_id", this.putInventoryId);
        return router;
    }
    // public PostInventory(){
    //     router.post('/inventory',this.postInventory)
    //     return router;
    DeleteInventoryId() {
        router.delete("/inventory/:_id", this.deleteInventoryId);
        return router;
    }
    UploadInsertProduct() {
        router.post("/subProducts", this.UploadInsertProducts);
        return router;
    }
    getSubProducts() {
        router.get("/subProducts/:id", this.GetSubProducta);
        return router;
    }
    postTranslateProducts() {
        router.post("/translateProducts", this.TranslateProducts);
        return router;
    }
    getTranslateProducts() {
        router.get("/translateProducts/:id", this.GetTranslateProducts);
        return router;
    }
    UpdateSubProducts() {
        router.put("/translateSubProducts/:id", this.postTranslateProductsOrigen);
        return router;
    }
    UpdateEmailBodega() {
        router.put("/updateEmailBodega/:id", this.UpdateCorreoBodega);
        return router;
    }
    GetAllSubProducts() {
        router.get("/subProducts", this.SubProductsIdAll);
        return router;
    }
    DisminucionUnidades() {
        router.get("/disminucionUnidades", this.searchProductUnidadesDisminucon);
        return router;
    }
}
exports.default = RouterInventory;
//# sourceMappingURL=router.inventary.js.map