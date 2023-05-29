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
exports.authUser = void 0;
const database_1 = require("../database/database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const authUser = (correo, password, authCuenta, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield database_1.conexion.connect();
        const expresiones = {
            password: /^.{4,20}$/,
            correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        };
        if (expresiones.correo.test(correo) &&
            expresiones.password.test(password)) {
            conn.query("SELECT password,idUser,nameRol FROM usuario WHERE correo = ?", [correo], (error, rows) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return "ERROR_AUTH_USER";
                if (rows) {
                    const password1 = rows[0].password;
                    const passVerify = yield bcrypt_1.default.compare(password1, password);
                    if (passVerify) {
                        const token = jsonwebtoken_1.default.sign({ id: rows[0].idAdmin }, config_1.SECRET || "tokenGenerate", { expiresIn: 60 * 60 * 24 });
                        return "holaaa";
                        //    return  data = {
                        //      message: "USER_AUTH_SUCCESFULL",
                        //     token: token,
                        //     auht: authCuenta,
                        //      rol: rows[0].rol,
                        //    };
                    }
                    else {
                        // return res.json({
                        //   message: "USER_AUTH_ERROR_DATA",
                        //   token: null,
                        //   auht: false,
                        // });
                    }
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
exports.authUser = authUser;
//# sourceMappingURL=authUser.js.map