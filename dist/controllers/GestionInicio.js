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
const CategoryM_1 = __importDefault(require("../models/CategoryM"));
const modelProviders_1 = __importDefault(require("../models/modelProviders"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const modelInventario_1 = __importDefault(require("../models/modelInventario"));
const modelPedidos_1 = __importDefault(require("../models/modelPedidos"));
const modelNotfication_1 = __importDefault(require("../models/modelNotfication"));
const Compras_1 = __importDefault(require("../models/Compras"));
const modelCompany_1 = __importDefault(require("../models/modelCompany"));
const SubProductos_model_1 = __importDefault(require("../models/SubProductos.model"));
const PedidosProvedor_1 = __importDefault(require("../models/PedidosProvedor"));
const InventaryGeneral_1 = __importDefault(require("../models/InventaryGeneral"));
const TranslateSubP_Model_1 = __importDefault(require("../interfaces/TranslateSubP.Model"));
TranslateSubP_Model_1.default;
class AllModules {
    getModules(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Token = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
                const veryfyToken = jsonwebtoken_1.default.verify(Token, config_1.SECRET);
                const tokenIdUser = veryfyToken.id;
                if (!tokenIdUser) {
                    return res.json({
                        message: "El token no existe!",
                    });
                }
                else {
                    const dataProduct = yield modelProduct_1.default.find({
                        tokenIdUser: tokenIdUser,
                    });
                    const dataCategory = yield CategoryM_1.default.find({
                        tokeIdUser: tokenIdUser,
                    });
                    const dataProvider = yield modelProviders_1.default.find({
                        tokenIdUser: tokenIdUser,
                    });
                    const dataInventary = yield modelInventario_1.default.find({
                        tokeIdUser: tokenIdUser,
                    });
                    const dataPedidos = yield modelPedidos_1.default.find({
                        tokeIdUser: tokenIdUser,
                    });
                    const dataSubProduct = yield SubProductos_model_1.default.find({
                        tokenIdUser: tokenIdUser,
                    });
                    const dataNotify = yield modelNotfication_1.default.find({
                        tokeIdUser: tokenIdUser,
                    });
                    const dataCompras = yield Compras_1.default.find({ tokeIdUser: tokenIdUser });
                    const dataCompany = yield modelCompany_1.default.find({
                        tokenIdUser: tokenIdUser,
                    });
                    const dataPedidoProvedor = yield PedidosProvedor_1.default.find({
                        tokeIdUser: tokenIdUser,
                    });
                    const dataIGeneral = yield InventaryGeneral_1.default.find({
                        tokenIdUser: tokenIdUser,
                    });
                    return res.status(200).json({
                        ok: true,
                        dataCategory,
                        dataProduct,
                        dataProvider,
                        dataInventary,
                        dataPedidos,
                        dataSubProduct,
                        dataNotify,
                        dataCompras,
                        dataCompany,
                        dataPedidoProvedor,
                        dataIGeneral,
                    });
                }
            }
            catch (error) {
                return res.status(500).json({ error, message: "ERROR_SERVER" });
            }
        });
    }
}
exports.default = AllModules;
//# sourceMappingURL=GestionInicio.js.map