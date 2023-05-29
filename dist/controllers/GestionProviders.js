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
const modelProviders_1 = __importDefault(require("../models/modelProviders"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const Notification_Todo_1 = __importDefault(require("../class/Notification.Todo"));
class ManageProviders {
    postProviders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenCreated = req.headers["x-id-token"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenCreated, config_1.SECRET);
                const tokenIdUser = verifyToken.id;
                const { idCategory, name, company, email, phone, address } = req.body.data;
                if (!tokenIdUser) {
                    return res.status(400).json({
                        message: "No existe el token",
                    });
                }
                else {
                    const provider = new modelProviders_1.default({
                        idCategory,
                        tokenIdUser,
                        name,
                        company,
                        email,
                        phone,
                        address,
                    });
                    const providers = yield provider.save();
                    yield new Notification_Todo_1.default().createNotificationClass("Se creo un nuevo un proveedor", name, "provider", tokenIdUser);
                    return res.status(201).json({
                        message: "Provider created", providers
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal server error", error
                });
            }
        });
    }
    getProviders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenCreated = req.params.id;
                const verifyToken = jsonwebtoken_1.default.verify(tokenCreated, config_1.SECRET);
                const tokenIdUser = verifyToken.id;
                if (!tokenIdUser) {
                    return res.status(400).json({
                        message: "No existe el token",
                    });
                }
                else {
                    const providers = yield modelProviders_1.default.find({ tokenIdUser });
                    return res.status(200).json(providers);
                }
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal server error", error,
                });
            }
        });
    }
    getProvidersId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenCreated = req.headers["x-id-token"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenCreated, config_1.SECRET);
                const tokenIdUser = verifyToken.id;
                if (!tokenIdUser) {
                    return res.status(400).json({
                        message: "No existe el token",
                    });
                }
                else {
                    const { id } = req.params;
                    const provider = yield modelProviders_1.default.findById(id);
                    return res.status(200).json(provider);
                }
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal server error",
                });
            }
        });
    }
    putProviders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenCreated = req.headers["x-id-token"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenCreated, config_1.SECRET);
                const tokenIdUser = verifyToken.id;
                if (!tokenIdUser) {
                    return res.status(400).json({
                        message: "No existe el token",
                    });
                }
                else {
                    const { id } = req.params;
                    const { name, company, email, phone, address } = req.body;
                    const provider = {
                        name,
                        company,
                        email,
                        phone,
                        address,
                    };
                    const providerUpdated = yield modelProviders_1.default.findByIdAndUpdate(id, provider, { new: true });
                    return res.status(200).json(providerUpdated);
                }
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal server error",
                });
            }
        });
    }
    deleteProviders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenCreated = req.headers["x-id-token"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenCreated, config_1.SECRET);
                const tokenIdUser = verifyToken.id;
                if (!tokenIdUser) {
                    return res.status(400).json({
                        message: "No existe el token",
                    });
                }
                else {
                    const { id } = req.params;
                    yield new Notification_Todo_1.default().createNotificationClass("Se Elimino  un proveedor", "Se elimino con exito", "provider", tokenIdUser);
                    const providerDeleted = yield modelProviders_1.default.findByIdAndDelete(id);
                    return res.status(200).json(providerDeleted);
                }
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal server error",
                });
            }
        });
    }
    getProvidersProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenCreated = req.headers["x-id-token"];
                const verifyToken = jsonwebtoken_1.default.verify(tokenCreated, config_1.SECRET);
                const tokenIdUser = verifyToken.id;
                if (!tokenIdUser) {
                    return res.status(400).json({
                        message: "No existe el token",
                    });
                }
                else {
                    const { id } = req.params;
                    const provider = yield modelProviders_1.default.find({ productIdCategory: id });
                    return res.status(200).json(provider);
                }
            }
            catch (error) {
                return res.status(400).json({
                    message: "Internal server error",
                });
            }
        });
    }
}
exports.default = ManageProviders;
//# sourceMappingURL=GestionProviders.js.map