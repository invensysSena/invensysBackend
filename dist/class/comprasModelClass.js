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
const SubProductos_model_1 = __importDefault(require("../models/SubProductos.model"));
const Compras_1 = __importDefault(require("../models/Compras"));
const uuid_1 = require("uuid");
// ? new comprasSchema
const Compras_Salidas_1 = __importDefault(require("../interfaces/Compras.Salidas"));
const Notification_Todo_1 = __importDefault(require("../class/Notification.Todo"));
const moment_with_locales_es6_1 = __importDefault(require("moment-with-locales-es6"));
moment_with_locales_es6_1.default.locale("es");
class comprasModelClass {
    constructor() {
        this.idTokenAdmin = "";
    }
    setProperties(data, idTokenAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            this.data = data;
            this.idTokenAdmin = idTokenAdmin;
            return yield this.validateData(data);
        });
    }
    validateData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const v1options = {
                node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
                clockseq: 0x1234,
                msecs: new Date().getTime(),
                nsecs: 5678,
            };
            const TotalCompra = data
                .map((i) => i.totalCompra)
                .reduce((a, b) => a + b);
            const newCompraModel = new Compras_Salidas_1.default({
                tokeIdUser: this.idTokenAdmin,
                numFactura: (0, uuid_1.v4)(v1options),
                fecha: (0, moment_with_locales_es6_1.default)().format("l"),
                cantidadProducts: data.length,
                total: TotalCompra,
                responsable: "Daniel",
            });
            yield new Notification_Todo_1.default().createNotificationClass("Se creo una nueva compra", `Total de la compra: ${TotalCompra} Cantidad de productos: ${data.length}`, "venta", this.idTokenAdmin);
            const response = yield newCompraModel.save();
            const { _id } = response;
            return yield this.postCompra(data, _id);
        });
    }
    postCompra(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.length > 1) {
                for (let i = 0; i < data.length; i++) {
                    const pedidosCreate = new Compras_1.default({
                        tokeIdUser: this.idTokenAdmin,
                        idCompra: id,
                        id_bodega: data[i].idBodega,
                        idSubProduct: data[i].idSubproducto,
                        nameProduct: data[i].name,
                        unidades: data[i].unidades,
                        total: data[i].totalCompra,
                        fecha: (0, moment_with_locales_es6_1.default)().format("l"),
                    });
                    yield pedidosCreate.save();
                    const exitsSubProduct = yield SubProductos_model_1.default.findById(data[i].idSubproducto);
                    const newUnidades = exitsSubProduct.unidad - data[i].unidades;
                    if (!exitsSubProduct) {
                        throw new Error("SUBPRODUCT_NOT_FOUND");
                    }
                    else {
                        const updateUnidades = yield SubProductos_model_1.default.findByIdAndUpdate({ _id: data[i].idSubproducto }, {
                            unidad: newUnidades,
                        }, { new: true });
                    }
                }
            }
            else {
                const [{ idSubproducto, unidades, idBodega, name, totalCompra }] = data;
                const comprasCreate = new Compras_1.default({
                    tokeIdUser: this.idTokenAdmin,
                    idCompra: id,
                    idBodega: idBodega,
                    idSubProduct: idSubproducto,
                    nameProduct: name,
                    unidades: unidades,
                    total: totalCompra,
                    fecha: (0, moment_with_locales_es6_1.default)().format("l"),
                });
                const res = yield comprasCreate.save();
                const exitsSubProduct = yield SubProductos_model_1.default.findById(idSubproducto);
                const newUnidades = exitsSubProduct.unidad - unidades;
                if (!exitsSubProduct) {
                    throw new Error("SUBPRODUCT_NOT_FOUND");
                }
                else {
                    const updateUnidades = yield SubProductos_model_1.default.findByIdAndUpdate({ _id: idSubproducto }, {
                        unidad: newUnidades,
                    }, { new: true });
                }
            }
        });
    }
}
exports.default = comprasModelClass;
//# sourceMappingURL=comprasModelClass.js.map