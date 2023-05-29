"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modelProduct_1 = __importDefault(require("../models/modelProduct"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const Notification_Todo_1 = __importDefault(require("../class/Notification.Todo"));
class ManageProducts {
    postProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { iva, name, category, price, priceBuy, fechaInicio, description, fechaFin, } = req.body.data;
                const tokenCreate = req.headers["x-id-token"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenCreate, config_1.SECRET);
                const tokenIdUser = verifyToken.id;
                if (!tokenIdUser) {
                    return res
                        .status(400)
                        .json({ ok: false, message: "No existe el token" });
                }
                else {
                    const product = new modelProduct_1.default({
                        iva,
                        name,
                        tokenIdUser,
                        category,
                        price,
                        priceBuy,
                        fechaInicio,
                        description,
                        fechaFin,
                    });
                    const produ = yield product.save();
                    yield new Notification_Todo_1.default().createNotificationClass("Se creo un nuevo  producto", name, "product", tokenIdUser);
                    return res
                        .status(200)
                        .json({
                        ok: true,
                        message: "Producto creado correctamente",
                        data: produ,
                    });
                }
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ ok: false, message: "Error en el servidor" });
            }
        });
    }
    getProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenCreate = req.params._id;
                const verifyToken = jsonwebtoken_1.default.verify(tokenCreate, config_1.SECRET);
                const tokenIdUser = verifyToken.id;
                if (!tokenIdUser) {
                    return res
                        .status(400)
                        .json({ ok: false, message: "No existe el token" });
                }
                const products = yield modelProduct_1.default.find({
                    tokenIdUser,
                });
                return res.status(200).json({ ok: true, products });
            }
            catch (error) {
                return res.status(500).json({ ok: false, message: error });
            }
        });
    }
    getProductsId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenCreate = req.headers["id-token"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenCreate, config_1.SECRET);
                const tokenIdUser = verifyToken.id;
                if (!tokenIdUser) {
                    return res
                        .status(400)
                        .json({ ok: false, message: "No existe el token" });
                }
                const product = yield modelProduct_1.default.findById(req.params.id);
                return res.status(200).json({ ok: true, data: product });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ ok: false, message: "Error en el servidor" });
            }
        });
    }
    getProductsIdCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenCreate = req.headers["id-token"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenCreate, config_1.SECRET);
                const tokenIdUser = verifyToken.id;
                if (!tokenIdUser) {
                    return res
                        .status(400)
                        .json({ ok: false, message: "No existe el token" });
                }
                const idCategory = req.params.idCategory;
                const product = yield modelProduct_1.default.find({ idCategory }, { tokenIdUser });
                return res.status(200).json({ ok: true, product });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ ok: false, message: "Error en el servidor" });
            }
        });
    }
    putProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenCreate = req.headers["id-token"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenCreate, config_1.SECRET);
                const tokenIdUser = verifyToken.id;
                if (!tokenIdUser) {
                    return res
                        .status(400)
                        .json({ ok: false, message: "No existe el token" });
                }
                const product = yield modelProduct_1.default.findByIdAndUpdate(req.params.id, req.body.data, {
                    new: true,
                });
                return res
                    .status(200)
                    .json({ ok: true, message: "Product Update", product });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ ok: false, message: "Error en el servidor" });
            }
        });
    }
    deleteProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenCreate = req.headers["id-token"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenCreate, config_1.SECRET);
                const tokenIdUser = verifyToken.id;
                if (!tokenIdUser) {
                    return res
                        .status(400)
                        .json({ ok: false, message: "No existe el token" });
                }
                const product = yield modelProduct_1.default.findByIdAndDelete(req.params.id, {
                    tokenIdUser,
                });
                yield new Notification_Todo_1.default().createNotificationClass("Se Elimino el producto con exito", "Se elimino el producto", "product", tokenIdUser);
                return res
                    .status(200)
                    .json({ ok: true, message: "Product Delete", product });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ ok: false, message: "Error en el servidor" });
            }
        });
    }
}
exports.default = ManageProducts;
//# sourceMappingURL=GestionProductos.js.map