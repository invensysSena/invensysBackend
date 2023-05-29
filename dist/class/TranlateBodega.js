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
const TranslateSubP_Model_1 = __importDefault(require("../interfaces/TranslateSubP.Model"));
const SubProductos_model_1 = __importDefault(require("../models/SubProductos.model"));
const modelInventario_1 = __importDefault(require("../models/modelInventario"));
class TranslateBodega {
    constructor(idAdmin, idDestino, idOrigen, idSubProducto, cantidad, userCorreo) {
        this.idAdmin = "";
        this.idDestino = "";
        this.idOrigen = "";
        this.idSubProducto = "";
        this.userCorreo = "";
        this.idAdmin = idAdmin;
        this.idDestino = idDestino;
        this.idOrigen = idOrigen;
        this.idSubProducto = idSubProducto;
        this.cantidad = cantidad;
        this.userCorreo = userCorreo;
    }
    Initial() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postInsertTranslateProduct();
        });
    }
    postInsertTranslateProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchInventory = yield modelInventario_1.default.findById(this.idOrigen);
                return yield this.RestarCantidad(searchInventory);
            }
            catch (error) {
                return error;
            }
        });
    }
    RestarCantidad(searchInventory) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchSubProducts = yield SubProductos_model_1.default.findById(this.idSubProducto);
                if (searchSubProducts) {
                    return this.updateUnidades(searchSubProducts, searchInventory);
                }
            }
            catch (error) {
                return { messaje: "NoProductsBodega" };
            }
        });
    }
    updateUnidades(searchSubProducts, searchInventory) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUnidades = searchSubProducts.unidad - this.cantidad;
                const responseX = yield SubProductos_model_1.default.findByIdAndUpdate(this.idSubProducto, {
                    unidad: newUnidades,
                }, { new: true });
                return this.InserTranslateSubP(searchInventory, searchInventory, responseX);
            }
            catch (error) {
                return "ErrorUpdateUnidades";
            }
        });
    }
    InserTranslateSubP(searchInventory, searchSubProducts, responseX) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    idAdmin: this.idAdmin,
                    idDestino: this.idDestino,
                    idOrigen: this.idOrigen,
                    idSubProducto: this.idSubProducto,
                    cantidad: parseInt(this.cantidad),
                    userCorreo: this.userCorreo,
                    origen: searchInventory.name_inventory,
                    responsable: searchInventory.responsableInventory,
                };
                const SearchTranslateSubP = yield TranslateSubP_Model_1.default.find({
                    idDestino: this.idDestino,
                });
                if (SearchTranslateSubP.length === 0) {
                    const response = new TranslateSubP_Model_1.default(data);
                    const dataResponse = yield response.save();
                    return responseX;
                }
                else {
                    for (let i = 0; i < SearchTranslateSubP.length; i++) {
                        if (SearchTranslateSubP[i].userCorreo === this.userCorreo) {
                            const updateTranslateUnidades = yield TranslateSubP_Model_1.default.findByIdAndUpdate(SearchTranslateSubP[i]._id, {
                                cantidad: SearchTranslateSubP[i].cantidad + parseInt(this.cantidad),
                            }, { new: true });
                            return { messaje: "UpdateTranslateSubP", updateTranslateUnidades };
                        }
                        else {
                            const response = new TranslateSubP_Model_1.default(data);
                            const dataResponse = yield response.save();
                            return responseX;
                        }
                    }
                }
            }
            catch (error) {
                return { messaje: "ErrorInsertTranslateSubP" };
            }
        });
    }
    TranslateProduct(id, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === "Aceptado") {
                const searchTranslateProduct = yield TranslateSubP_Model_1.default.findById(id);
                if (searchTranslateProduct) {
                    const Searchinventory = yield modelInventario_1.default.findById(searchTranslateProduct.idDestino);
                    if (Searchinventory) {
                        const searchSubProducts = yield SubProductos_model_1.default.find({
                            idInventory: Searchinventory._id,
                        });
                        if (searchSubProducts.length > 0) {
                            const filterSearchSubProducts = searchSubProducts.filter((item) => item.name === searchTranslateProduct.userCorreo);
                            if (filterSearchSubProducts.length > 0) {
                                if (filterSearchSubProducts[0].name ===
                                    searchTranslateProduct.userCorreo) {
                                    const updateUnidades = yield SubProductos_model_1.default.findByIdAndUpdate(filterSearchSubProducts[0]._id, {
                                        unidad: filterSearchSubProducts[0].unidad +
                                            searchTranslateProduct.cantidad,
                                    }, { new: true });
                                    const deleteTranslateProduct = yield TranslateSubP_Model_1.default.findByIdAndDelete(id);
                                }
                            }
                            else {
                                const dataPost = {
                                    tokenIdUser: id,
                                    name: searchTranslateProduct.userCorreo,
                                    priceCompra: searchSubProducts[0].priceCompra,
                                    priceVenta: searchSubProducts[0].priceVenta,
                                    stockMinimo: searchSubProducts[0].stockMinimo,
                                    stockMaximo: searchSubProducts[0].stockMaximo,
                                    unidad: searchTranslateProduct.cantidad,
                                    caducidad: searchSubProducts[0].caducidad,
                                    idInventory: Searchinventory._id,
                                };
                                const { tokenIdUser, name, priceCompra, priceVenta, stockMinimo, stockMaximo, unidad, caducidad, idInventory, } = dataPost;
                                const subProduct = new SubProductos_model_1.default({
                                    tokenIdUser,
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
                                const deleteTranslateProduct = yield TranslateSubP_Model_1.default.findByIdAndDelete(id);
                            }
                        }
                    }
                }
                else {
                }
            }
            else {
                const searchTranslateProduct = yield TranslateSubP_Model_1.default.findById(id);
                const searchSubProducts = yield SubProductos_model_1.default.findById(searchTranslateProduct.idSubProducto);
                const updateCantidadesSubProducts = yield SubProductos_model_1.default.findByIdAndUpdate(searchSubProducts._id, {
                    unidad: searchSubProducts.unidad + searchTranslateProduct.cantidad,
                }, { new: true });
                yield TranslateSubP_Model_1.default.findByIdAndDelete(id);
                return searchSubProducts;
            }
        });
    }
}
exports.default = TranslateBodega;
//# sourceMappingURL=TranlateBodega.js.map