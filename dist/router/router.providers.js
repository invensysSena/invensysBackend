"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const GestionProviders_1 = __importDefault(require("../controllers/GestionProviders"));
class RouterProviders extends GestionProviders_1.default {
    GetProviders() {
        router.get('/providers/:id', this.getProviders);
        return router;
    }
    GetProvidersId() {
        router.get('/providers/:id', this.getProvidersId);
        return router;
    }
    PostProviders() {
        router.post('/providers', this.postProviders);
        return router;
    }
    PutProviders() {
        router.put('/providers/:id', this.putProviders);
        return router;
    }
    DeleteProviders() {
        router.delete('/providers/:id', this.deleteProviders);
        return router;
    }
    GetProvidersProducts() {
        router.get('/providers/:id/products', this.getProvidersProducts);
        return router;
    }
}
exports.default = RouterProviders;
//# sourceMappingURL=router.providers.js.map