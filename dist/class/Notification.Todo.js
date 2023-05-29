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
const modelNotfication_1 = __importDefault(require("../models/modelNotfication"));
class Todo extends modelNotfication_1.default {
    constructor() {
        super(...arguments);
        this.deleteEstado = (idToken) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield modelNotfication_1.default.updateMany({ tokeIdUser: idToken }, { estado: 0 });
            }
            catch (error) {
                return error;
            }
        });
    }
    createNotificationClass(title, description, type, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newNotification = yield new modelNotfication_1.default({
                    tokeIdUser: token,
                    title,
                    description,
                    type,
                });
                return yield newNotification.save();
            }
            catch (error) {
                return error;
            }
        });
    }
    getNotificationClass(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield modelNotfication_1.default.find({ tokeIdUser: id });
            }
            catch (error) {
                return error;
            }
        });
    }
    deleteNotificationClass(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield modelNotfication_1.default.findByIdAndDelete(_id);
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.default = Todo;
//# sourceMappingURL=Notification.Todo.js.map