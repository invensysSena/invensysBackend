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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config/config");
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("../database/mongodb");
const ServerRoutes_1 = require("../utils/ServerRoutes");
mongoose_1.default.set("strictQuery", true);
const AppServer = (0, express_1.default)();
const database_1 = require("../database/database");
class App {
    constructor() {
        this.startServer = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const urlConnectionAcceso = "http://localhost:3000/*";
                const statusCors = 200;
                const port = 8080;
                AppServer.use((0, cors_1.default)({
                    origin: [urlConnectionAcceso, "http://localhost:3000"],
                    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
                    optionsSuccessStatus: statusCors,
                }));
                AppServer.use(express_1.default.static(path_1.default.join(__dirname, "public")));
                AppServer.use(express_1.default.json());
                AppServer.use(express_1.default.urlencoded({ extended: true }));
                AppServer.use(yield new ServerRoutes_1.ServerRoutes().Inicio());
                yield (0, mongodb_1.connect)();
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    listen() {
        this.startServer();
        database_1.conexion.connect();
        const port = 8080;
        AppServer.listen(config_1.PORT || port, () => {
            console.log("connection in the port: :", config_1.PORT);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map