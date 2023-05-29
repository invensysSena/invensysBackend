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
const bcrypt_1 = __importDefault(require("bcrypt"));
//import DeviceDetector from "device-detector-js";
const fs_extra_1 = __importDefault(require("fs-extra"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const database_1 = require("../database/database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config"); // <--- this is the problem
const libs_1 = require("../libs/libs");
const moment_with_locales_es6_1 = __importDefault(require("moment-with-locales-es6"));
// import { newPasswordUser } from "../interfaces/users";
const Notification_Todo_1 = __importDefault(require("../class/Notification.Todo"));
const cloudinary_1 = require("../utils/cloudinary");
let momet = moment_with_locales_es6_1.default;
moment_with_locales_es6_1.default.locale("es");
class LoginRegister {
    veryfidCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.conexion.connect();
                conn.query(`CALL ADMIN_SELECT_CODE('${req.body.data.email}')`, (error, rows) => __awaiter(this, void 0, void 0, function* () {
                    for (let i = 0; i < rows.length; i++) {
                        if (rows[i][0].codigo == parseInt(req.body.data.codigo)) {
                            return res
                                .status(200)
                                .json({ message: "CODE_CORRECT", code: rows[i].codigo });
                        }
                        else {
                            return res.status(400).json({ message: "CODE_INCORRECT" });
                        }
                    }
                }));
            }
            catch (error) {
                return res.status(500).json({ message: "ERROR_SERVER", error });
            }
        });
    }
    getAdminData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    AdminRegister(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const datas = {
                    correo: req.body.postDataAdmin.email,
                    password: req.body.postDataAdmin.password,
                    authCuenta: false,
                    token: req.body.token,
                    refreshToken: req.body.refreshToken,
                    nameRol: "superAdmin",
                };
                const fecha = momet().format("YYYY-MM-DD");
                const hora = momet().format("HH:mm:ss");
                const roundNumber = 10;
                const encriptarPassword = yield bcrypt_1.default.genSalt(roundNumber);
                const hasPassword = yield bcrypt_1.default.hash(datas.password, encriptarPassword);
                let state = (datas.authCuenta = true);
                let estado = "activo";
                const conn = yield database_1.conexion.connect();
                conn.query("SELECT * FROM admin", (error, row) => __awaiter(this, void 0, void 0, function* () {
                    if (row.length < 0) {
                        return res.status(400).json({ message: "ERROR_DATA_ADMIN" });
                    }
                    for (let i = 0; i < row.length; i++) {
                        if (row[i].correo == datas.correo)
                            return res.status(400).json({ message: "ERR_EXIST_EMAIL" });
                    }
                    const url = "https://ipapi.co/json/";
                    const response = yield fetch(url);
                    const data = yield response.json();
                    const { country_name, city, longitude, latitude, country_calling_code, languages, ip, network, version, } = data;
                    let cuenta = "Invensys";
                    let state = "activo";
                    let tc = "si";
                    let authCount = "OK";
                    let rol = "superAdmin";
                    //cuent,ipA,paisA,ciudadA,country_calling,idiomaA,longA,lagA
                    conn.query(`CALL ADMIN_INSERT_LOGIN('${datas.correo}','${fecha}','${hora}',
        '${rol}','${cuenta}','${ip}','${country_name}','${city}','${country_calling_code}',
        '${languages}','${longitude}','${latitude}','${state}','${tc}','${authCount}','${hasPassword}')`, (error, rows) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            return res
                                .status(401)
                                .json({ message: "ERROR_DATA_ADMIN", error: error });
                        }
                        if (rows) {
                            const token = jsonwebtoken_1.default.sign({ id: data.correo }, config_1.SECRET || "tokenGenerate", { expiresIn: 60 * 60 * 24 });
                            const resultEmail = new libs_1.sendMailAdmin().sendMailer(data.correo);
                            yield new Notification_Todo_1.default().createNotificationClass(`Creaste una cuenta de administrado: ${datas.correo}`, "Comienza a administrar tu negocio", "users", `${datas.correo}`);
                            return res.status(200).json({
                                message: "USER_CREATE_SUCCESFULL",
                                token,
                                auht: data.authCuenta,
                            });
                        }
                        else {
                            return res.status(400).json({ message: "ERROR_DATA_ADMIN" });
                        }
                    }));
                }));
            }
            catch (error) {
                return res.status(500).json({ message: "ERROR_SERVER" });
            }
        });
    }
    LoginAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    correo: req.body.postDataUser.email,
                    password: req.body.postDataUser.password,
                    authCuenta: true,
                    token: req.body.token,
                    refreshToken: req.body.refreshToken,
                };
                const conn = yield database_1.conexion.connect();
                conn.query(`CALL ADMIN_AUTH_LOGIN('${data.correo}')`, (error, rows) => __awaiter(this, void 0, void 0, function* () {
                    if (error)
                        return res.status(400).json({ message: "ERROR_DB", error: error });
                    if (rows[0].length > 0) {
                        const user = rows[0][0];
                        const validPassword = yield bcrypt_1.default.compare(data.password, user.password);
                        if (validPassword) {
                            const token = jsonwebtoken_1.default.sign({ id: rows[0][0].idUsers, email: data.correo }, config_1.SECRET || "authToken", { expiresIn: 60 * 60 * 24 });
                            return res.status(200).json({
                                message: "LOGIN_SUCCESSFULL",
                                token,
                                auth: true,
                                rol: rows[0][0].rol,
                                type: "admin",
                            });
                        }
                        else {
                            return res
                                .status(401)
                                .json({ message: "ERROR_PASSWORD", statu: 401, type: "admin" });
                        }
                    }
                    else
                        conn.query(`CALL USER_LOGIN('${data.correo}')`, (error, rows) => __awaiter(this, void 0, void 0, function* () {
                            if (error)
                                return res
                                    .status(400)
                                    .json({ message: "ERROR_DB", error: error });
                            if (rows[0].length > 0) {
                                const validPassword = yield bcrypt_1.default.compare(data.password, rows[0][0].password);
                                if (validPassword) {
                                    conn.query(`CALL USER_LOGIN_MODULO('${rows[0][0].idAccount}')`, (error, rowsP) => __awaiter(this, void 0, void 0, function* () {
                                        if (error)
                                            return res
                                                .status(400)
                                                .json({ message: "ERROR_DB", error: error });
                                        let modulo = rowsP[0];
                                        const token = jsonwebtoken_1.default.sign({ id: rows[0][0].idUsers1 }, config_1.SECRET || "authToken", { expiresIn: 60 * 60 * 24 });
                                        const url = "https://ipapi.co/json/";
                                        const response = yield fetch(url);
                                        const data = yield response.json();
                                        const { country_name, city, longitude, region, latitude, country_calling_code, languages, ip, network, version, } = data;
                                        const token1 = jsonwebtoken_1.default.sign({ id1: rows[0][0].idAccount }, config_1.SECRET || "authToken", { expiresIn: 60 * 60 * 24 });
                                        let dataDevice = {
                                            device: "desktop",
                                            navegador: "chrome",
                                            infoNavegIp: "34.56",
                                        };
                                        yield conn.execute("SELECT * FROM services WHERE idAccountUsers = ?", [rows[0][0].idAccount], (error, coll) => __awaiter(this, void 0, void 0, function* () {
                                            if (coll.length > 0) {
                                                conn.query(`CALL UPDATE_SESION_USER('${dataDevice.device}', '${ip}','${token1}','${momet().format("LLLL")}','${city}','${languages}','${dataDevice.navegador}','${dataDevice.infoNavegIp}',
                          '${city}','${country_name}','${region}','${rows[0][0].idAccount}')`, (error, rows) => { });
                                            }
                                            else {
                                                conn.execute(`INSERT INTO services(idAccountUsers) VALUES(?)`, [rows[0][0].idAccount], (error, coll) => {
                                                    conn.query(`CALL UPDATE_SESION_USER('${dataDevice.device}', '${ip}','${token1}','${momet().format("LLLL")}','${city}','${languages}','${dataDevice.navegador}','${dataDevice.infoNavegIp}',
                                  '${city}','${country_name}','${region}','${rows[0][0].idAccount}')`, (error, self) => { });
                                                });
                                            }
                                        }));
                                        if (modulo == "") {
                                            return res.status(201).json({
                                                message: "NOT_ACCCESO",
                                                module: "error",
                                                type: "error",
                                            });
                                        }
                                        yield new Notification_Todo_1.default().createNotificationClass(`Un usuario acaba de iniciar sesion en el sistema`, `${data.correo}`, "users", `${rows[0][0].idUsers1}`);
                                        return res.status(200).json({
                                            message: "LOGIN_SUCCESSFULL",
                                            token,
                                            token1,
                                            auth: true,
                                            module: modulo,
                                            type: "user",
                                        });
                                    }));
                                }
                                else {
                                    return res.status(401).json({ message: "ERROR_PASSWORD" });
                                }
                            }
                            else {
                                return res
                                    .status(401)
                                    .json({ message: "ERROR_USER", statu: 401 });
                            }
                        }));
                }));
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "ERROR_AUTH_ADMIN", error: error });
            }
        });
    }
    passpAuthGoogle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.conexion.connect();
                const { email, name, picture } = req.body.data;
                const fecha = momet().format("Do MMMM  YYYY");
                const hora = momet().format("h:mm:ss a");
                conn.query("SELECT * FROM admin  Where correo = ?", [email], (error, rows) => __awaiter(this, void 0, void 0, function* () {
                    if (error)
                        return res.status(400).json({ message: "ERROR_DB", error: error });
                    let rol = "superAdmin";
                    let estado = "activo";
                    if (rows.length > 0) {
                        conn.query("SELECT idUsers,rol FROM admin WHERE correo = ?", [email], (error, rows) => __awaiter(this, void 0, void 0, function* () {
                            if (error)
                                return res
                                    .status(400)
                                    .json({ message: "ERROR_DB", error: error });
                            conn.query(`UPDATE admin SET estado = '${estado}' WHERE correo = '${email}'`);
                            if (rows.length > 0) {
                                const token = jsonwebtoken_1.default.sign({ id: rows[0].idUsers }, config_1.SECRET || "tokenGenerate", { expiresIn: 60 * 60 * 24 });
                                return res.status(200).json({
                                    message: "ADMIN_AUTH_SUCCESFULL_GOOGLE",
                                    token: token,
                                    auth: true,
                                    rol: rows[0].rol,
                                });
                            }
                            else {
                                return res.status(400).json({ message: "ERROR_DATA_GOOGLE" });
                            }
                        }));
                    }
                    else {
                        const url = "https://ipapi.co/json/";
                        const response = yield fetch(url);
                        const data = yield response.json();
                        const { country_name, city, longitude, latitude, country_calling_code, languages, ip, network, version, } = data;
                        let cuenta = "Google";
                        let state = "activo";
                        let tc = "si";
                        let authCount = "OK";
                        //cuent,ipA,paisA,ciudadA,country_calling,idiomaA,longA,lagA
                        conn.query(`CALL AUTH_GOOGLE('${email}', '${name}', '${picture}','${fecha}','${hora}',
            '${rol}','${cuenta}','${ip}','${country_name}','${city}','${country_calling_code}',
            '${languages}','${longitude}','${latitude}','${state}','${tc}','${authCount}')`, (error, rows) => __awaiter(this, void 0, void 0, function* () {
                            if (rows) {
                                conn.query("SELECT idUsers ,rol FROM admin WHERE correo = ?", [email], (error, rows) => __awaiter(this, void 0, void 0, function* () {
                                    if (error)
                                        return res
                                            .status(400)
                                            .json({ message: "ERROR_DB", error: error });
                                    if (rows.length > 0) {
                                        const token = jsonwebtoken_1.default.sign({ id: rows[0].idUsers }, config_1.SECRET || "tokenGenerate", { expiresIn: 60 * 60 * 24 });
                                        const resultEmail = new libs_1.sendMailAdmin().sendMailer(email);
                                        return res.status(200).json({
                                            message: "ADMIN_AUTH_SUCCESFULL_GOOGLE",
                                            token: token,
                                            auth: true,
                                            rol: rows[0].rol,
                                        });
                                    }
                                }));
                            }
                        }));
                    }
                }));
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "ERROR_AUTH_ADMIN", error: error });
            }
        });
    }
    userRegister(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tokenIdAcc = req.headers["acc-token-data"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenIdAcc, config_1.SECRET);
                if (verifyToken === null || verifyToken === void 0 ? void 0 : verifyToken.id) {
                }
                else {
                    return res.json({ messaje: "error token" });
                }
            }
            catch (error) {
                res.status(400).send({ tokenError: error, message: "NOT_VERIFY_TOKEN" });
            }
        });
    }
    RegisterUsuario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tokenIdAcc = req.headers["acc-token-data"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenIdAcc, config_1.SECRET);
                const data = {
                    correo: req.body.postDataUserRegister.email,
                    password: req.body.postDataUserRegister.password,
                    authCuenta: true,
                    token: req.body.token,
                    refreshToken: req.body.refreshToken,
                };
                const permisions = {
                    delete: "eliminar",
                    editar: "editar",
                    crear: "crear",
                    leer: "leer",
                    state: "Inactivo",
                };
                if (verifyToken === null || verifyToken === void 0 ? void 0 : verifyToken.id) {
                    const fecha = momet().format("MMMM Do YYYY");
                    const hora = momet().format("h:mm:ss a");
                    const roundNumber = 10;
                    const encriptarPassword = yield bcrypt_1.default.genSalt(roundNumber);
                    const hasPassword = yield bcrypt_1.default.hash(data.password, encriptarPassword);
                    const conn = yield database_1.conexion.connect();
                    conn.query("SELECT * FROM account", (error, rows) => __awaiter(this, void 0, void 0, function* () {
                        if (rows.length > 0) {
                            for (let i = 0; i < rows.length; i++) {
                                if (rows[i].correo == data.correo)
                                    return res.json({
                                        message: "ERR_MAIL_EXIST_USER",
                                        status: 302,
                                    });
                            }
                        }
                        conn.query(`CALL CREATE_USER('${data.correo}','${hasPassword}','${fecha}','${verifyToken.id}','${hora}','${req.body.postDataUserRegister.estado}')`, (error, rows) => {
                            if (rows) {
                                conn.query(`CALL GET_USER_SECOND_USER('${data.correo}')`, (error, rows) => {
                                    if (rows) {
                                        conn.query(`CALL INSERT_MODULE_USER('${req.body.postDataUserRegister.modulo}','${req.body.postDataUserRegister.modulo}','${rows[0][0].idAccount}')`, (error, rowsid) => {
                                            if (rowsid) {
                                                conn.query(`CALL GET_MODULE_ACCOUNT_USER('${rows[0][0].idAccount}')`, (error, rowsData) => {
                                                    if (rowsData) {
                                                        conn.query(`CALL ASIGNED_PERMISION_USER_ACCOUNT('${rowsData[0][0].IDmodulo}','${permisions.editar}','${permisions.editar}','${permisions.state}')`, (error, rowsData) => __awaiter(this, void 0, void 0, function* () {
                                                            if (rowsData) {
                                                                conn.query(`CALL GET_USER_CREATE('${data.correo}')`, (error, rows) => __awaiter(this, void 0, void 0, function* () {
                                                                    yield new Notification_Todo_1.default().createNotificationClass(`Creaste un nuevo usuario`, data.correo, "users", `${verifyToken.id}`);
                                                                    return res.status(201).json({
                                                                        message: "USER_REGISTER_SUCCESFULL",
                                                                        status: 201,
                                                                        data: rows,
                                                                    });
                                                                }));
                                                            }
                                                            else {
                                                                return res.status(400).json({
                                                                    message: "USER_REGISTER_ERROR",
                                                                    status: 400,
                                                                });
                                                            }
                                                        }));
                                                    }
                                                    else {
                                                        return res.status(400).json({
                                                            message: "USER_REGISTER_ERROR",
                                                            status: 400,
                                                        });
                                                    }
                                                });
                                            }
                                            else {
                                                return res.status(400).json({
                                                    message: "USER_REGISTER_ERROR",
                                                    status: 400,
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                            else {
                                return res
                                    .status(400)
                                    .json({ message: "USER_REGISTER_ERROR", status: 400 });
                            }
                        });
                    }));
                }
                else {
                    return res.status(401).json({ message: "N0T_ALLOWED" });
                }
            }
            catch (error) {
                res.status(400).send({ message: "NOT_AUTORIZED" });
            }
        });
    }
    newPassUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.conexion.connect();
                const { codigo, correo, newPassword } = req.body;
                const validate = {
                    correo: correo,
                    codePass: codigo,
                    newPassword: newPassword,
                };
                const expresiones = {
                    password: /^.{4,20}$/,
                };
                if (expresiones.password.test(validate.newPassword)) {
                    conn.query("SELECT * FROM usuario WHERE correo = ? AND codigo = ?", [validate.correo, validate.codePass], (error, rows) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            return res.json({ message: "ERROR_NEW_PASS", error: error });
                        }
                        if (rows.length) {
                            const password = yield bcrypt_1.default.hashSync(validate.newPassword, 10);
                            conn.query("UPDATE usuario SET password = ? WHERE correo = ?", [password, validate.correo], (error, rows) => __awaiter(this, void 0, void 0, function* () {
                                if (error)
                                    return res.json({
                                        message: "ERROR_UPDATE_PASS",
                                        error: error,
                                    });
                                if (rows) {
                                    yield new Notification_Todo_1.default().createNotificationClass("Se cambio la contraseña de tu cuenta correctamente", correo, "users", correo);
                                    return res.json({ message: "PASS_UPDATE_SUCCESFULLY" });
                                }
                            }));
                        }
                        else {
                            return res.json({ message: "ERROR_NEW_PASS" });
                        }
                    }));
                }
                else {
                    return res.json({ message: "EMAIL_NOT_VALID" });
                }
            }
            catch (error) {
                return res.status(400).json({ error });
            }
        });
    }
    recoveryPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.conexion.connect();
                const { email } = req.body;
                const mail = {
                    correo: email,
                };
                conn.query(`CALL ADMIN_SELECT_EMAIL('${mail.correo}')`, [mail.correo], (error, rows) => {
                    if (error) {
                        return res.json({ message: error });
                    }
                    if (rows.length) {
                        const min = 100000;
                        const max = 999999;
                        let codeAcceso = Math.floor(Math.random() * (max - min + 1) + min);
                    }
                    else {
                        res.status(401).json({ message: "EMAIL_NOT_EXIST" });
                    }
                });
            }
            catch (error) {
                return res.status(400).json({ error });
            }
        });
    }
    newPassAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.conexion.connect();
                const { codigo, correo, newPassword } = req.body.data;
                const validate = {
                    correo: correo,
                    codePass: codigo,
                    newPassword: newPassword,
                };
                const roundNumber = 10;
                const encriptarPassword = yield bcrypt_1.default.genSalt(roundNumber);
                const hasPassword = yield bcrypt_1.default.hash(validate.newPassword, encriptarPassword);
                conn.query(`CALL ADMIN_SELECT_EMAIL('${validate.correo}')`, (error, rows) => {
                    if (error)
                        return res
                            .status(500)
                            .json({ message: "ERROR_EMAIL_OBTENER_CODE_SQL", error });
                    if (rows.length > 0) {
                        conn.query(`CALL ADMIN_UPDATE_PASSWORD('${validate.correo}','${hasPassword}')`, (error, rows) => {
                            if (error)
                                return res
                                    .status(400)
                                    .json({ message: "ERROR_UPDATE_PASS", error });
                            if (rows) {
                                conn.query(`UPDATE admin SET codigo = NULL WHERE correo = ? `, [validate.correo]);
                                return res
                                    .status(204)
                                    .json({ message: "PASS_UPDATE_SUCCESFULLY" });
                            }
                        });
                    }
                });
            }
            catch (error) {
                return res.status(400).json({ error });
            }
        });
    }
    uploadusersCsv(req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            const fecha = momet().format("MMMM Do YYYY");
            const hora = momet().format("h:mm:ss a");
            const permisions = {
                delete: "eliminar",
                editar: "editar",
                crear: "crear",
                leer: "leer",
                state: "Inactivo",
            };
            let tokenIdAcc = req.headers["acc-token-data"];
            const verifyToken = jsonwebtoken_1.default.verify(tokenIdAcc, config_1.SECRET);
            const { id } = verifyToken;
            if (id) {
                const roundNumber = 10;
                const encriptarPassword = yield bcrypt_1.default.genSalt(roundNumber);
                const conn = yield database_1.conexion.connect();
                if ((_a = req.files) === null || _a === void 0 ? void 0 : _a.archivousuariocsv) {
                    let fileName = (_c = (_b = req.files) === null || _b === void 0 ? void 0 : _b.archivousuariocsv) === null || _c === void 0 ? void 0 : _c.tempFilePath;
                    (0, csvtojson_1.default)()
                        .fromFile(fileName)
                        .then((source) => __awaiter(this, void 0, void 0, function* () {
                        var _h, _j;
                        let users = 1;
                        for (let i = 0; i < source.length; i++) {
                            let correo = source[i]["correo"], password = source[i]["password"];
                            const hasPassword = yield bcrypt_1.default.hash(password, encriptarPassword);
                            conn.query("SELECT * FROM account", (error, rows) => __awaiter(this, void 0, void 0, function* () {
                                for (let i = 0; i < rows.length; i++) {
                                    if (rows[i].correo == correo)
                                        return res.json({
                                            message: "ERR_MAIL_EXIST_USER",
                                            status: 302,
                                        });
                                }
                                conn.query(`CALL CREATE_USER('${correo}','${hasPassword}','${fecha}','${id}','${hora}','${req.body["formDataCsv[estado]"]}')`, (error, rows) => {
                                    if (rows) {
                                        conn.query(`CALL GET_USER_SECOND_USER('${correo}')`, (error, rows) => {
                                            if (rows) {
                                                conn.query(`CALL INSERT_MODULE_USER('${req.body["formDataCsv[modulo]"]}','${req.body["formDataCsv[modulo]"]}','${rows[0][0].idAccount}')`, (error, rowsid) => {
                                                    if (rowsid) {
                                                        conn.query(`CALL GET_MODULE_ACCOUNT_USER('${rows[0][0].idAccount}')`, (error, rowsData) => {
                                                            if (rowsData) {
                                                                conn.query(`CALL ASIGNED_PERMISION_USER_ACCOUNT('${rowsData[0][0].IDmodulo}','${permisions.editar}','${permisions.editar}','${permisions.state}')`, (error, rowsData) => { });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        return res.status(400).json({
                                            message: "USER_REGISTER_ERROR",
                                            status: 400,
                                            data: rows,
                                        });
                                    }
                                });
                            }));
                        }
                        yield fs_extra_1.default.remove((_j = (_h = req.files) === null || _h === void 0 ? void 0 : _h.archivousuariocsv) === null || _j === void 0 ? void 0 : _j.tempFilePath);
                        conn.query(`CALL GET_USER('${id}')`, (error, rows) => {
                            return res.status(201).json({
                                message: "USER_REGISTER_SUCCESFULL",
                                status: 201,
                                data: rows,
                            });
                        });
                    }));
                }
                else {
                    yield fs_extra_1.default.remove((_e = (_d = req.files) === null || _d === void 0 ? void 0 : _d.archivousuariocsv) === null || _e === void 0 ? void 0 : _e.tempFilePath);
                    return res.send("no subio el documento");
                }
            }
            else {
                yield fs_extra_1.default.remove((_g = (_f = req.files) === null || _f === void 0 ? void 0 : _f.archivousuariocsv) === null || _g === void 0 ? void 0 : _g.tempFilePath);
                return res.status(400).json({ message: "ERROR_SESSION" });
            }
        });
    }
    getUsersAdminData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = jsonwebtoken_1.default.verify(req.params.idToken, config_1.SECRET);
                const { id } = verifyToken;
                if (id) {
                    const conn = yield database_1.conexion.connect();
                    conn.query(`CALL GET_USER('${id}')`, (error, rows) => {
                        if (error)
                            return res
                                .status(500)
                                .json({ message: "ERROR_GET_USERS_ADMIN_DATA", error });
                        if (rows) {
                            return res
                                .status(200)
                                .json({ message: "GET_USERS_ADMIN_DATA", data: rows[0] });
                        }
                    });
                }
                else {
                    return res.status(400).json({ message: "ERROR_SESSION" });
                }
            }
            catch (error) {
                return res.status(400).json({ error });
            }
        });
    }
    deleteAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tokenIdAcc = req.headers["isallowed-x-token"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenIdAcc, config_1.SECRET);
                const { id } = verifyToken;
                if (id) {
                    const conn = yield database_1.conexion.connect();
                    conn.query("DELETE  FROM services WHERE idAccountUsers = ?", [
                        req.body.deleteData,
                    ]);
                    conn.query(`CALL SELECT_ALL_MODULE_USERS('${req.body.deleteData}')`, (error, rows) => {
                        conn.query(`CALL DELETE_ALL_USERS('${req.body.deleteData}','${rows[0][0].IDmodulo}')`, (error, rows) => __awaiter(this, void 0, void 0, function* () {
                            if (rows) {
                                yield new Notification_Todo_1.default().createNotificationClass("Se elimino un usuario de la plataforma", "usuario", "users", id);
                                return res.status(200).json({ message: "DELETE_ALL_USERS" });
                            }
                            else {
                                return res
                                    .status(400)
                                    .json({ message: "ERROR_DELETE_ALL_USERS" });
                            }
                        }));
                    });
                }
                else {
                    return res.status(400).json({ message: "ERROR_SESSION" });
                }
            }
            catch (error) {
                return res.status(400).json({ message: "ERROR_SESSION" });
            }
        });
    }
    CountUsersAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = jsonwebtoken_1.default.verify(req.params.idToken, config_1.SECRET);
                const { id } = verifyToken;
                if (id) {
                    const conn = yield database_1.conexion.connect();
                    conn.query(`CALL GET_COUNT_USERS('${id}')`, (error, rows) => {
                        conn.query(`CALL COUNT_STATE_USER('${id}')`, (error, rowsActive) => {
                            conn.query(`CALL COUNT_STATE_USER_INACTIVO('${id}')`, (error, rowsInactive) => {
                                if (rows) {
                                    return res.status(200).json({
                                        message: "COUNT_USERS_ALL",
                                        countUsers: rows[0][0].total,
                                        stateActive: rowsActive[0][0].totalActive,
                                        stateInactive: rowsInactive[0][0].totalActive,
                                    });
                                }
                                else {
                                    return res
                                        .status(400)
                                        .json({ message: "ERROR_COUNT_USERS_ALL" });
                                }
                            });
                        });
                    });
                }
            }
            catch (error) {
                return res.status(400).json({ message: "ERROR_SESSION" });
            }
        });
    }
    // Here go the part of module,permisions
    getModuleUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = jsonwebtoken_1.default.verify(req.headers["isallowed-x-token"], config_1.SECRET);
                const { id } = verifyToken;
                if (id) {
                    const conn = yield database_1.conexion.connect();
                    conn.query(`CALL GET_MODULE_ACCOUNT_USER('${req.params.id}')`, (error, rows) => {
                        if (rows) {
                            return res
                                .status(200)
                                .json({ message: "GET_MODULE_USER", data: rows[0] });
                        }
                        else {
                            return res.status(400).json({ message: "ERROR_GET_MODULE_USER" });
                        }
                    });
                }
            }
            catch (error) {
                res.send("error");
                return error;
            }
        });
    }
    getPermisions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = jsonwebtoken_1.default.verify(req.params.idModule, config_1.SECRET);
                const { id } = verifyToken;
                if (id) {
                    const conn = yield database_1.conexion.connect();
                    conn.query(`CALL GET_PERMISIONS_MODULE_USER('${id}')`, (error, rows) => {
                        if (rows) {
                            return res
                                .status(200)
                                .json({ message: "GET_PERMISIONS_USER", data: rows[0] });
                        }
                        else {
                            return res
                                .status(400)
                                .json({ message: "ERROR_GET_PERMISIONS_USER" });
                        }
                    });
                }
            }
            catch (error) {
                return res.status(400).json({ message: "ERROR_SESSION" });
            }
        });
    }
    updateAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = jsonwebtoken_1.default.verify(req.params.idToken, config_1.SECRET);
                const { id } = verifyToken;
                if (id) {
                    const conn = yield database_1.conexion.connect();
                    conn.query(`CALL ADMIN_UPDATE_DATA('${id}','${req.body.name}','${req.body.lastname}','${req.body.email}')`, (error, rows) => {
                        if (rows) {
                            return res.status(200).json({ message: "UPDATE_ADMIN_USER" });
                        }
                        else {
                            return res
                                .status(400)
                                .json({ message: "ERROR_UPDATE_ADMIN_USER" });
                        }
                    });
                }
            }
            catch (error) {
                return res.status(400).json({ message: "ERROR_SESSION" });
            }
        });
    }
    deleteModule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = jsonwebtoken_1.default.verify(req.headers["isallowed-x-token"], config_1.SECRET);
                const { id } = verifyToken;
                if (id) {
                    const conn = yield database_1.conexion.connect();
                    conn.query(`CALL DELETE_MODULE_USER('${req.body.id}')`, (error, rows) => {
                        if (rows) {
                            return res.status(200).json({ message: "DELETE_MODULE_USER" });
                        }
                        else {
                            return res
                                .status(400)
                                .json({ message: "ERROR_DELETE_MODULE_USER" });
                        }
                    });
                }
            }
            catch (error) {
                return res.status(400).json({ message: "ERROR_SESSION" });
            }
        });
    }
    setModule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = jsonwebtoken_1.default.verify(req.headers["isallowed-x-token"], config_1.SECRET);
                const { id } = verifyToken;
                if (id) {
                    const conn = yield database_1.conexion.connect();
                    conn.query(`CALL INSERT_MODULE_USER('${req.body.data.module}','${req.body.data.module}','${req.body.data.idAccount}')`, (error, rows) => {
                        conn.query("SELECT IDmodulo, titulo FROM modulo WHERE titulo = ?", [req.body.data.module], (error, row) => {
                            if (rows) {
                                return res
                                    .status(200)
                                    .json({ message: "SET_MODULE_USER", data: row });
                            }
                            else {
                                return res
                                    .status(400)
                                    .json({ message: "ERROR_SET_MODULE_USER" });
                            }
                        });
                    });
                }
            }
            catch (error) {
                return res.status(400).json({ message: "ERROR_SESSION" });
            }
        });
    }
    setPermisionModule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = jsonwebtoken_1.default.verify(req.params.idToken, config_1.SECRET);
                const { id } = verifyToken;
                if (id) {
                    const conn = yield database_1.conexion.connect();
                    conn.query(`CALL ASIGNED_PERMISION_USER_ACCOUNT('${id}','${req.body.idModule}','${req.body.permisions}')`, (error, rows) => {
                        if (rows) {
                            return res
                                .status(200)
                                .json({ message: "SET_PERMISIONS_MODULE_USER" });
                        }
                        else {
                            return res
                                .status(400)
                                .json({ message: "ERROR_SET_PERMISIONS_MODULE_USER" });
                        }
                    });
                }
            }
            catch (error) {
                return res.status(400).json({ message: "ERROR_SESSION" });
            }
        });
    }
    deletePermisionModule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = jsonwebtoken_1.default.verify(req.params.idToken, config_1.SECRET);
                const { id } = verifyToken;
                if (id) {
                    const conn = yield database_1.conexion.connect();
                    conn.query(`CALL DELETE_PERMISIONS_MODULE_USER('${id}','${req.body.idModule}')`, (error, rows) => __awaiter(this, void 0, void 0, function* () {
                        if (rows) {
                            return res
                                .status(200)
                                .json({ message: "DELETE_PERMISIONS_MODULE_USER" });
                        }
                        else {
                            return res
                                .status(400)
                                .json({ message: "ERROR_DELETE_PERMISIONS_MODULE_USER" });
                        }
                    }));
                }
            }
            catch (error) {
                return res.status(400).json({ message: "ERROR_SESSION" });
            }
        });
    }
    getMod(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = jsonwebtoken_1.default.verify(req.params.id, config_1.SECRET);
                const { id1 } = verifyToken;
                if (id1) {
                    const conn = yield database_1.conexion.connect();
                    conn.execute(`CALL GET_MODULE_ACCOUNT_USER('${id1}')`, (error, rows) => {
                        if (rows) {
                            return res
                                .status(200)
                                .json({ message: "GET_MODULES_USER", data: rows[0] });
                        }
                        else {
                            return res
                                .status(400)
                                .json({ message: "ERROR_GET_MODULES_USER" });
                        }
                    });
                }
            }
            catch (error) {
                return res.status(400).json({ message: "ERROR_GET_MODULES_USER" });
            }
        });
    }
    getAdminAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = jsonwebtoken_1.default.verify(req.params.id, config_1.SECRET);
                const { id } = verifyToken;
                if (id) {
                    const conn = yield database_1.conexion.connect();
                    conn.query(`CALL ADMIN_SELECT('${id}')`, (error, rows) => {
                        if (rows) {
                            return res
                                .status(200)
                                .json({ message: "GET_ADMIN_ALL", data: rows[0] });
                        }
                        else {
                            return res.status(400).json({ message: "ERROR_GET_ADMIN_ALL" });
                        }
                    });
                }
            }
            catch (error) {
                return res.status(400).json({ message: "ERROR_TOKEN" });
            }
        });
    }
    uploadImageA(req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = jsonwebtoken_1.default.verify(req.headers["token-x-id"], config_1.SECRET);
                const { id } = verifyToken;
                if (id) {
                    let url_imagen = null;
                    let id_img = null;
                    if ((_a = req.files) === null || _a === void 0 ? void 0 : _a.imgData) {
                        const result = yield (0, cloudinary_1.uploadImage)((_b = req.files) === null || _b === void 0 ? void 0 : _b.imgData.tempFilePath);
                        url_imagen = result.secure_url;
                        id_img = result.public_id;
                        yield fs_extra_1.default.remove((_c = req.files) === null || _c === void 0 ? void 0 : _c.imgData.tempFilePath);
                        const conn = yield database_1.conexion.connect();
                        conn.query(`CALL ADMIN_UPLOAD_IMG('${id}','${url_imagen}','${id_img}')`, (error, rows) => {
                            if (rows) {
                                return res.status(200).json({ message: "UPLOAD_IMAGE_ADMIN" });
                            }
                            else {
                                return res
                                    .status(400)
                                    .json({ message: "ERROR_UPLOAD_IMAGE_ADMIN" });
                            }
                        });
                    }
                    else {
                        return res.status(400).json({ message: "ERROR_UPLOAD_IMAGE_ADMIN" });
                    }
                }
                else {
                    return res.status(400).json({ message: "ERROR_TOKEN_ACC" });
                }
            }
            catch (error) {
                return res.status(400).json({ message: "ERROR_TOKEN", error });
            }
        });
    }
    UpdateAdminAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = jsonwebtoken_1.default.verify(req.headers["token-x-id"], config_1.SECRET);
                const { id } = verifyToken;
                if (id) {
                    const conn = yield database_1.conexion.connect();
                    conn.execute(`CALL ADMIN_UPDATE_DATA('${id}','${req.body.data.name}','${req.body.data.document}','${req.body.data.telefono}','${req.body.data.empresa}')`, (error, rows) => __awaiter(this, void 0, void 0, function* () {
                        if (rows) {
                            conn.query(`CALL ADMIN_SELECT('${id}')`, (error, rows) => __awaiter(this, void 0, void 0, function* () {
                                yield new Notification_Todo_1.default().createNotificationClass(`Tus datos se actualizaron correctamente`, "se mantendra la misma contraseña", "users", `${id}`);
                                return res
                                    .status(200)
                                    .json({ message: "UPDATE_ADMIN_ALL", data: rows[0] });
                            }));
                        }
                        else {
                            return res.status(400).json({ message: "ERROR_DATA" });
                        }
                    }));
                }
                else {
                    return res.status(400).json({ message: "ERROR_TOKEN" });
                }
            }
            catch (error) {
                return res.status(400).json({ message: "ERROR_TOKEN" });
            }
        });
    }
    GetServiceUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id === "undefined") {
                    return res.send({ message: "ERROR_ID" });
                }
                const conn = yield database_1.conexion.connect();
                conn.query(`CALL GET_SERVICE_USER('${req.params.id}')`, (error, rows) => {
                    if (rows) {
                        return res
                            .status(200)
                            .json({ message: "GET_SERVICE_USER", data: rows[0] });
                    }
                    else {
                        return res.status(400).json({ message: "ERROR_GET_SERVICE_USER" });
                    }
                });
            }
            catch (error) {
                return res.status(400).json({ message: "ERROR_TOKEN" });
            }
        });
    }
}
exports.default = LoginRegister;
//# sourceMappingURL=GestionUser.js.map