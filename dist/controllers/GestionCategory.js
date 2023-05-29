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
const CategoryM_1 = __importDefault(require("../models/CategoryM"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Notification_Todo_1 = __importDefault(require("../class/Notification.Todo"));
const config_1 = require("../config/config");
class Categorys {
    createCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name_category, description, imgURL, imgId } = req.body.data;
                const Tokenid_U = req.headers["x-id-token"];
                const verifyToken = jsonwebtoken_1.default.verify(Tokenid_U, config_1.SECRET);
                const tokeIdUser = verifyToken.id;
                if (!tokeIdUser) {
                    return res.status(400).json({
                        ok: false,
                        message: 'No existe el token'
                    });
                }
                else {
                    const data = new CategoryM_1.default({
                        tokeIdUser,
                        name_category,
                        description,
                        imgURL,
                        imgId
                    });
                    const dataCategory = yield data.save();
                    yield new Notification_Todo_1.default().createNotificationClass("Se creo una nueva categoria", name_category, "category", tokeIdUser);
                    return res.status(201).json({
                        status: 201,
                        message: 'Categoria creada',
                        data: dataCategory
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al crear la categoria',
                    error
                });
            }
        });
    }
    getCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const Tokenid_U = req.params.id;
            const verifyToken = jsonwebtoken_1.default.verify(Tokenid_U, config_1.SECRET);
            const tokeIdUser = verifyToken.id;
            try {
                if (!tokeIdUser) {
                    return res.status(400).json({
                        ok: false,
                        message: 'No existe el token'
                    });
                }
                const dataCategory = yield CategoryM_1.default.find({ tokeIdUser });
                return res.status(200).json({
                    ok: true,
                    message: 'Categorias',
                    data: dataCategory
                });
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al obtener las categorias',
                    error
                });
            }
        });
    }
    getCategoryId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Tokenid_U = req.headers["x-id-token"];
                const verifyToken = jsonwebtoken_1.default.verify(Tokenid_U, config_1.SECRET);
                const tokeIdUser = verifyToken.id;
                if (!tokeIdUser) {
                    return res.status(400).json({
                        ok: false,
                        message: 'No existe el token'
                    });
                }
                const dataCategory = yield CategoryM_1.default.findById(req.params._id);
                return res.status(200).json({
                    ok: true,
                    message: 'Categorias',
                    data: dataCategory
                });
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al obtener las categorias',
                    error
                });
            }
        });
    }
    putCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name_category, description } = req.body.data;
                const Tokenid_U = req.headers["x-id-token"];
                const verifyToken = jsonwebtoken_1.default.verify(Tokenid_U, config_1.SECRET);
                const tokeIdUser = verifyToken.id;
                if (!tokeIdUser) {
                    return res.status(400).json({
                        ok: false,
                        message: 'No existe el token'
                    });
                }
                else {
                    const ipdateCategory = yield CategoryM_1.default.findByIdAndUpdate(req.params._id, req.body.data, {
                        new: true
                    });
                    return res.status(200).json({
                        ok: true,
                        message: 'update_category',
                        data: ipdateCategory
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error_category',
                    error
                });
            }
        });
    }
    deleteCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Tokenid_U = req.headers["x-id-token"];
                const verifyToken = jsonwebtoken_1.default.verify(Tokenid_U, config_1.SECRET);
                const tokeIdUser = verifyToken.id;
                if (!tokeIdUser) {
                    return res.status(400).json({
                        ok: false,
                        message: 'No existe el token'
                    });
                }
                const dataCategory = yield CategoryM_1.default.findByIdAndDelete(req.params._id);
                yield new Notification_Todo_1.default().createNotificationClass("Eliminaste una categoria", "Se borro con exito", "category", tokeIdUser);
                return res.status(200).json({
                    ok: true,
                    message: 'Delete category',
                    data: dataCategory
                });
            }
            catch (error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al eliminar  las categorias',
                    error
                });
            }
        });
    }
    getCategoryProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = Categorys;
//# sourceMappingURL=GestionCategory.js.map