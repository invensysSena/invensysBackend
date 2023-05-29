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
const modelPedidos_1 = __importDefault(require("../models/modelPedidos"));
const PedidosProvedor_1 = __importDefault(require("../models/PedidosProvedor"));
const uuid_1 = require("uuid");
const Notification_Todo_1 = __importDefault(require("../class/Notification.Todo"));
class PedidosValiadation {
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
            const uuidAuth = {
                node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
                clockseq: 0x1234,
                msecs: new Date().getTime(),
                nsecs: 5678,
            };
            const [{ fecha, name }] = data;
            const TotalComprap = data
                .map((i) => i.totalCompra)
                .reduce((a, b) => a + b);
            const newPedidoProvider = new PedidosProvedor_1.default({
                tokeIdUser: this.idTokenAdmin,
                NR: (0, uuid_1.v4)(uuidAuth),
                name: name,
                fecha: fecha,
                cantidadProductos: data.length,
                totalComprap: TotalComprap,
            });
            const response1 = yield new Notification_Todo_1.default().createNotificationClass("Se creo un nuevo pedido", `Total del pedido: ${TotalComprap} Cantidad de productos: ${data.length}`, "pedido", this.idTokenAdmin);
            const response = yield newPedidoProvider.save();
            const { _id } = response;
            let id = _id;
            if (data.length > 1) {
                for (let i = 0; i < data.length; i++) {
                    const pedidosCreate = new modelPedidos_1.default({
                        tokeIdUser: this.idTokenAdmin,
                        id_subProducto: data[i].idSubproducto,
                        id_provedor: data[i].idProvedor,
                        id_bodega: data[i].idBodega,
                        company: data[i].company,
                        unidades: data[i].unidades,
                        tipo: data[i].tipo,
                        fecha: data[i].fecha,
                        totalCompra: data[i].totalCompra,
                        idPedidoProvider: id,
                    });
                    yield pedidosCreate.save();
                    const exitsSubProduct = yield SubProductos_model_1.default.findById(data[i].idSubproducto);
                    const newUnidades = exitsSubProduct.unidad + data[i].unidades;
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
                const [{ idSubproducto, unidades, idProvedor, idBodega, company, tipo, fecha, totalCompra, },] = data;
                const pedidosCreate = new modelPedidos_1.default({
                    tokeIdUser: this.idTokenAdmin,
                    id_subProducto: idSubproducto,
                    id_provedor: idProvedor,
                    id_bodega: idBodega,
                    company: company,
                    unidades: unidades,
                    tipo: tipo,
                    fecha: fecha,
                    totalCompra: totalCompra,
                    idPedidoProvider: id,
                });
                yield pedidosCreate.save();
                const exitsSubProduct = yield SubProductos_model_1.default.findById(idSubproducto);
                const newUnidades = exitsSubProduct.unidad + unidades;
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
exports.default = PedidosValiadation;
//# sourceMappingURL=Pedidos.model.js.map