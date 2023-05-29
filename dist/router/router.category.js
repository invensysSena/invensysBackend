"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const GestionCategory_1 = __importDefault(require("../controllers/GestionCategory"));
class RouterCategory extends GestionCategory_1.default {
    CreateCategory() {
        router.post('/category', this.createCategory);
        return router;
    }
    GetCategory() {
        router.get('/category/:id', this.getCategory);
        return router;
    }
    GetCategoryId() {
        router.get('/category/:_id', this.getCategoryId);
        return router;
    }
    PutCategory() {
        router.put('/category/:_id', this.putCategory);
        return router;
    }
    DeleteCategory() {
        router.delete('/category/:_id', this.deleteCategory);
        return router;
    }
    GetCategoryProducts() {
        router.get('/category/products/:id', this.getCategoryProducts);
        return router;
    }
}
exports.default = RouterCategory;
//# sourceMappingURL=router.category.js.map