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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdmin = void 0;
const database_1 = require("../database/database");
const authAdmin = (correo, password, authCuenta, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield database_1.conexion.connect();
        const expresiones = {
            password: /^.{4,20}$/,
            correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        };
        // if (req.headers["authorization-google"]) {
        //   conn.query("")
        // }
        if (expresiones.correo.test(correo) &&
            expresiones.password.test(password)) {
            conn.query("SELECT password,idAdmin,rol FROM admin WHERE correo = ?", [correo], (error, rows) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    console.log(error);
                    return "ERROR_AUTH_ADMIN";
                }
                if (rows) {
                    return "Hola";
                }
            }));
        }
        else {
            return "ERROR_DATE_ADMIN";
            // return res.json({
            //   message: "DATA_NOT_VALID",
            // });
        }
    }
    catch (error) {
        return Error;
    }
});
exports.authAdmin = authAdmin;
//# sourceMappingURL=authAdmin.js.map