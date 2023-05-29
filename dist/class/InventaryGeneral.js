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
const InventaryGeneral_1 = __importDefault(require("../models/InventaryGeneral"));
const database_1 = require("../database/database");
const Notification_Todo_1 = __importDefault(require("./Notification.Todo"));
InventaryGeneral_1.default;
class GerneralInventary {
    constructor() {
        this.idTokenAdmin = "";
        this.typeUser = "";
    }
    setProperties(idTokenAdmin, typeUser, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.idTokenAdmin = idTokenAdmin;
            this.typeUser = typeUser;
            this.data = data;
            return yield this.createInventaryGeneral(data);
        });
    }
    createInventaryGeneral(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.conexion.connect();
            const { name_inventory, description, idBodega } = data;
            if (this.typeUser === "superAdmin") {
                conn.query("SELECT correo FROM admin WHERE idUsers = ? ", [this.idTokenAdmin], (err, rows, fields) => __awaiter(this, void 0, void 0, function* () {
                    if (rows) {
                        const inventory = new InventaryGeneral_1.default({
                            tokenIdUser: this.idTokenAdmin,
                            name_inventory,
                            idBodega,
                            description,
                            estadoInventory: "activo",
                            responsableInventory: rows[0].correo,
                            type: "Administrador",
                        });
                        const response = yield inventory.save();
                        yield new Notification_Todo_1.default().createNotificationClass("Se creo un nuevo inventario", name_inventory, "inventory", this.idTokenAdmin);
                    }
                }));
            }
        });
    }
}
exports.default = GerneralInventary;
//# sourceMappingURL=InventaryGeneral.js.map