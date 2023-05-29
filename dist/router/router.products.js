"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const GestionProductos_1 = __importDefault(require("../controllers/GestionProductos"));
class RouterProducts extends GestionProductos_1.default {
    Getproducts() {
        router.get('/getProducts/:_id', this.getProducts);
        return router;
    }
    GetproductsId() {
        router.get('/getProductsId/:id', this.getProductsId);
        return router;
    }
    GetproductsIdCategory() {
        router.get('/productsCategory/:idCategory', this.getProductsIdCategory);
        return router;
    }
    PostProduct() {
        router.post('/createProducts', this.postProducts);
        return router;
    }
    PutProducts() {
        router.put('/updateProducts/:id', this.putProducts);
        return router;
    }
    DeleteProduct() {
        router.delete('/deleteProducts/:id', this.deleteProducts);
        return router;
    }
}
exports.default = RouterProducts;
//# sourceMappingURL=router.products.js.map