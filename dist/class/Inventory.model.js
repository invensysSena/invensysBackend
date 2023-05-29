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
const database_1 = require("../database/database");
class modelInventoryData {
    postInventoryAcceso(tokeIdUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.conexion.connect();
                conn.query("SELECT correo FROM admin WHERE idUsers = ? ", [tokeIdUser], (err, rows, fields) => __awaiter(this, void 0, void 0, function* () {
                    if (rows) {
                        return yield rows[0].correo;
                    }
                }));
            }
            catch (error) { }
        });
    }
}
exports.default = modelInventoryData;
//# sourceMappingURL=Inventory.model.js.map