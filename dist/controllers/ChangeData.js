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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
class ChangeDataController {
    UpdatePassAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
                const validateToken = decoded.id;
                const { password } = req.body;
                const salt = yield bcrypt_1.default.genSalt(10);
                const hash = yield bcrypt_1.default.hash(password, salt);
                const conn = yield database_1.conexion.connect();
                conn.query("select password from admin where idUsers = ?", [validateToken], (err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            message: "ERROR_DB",
                        });
                    }
                    if (result[0].password === null) {
                        conn.query("update admin set ? where idUsers = ?", [
                            { password: hash },
                            validateToken,
                        ]);
                        return res.status(200).json({
                            ok: true,
                            message: "UPDATE_PASSWORD_SUCCESS",
                        });
                    }
                    if (result.length > 0) {
                        const validatePass = yield bcrypt_1.default.compare(password, result[0].password);
                        if (validatePass) {
                            return res.status(400).json({
                                ok: false,
                                message: "PASSWORD_EQUAL",
                            });
                        }
                        else {
                            conn.query("update admin set ? where idUsers = ?", [
                                { password: hash },
                                validateToken,
                            ]);
                            return res.status(200).json({
                                ok: true,
                                message: "UPDATE_PASSWORD_SUCCESS",
                            });
                        }
                    }
                }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    UpdateEmailUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
                const validateToken = decoded.id;
                const { email } = req.body.data;
                const { id } = req.params;
                const conn = yield database_1.conexion.connect();
                if (!validateToken) {
                    return res.status(400).json({
                        ok: false,
                        message: "NO_EXIST_TOKEN",
                    });
                }
                else {
                    conn.query("select correo from account where idAccount = ?", [id], (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            return res.status(400).json({
                                ok: false,
                                message: "ERROR_DB",
                            });
                        }
                        if (result.length > 0) {
                            if (email === result[0].correo) {
                                return res.status(400).json({
                                    ok: false,
                                    message: "EMAIL_EQUAL_USER",
                                });
                            }
                            else {
                                conn.query("update account set ? where idAccount = ?", [
                                    { correo: email },
                                    id,
                                ]);
                                return res.status(200).json({
                                    ok: true,
                                    message: "UPDATE_EMAIL_SUCCESS",
                                });
                            }
                        }
                    }));
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    UpdatePassUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
                const validateToken = decoded.id;
                const { password, newPassword } = req.body.data;
                const salt = yield bcrypt_1.default.genSalt(10);
                const hash = yield bcrypt_1.default.hash(newPassword, salt);
                const { id } = req.params;
                console.log(req.body);
                if (!validateToken) {
                    return res.status(400).json({
                        ok: false,
                        message: "NO_EXIST_TOKEN",
                    });
                }
                else {
                    const conn = yield database_1.conexion.connect();
                    conn.query("select password from account where idAccount = ?", [validateToken], (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            return res.status(400).json({
                                ok: false,
                                message: "ERROR_DB",
                            });
                        }
                        if (result.length > 0) {
                            const compare = yield bcrypt_1.default.compare(password, result[0].password);
                            if (compare) {
                                return res.status(400).json({
                                    ok: false,
                                    message: "PASSWORD_EQUAL",
                                });
                            }
                        }
                        else {
                            conn.query("update account set ? where idAccount = ?", [
                                { password: hash },
                                id,
                            ]);
                            return res.status(200).json({
                                ok: true,
                                message: "UPDATE_PASSWORD_SUCCESS",
                                hash,
                            });
                        }
                    }));
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ChangeDataController;
//# sourceMappingURL=ChangeData.js.map