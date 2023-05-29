"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GestionNotification_1 = __importDefault(require("../controllers/GestionNotification"));
const router = (0, express_1.Router)();
class RouterNotification extends GestionNotification_1.default {
    GetNotification() {
        router.get("/notification/:id", this.getNotification);
        return router;
    }
    GetNotificationId() {
        router.get("/notificationId/:_id", this.getNotificationId);
        return router;
    }
    DeleteNotificationId() {
        router.delete("/notification/:id", this.deleteNotification);
        return router;
    }
    PostcreateNotification() {
        router.post("/notification", this.createNotification);
        return router;
    }
    DeleteNotificationEstado() {
        router.delete("/notificationTodoEstado", this.estadoDeleteNotification);
        return router;
    }
}
exports.default = RouterNotification;
//# sourceMappingURL=router.Notification.js.map