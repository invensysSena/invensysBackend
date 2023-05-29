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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const Notification_Todo_1 = __importDefault(require("../class/Notification.Todo"));
class Notification {
    constructor() {
        this.estadoDeleteNotification = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let idToken = req.headers.authorization;
                const verifyToken = jsonwebtoken_1.default.verify(idToken, config_1.SECRET);
                if (verifyToken.id) {
                    let responseNotification = yield new Notification_Todo_1.default().deleteEstado(verifyToken.id);
                    res.status(200).json({ message: "ok", responseNotification });
                }
                else {
                    return res.status(401).json({ message: "NO_PERMISION" });
                }
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "Error en el servidor ok", error });
            }
        });
    }
    createNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idToken = req.headers.authorization;
                const verifyToken = jsonwebtoken_1.default.verify(idToken, config_1.SECRET);
                const { title, description, type } = req.body;
                let responseNotification = yield new Notification_Todo_1.default().createNotificationClass(title, description, type, verifyToken.id);
                res.status(200).json({ message: "ok", responseNotification });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "Error en el servidor ok", error });
            }
        });
    }
    getNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idToken = req.params.id;
                const verifyToken = jsonwebtoken_1.default.verify(idToken, config_1.SECRET);
                if (verifyToken.id) {
                    let responseNotification = yield new Notification_Todo_1.default().getNotificationClass(verifyToken.id);
                    res.status(200).json({ message: "ok", responseNotification });
                }
                else {
                    return res.status(401).json({ message: "NO_PERMISION" });
                }
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "Error en el servidor ok", error });
            }
        });
    }
    getNotificationId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send("get id");
        });
    }
    deleteNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id) {
                let responseNotification = yield new Notification_Todo_1.default().deleteNotificationClass(req.params.id);
                res.status(200).json({ message: "ok", responseNotification });
            }
            else {
                return res.status(401).json({ message: "NO_PERMISION" });
            }
        });
    }
}
exports.default = Notification;
//# sourceMappingURL=GestionNotification.js.map