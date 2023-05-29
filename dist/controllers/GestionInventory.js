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
const modelInventario_1 = __importDefault(require("../models/modelInventario"));
const TranslateSubP_Model_1 = __importDefault(require("../interfaces/TranslateSubP.Model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const Notification_Todo_1 = __importDefault(require("../class/Notification.Todo"));
const SubProductos_model_1 = __importDefault(require("../models/SubProductos.model"));
const database_1 = require("../database/database");
const TranlateBodega_1 = __importDefault(require("../class/TranlateBodega"));
const SubProductos_model_2 = __importDefault(require("../models/SubProductos.model"));
const modelNotfication_1 = __importDefault(require("../models/modelNotfication"));
class InventoryProduct {
    postInventory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name_inventory, description } = req.body.data;
                const token = req.headers["authorization"];
                let typeUser = req.headers["typeautorization"];
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
                const tokeIdUser = decoded.id;
                const conn = yield database_1.conexion.connect();
                if (typeUser === "superAdmin") {
                    conn.query("SELECT correo FROM admin WHERE idUsers = ? ", [tokeIdUser], (err, rows, fields) => __awaiter(this, void 0, void 0, function* () {
                        if (rows) {
                            const inventory = new modelInventario_1.default({
                                tokeIdUser,
                                name_inventory,
                                description,
                                estadoInventory: "activo",
                                responsableInventory: rows[0].correo,
                                type: "Administrador",
                            });
                            const response = yield inventory.save();
                            yield new Notification_Todo_1.default().createNotificationClass("Se creo una nueva bodega", name_inventory, "inventory", tokeIdUser);
                            res.status(200).json({ message: "Inventory created", response });
                        }
                    }));
                }
                else if (typeUser === "user") {
                    const token = req.headers["authorization1"];
                    const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
                    const tokeIdUser1 = decoded.id1;
                    conn.query("SELECT correo FROM account WHERE idAccount    = ? ", [tokeIdUser1], (err, rows, fields) => __awaiter(this, void 0, void 0, function* () {
                        if (rows) {
                            const inventory = new modelInventario_1.default({
                                tokeIdUser,
                                name_inventory,
                                description,
                                estadoInventory: "Activo",
                                responsableInventory: rows[0].correo,
                                type: "Usuario",
                            });
                            const response = yield inventory.save();
                            yield new Notification_Todo_1.default().createNotificationClass("Se creo un nuevo inventario", name_inventory, "inventory", tokeIdUser);
                            res.status(200).json({ message: "Inventory created", response });
                        }
                    }));
                }
            }
            catch (error) {
                res.status(500).json({ message: "Error in the server", error });
            }
        });
    }
    getInventory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const decoded = jsonwebtoken_1.default.verify(id, config_1.SECRET);
                const tokeIdUser = decoded.id;
                const response = yield modelInventario_1.default.find({
                    tokeIdUser: tokeIdUser,
                });
                res.status(200).json({ message: "Inventory", response });
            }
            catch (error) {
                res.status(500).json({ message: "Error in the server", error });
            }
        });
    }
    putInventoryId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //actualizar inventario
            try {
                const { _id } = req.params;
                const token = req.headers["authorization"];
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
                const tokeIdUser = decoded.id;
                const { name_inventory, description } = req.body;
                const response = yield modelInventario_1.default.findByIdAndUpdate({ _id }, req.body.data, { new: true });
                res.status(200).json({ message: "Inventory updated", response });
            }
            catch (error) {
                res.status(500).json({ message: "Error in the server", error });
            }
        });
    }
    deleteInventoryId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const token = req.headers["authorization"];
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
                const tokeIdUser = decoded.id;
                const searchSubProduct = yield SubProductos_model_1.default.find({
                    idInventory: _id,
                });
                if (searchSubProduct.length > 0) {
                    yield new Notification_Todo_1.default().createNotificationClass("No se puede eliminar el inventario", "Error", "inventory", tokeIdUser);
                    return res.status(400).json({
                        message: "No se puede eliminar el inventario, tiene subproductos",
                    });
                }
                else {
                    const response = yield modelInventario_1.default.deleteOne({ _id });
                    const response2 = yield SubProductos_model_1.default.deleteMany({
                        idInventory: _id,
                    });
                    if (response2) {
                        yield new Notification_Todo_1.default().createNotificationClass("se elimino los subproductos con exito", "Sucessfull", "inventory", tokeIdUser);
                    }
                    yield new Notification_Todo_1.default().createNotificationClass("se elimino el inventario con exito", "Sucessfull", "inventory", tokeIdUser);
                    res.status(200).json({ message: "Inventory deleted", response });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Error in the server", error });
            }
        });
    }
    UploadInsertProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.params;
                const token = req.headers["authorization"];
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
                const tokeIdUser = decoded.id;
                const { name, priceCompra, priceVenta, stockMinimo, stockMaximo, unidad, caducidad, idInventory, } = req.body.data;
                const subProduct = new SubProductos_model_1.default({
                    tokenIdUser: tokeIdUser,
                    name,
                    priceCompra,
                    priceVenta,
                    stockMinimo,
                    stockMaximo,
                    unidad,
                    caducidad,
                    idInventory,
                });
                const response = yield subProduct.save();
                res.status(200).json({ message: "SubProduct created", response });
            }
            catch (error) {
                res.status(500).json({ message: "Error in the server", error });
            }
        });
    }
    GetSubProducta(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const token = req.headers["authorization"];
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
                const tokeIdUser = decoded.id;
                const response = yield SubProductos_model_1.default.find({ idInventory: id });
                res.status(200).json({ message: "get products", response });
            }
            catch (error) {
                res.status(500).json({ message: "Error in the server", error });
            }
        });
    }
    TranslateProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["authorization"];
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
                const tokeIdUser = decoded.id;
                const { idDestino, idOrigen, idSubProducto, cantidad, userCorreo } = req.body.data;
                const responseClass = yield new TranlateBodega_1.default(tokeIdUser, idDestino, idOrigen, idSubProducto, cantidad, userCorreo).Initial();
                return res.status(200).json({ message: "get products", responseClass });
            }
            catch (error) {
                return res.status(500).json({ message: "Error in the server", error });
            }
        });
    }
    GetTranslateProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const token = req.headers["authorization"];
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
                const tokeIdUser = decoded.id;
                const response = yield TranslateSubP_Model_1.default.find({ idDestino: id });
                res.status(200).json({ message: "get products", response });
            }
            catch (error) {
                res.status(500).json({ message: "Error in the server", error });
            }
        });
    }
    postTranslateProductsOrigen(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const token = req.headers["authorization"];
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
                const tokeIdUser = decoded.id;
                const responseDataClass = new TranlateBodega_1.default("", "", "", "", "", "").TranslateProduct(id, req.body.data);
                res.status(200).json({ message: "get products", responseDataClass });
            }
            catch (error) {
                res.status(500).json({ message: "Error in the server", error });
            }
        });
    }
    UpdateCorreoBodega(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const token = req.headers["authorization"];
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
                const tokeIdUser = decoded.id;
                const responseEmailUpdate = yield modelInventario_1.default.findByIdAndUpdate({ _id: id }, {
                    responsableInventory: req.body.data,
                    type: "Usuario",
                }, { new: true });
                res.status(200).json({ message: "updateEmail", responseEmailUpdate });
            }
            catch (error) {
                res.status(500).json({ message: "Error in the server", error });
            }
        });
    }
    SubProductsIdAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const token = req.headers["authorization"];
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
                const tokeIdUser = decoded.id;
                const response = yield SubProductos_model_1.default.find({ idUser: tokeIdUser });
                res.status(200).json({ message: "get products", response });
            }
            catch (error) {
                res.status(500).json({ message: "Error in the server", error });
            }
        });
    }
    searchProductUnidadesDisminucon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idTokenAdmin = req.headers.authorization;
                const verifycationToken = jsonwebtoken_1.default.verify(idTokenAdmin, config_1.SECRET);
                const id = verifycationToken.id;
                const dataSubProduct = yield SubProductos_model_2.default.find({
                    idInventario: id,
                });
                const SerachProductWithUnidades = dataSubProduct.filter((element) => __awaiter(this, void 0, void 0, function* () {
                    if (element.unidad <= 10) {
                        const searchNotificationDuplicate = yield modelNotfication_1.default.find({
                            name: element.description,
                        });
                        if (searchNotificationDuplicate.length > 0) {
                            const updateNotification = yield modelNotfication_1.default.findByIdAndUpdate({ _id: searchNotificationDuplicate[0]._id || "" }, {
                                name: element.description,
                                description: `${element.name} tiene ${element.unidad} unidades bajas con un precio de ${element.priceVenta}`,
                                type: "unidadBaja",
                            });
                            if (searchNotificationDuplicate.length > 0) {
                            }
                            else {
                                const response = yield new Notification_Todo_1.default().createNotificationClass("Este producto esta por agotarse", `${element.name} tiene ${element.unidad} unidades bajas con un precio de ${element.priceVenta}`, "unidadBaja", id);
                            }
                        }
                        else {
                            const response = yield new Notification_Todo_1.default().createNotificationClass("Este producto esta por agotarse", `${element.name} tiene ${element.unidad} unidades bajas con un precio de ${element.priceVenta}`, "unidadBaja", id);
                        }
                    }
                }));
                return res
                    .status(200)
                    .json({ message: "sucess", SerachProductWithUnidades });
            }
            catch (error) {
                return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
            }
        });
    }
}
exports.default = InventoryProduct;
//# sourceMappingURL=GestionInventory.js.map