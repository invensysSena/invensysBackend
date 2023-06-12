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
const database_1 = require("../database/database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const stripe_1 = __importDefault(require("stripe"));
class LicenceSofteareInvensys {
    getLicence(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Hola");
            try {
                const Token = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
                const veryfyToken = jsonwebtoken_1.default.verify(Token, config_1.SECRET);
                const tokenIdUser = veryfyToken.id;
                const conn = yield database_1.conexion.connect();
                conn.query("SELECT * FROM licence WHERE idAdmin = ?", [tokenIdUser], (err, result) => {
                    if (err) {
                        return res.json({
                            ok: false,
                            message: "Error al obtener la licencia",
                            err,
                        });
                    }
                    if (result.length === 0) {
                        return res.json({
                            ok: false,
                            message: "No se encontro la licencia",
                        });
                    }
                    return res.status(200).json({
                        ok: true,
                        result,
                    });
                });
            }
            catch (error) {
                return error;
            }
        });
    }
    createLicence(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stripe = new stripe_1.default(`sk_test_51NDyJCA1OLE36MkcMDvd8eIYp7AFShFo0RhwZ2zCHwgsw2sgCZ8TsIolsVPE76cj6DRYFb4TEKdsFEUeEriirao500Mm6FILzY`, {
                    apiVersion: "2022-11-15",
                });
                const { id } = req.body;
                const { data } = req.body;
                const payment = yield stripe.paymentIntents.create({
                    amount: req.body.moneyPrice,
                    currency: "usd",
                    payment_method_types: ["card"],
                    receipt_email: "ospinaortizjuandaniel351@gmail.com",
                });
                const Token = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
                const veryfyToken = jsonwebtoken_1.default.verify(Token, config_1.SECRET);
                const tokenIdUser = veryfyToken.id;
                const { licence } = req.body;
                const conn = yield database_1.conexion.connect();
                const estado = "Activo";
                const verificado = "verificado";
                conn.query(`INSERT INTO licence (
          idAdmin,
          	name_Card,
            	licence,
              	pago,
                	exp_month,
                  	exp_year,
                    	idKey_cliente,
                      	client_secret,	
                        object,
                        estado,
                        verificado
        ) VALUES
         (?,?,?,?,?,?,?,?,?,?,?)`, [
                    tokenIdUser,
                    data.card.brand,
                    id,
                    req.body.moneyPrice,
                    data.card.exp_month,
                    data.card.exp_year,
                    payment.id,
                    payment.client_secret,
                    payment.object,
                    estado,
                    verificado,
                ], (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            message: "Error al crear la licencia",
                            err,
                        });
                    }
                    return res.status(200).json({
                        ok: true,
                        message: "Licencia creada con exito",
                        result,
                    });
                });
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.default = LicenceSofteareInvensys;
//# sourceMappingURL=GestionLicence.js.map