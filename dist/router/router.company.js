"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GestionCompany_1 = __importDefault(require("../controllers/GestionCompany"));
const router = (0, express_1.Router)();
class RouterCompany extends GestionCompany_1.default {
    PostCompany() {
        router.post('/company', this.postCompany);
        return router;
    }
    GetCompany() {
        router.get('/company', this.getCompany);
        return router;
    }
    UpdateCompany() {
        router.put('/company/:id', this.updateCompany);
        return router;
    }
    DeleteCompany() {
        router.delete('/company/:id', this.deleteCompany);
        return router;
    }
}
exports.default = RouterCompany;
//# sourceMappingURL=router.company.js.map