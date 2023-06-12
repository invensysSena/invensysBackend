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
exports.conexion = exports.Conexion = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
class Conexion {
    constructor() {
        this.host = "localhost";
        this.user = "root";
        this.password = "";
        this.database = "invensys";
        this.charset = "utf8";
        this.port = 3306;
    }
    getRepository(Admin) {
        throw new Error("Method not implemented.");
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conenct = yield mysql2_1.default.createConnection({
                    host: this.host,
                    user: this.user,
                    password: this.password,
                    database: this.database,
                    charset: this.charset,
                    port: this.port,
                });
                yield this.veryficarConexion(conenct);
                return conenct;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    veryficarConexion(conenct) {
        return __awaiter(this, void 0, void 0, function* () {
            // si se cae la conexion se vuelve a conectar
            conenct.on("error", (err) => {
                if (err.code === "PROTOCOL_CONNECTION_LOST") {
                    console.error("Database connection was closed.");
                    this.connect();
                }
                if (err.code === "ER_CON_COUNT_ERROR") {
                    console.error("Database has to many connections");
                    this.connect();
                }
                if (err.code === "ECONNREFUSED") {
                    console.error("Database connection was refused");
                    this.connect();
                }
            });
        });
    }
}
exports.Conexion = Conexion;
exports.conexion = new Conexion();
//# sourceMappingURL=database.js.map