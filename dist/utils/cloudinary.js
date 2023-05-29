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
exports.deleteImage = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = require("../config/config");
cloudinary_1.v2.config({
    cloud_name: config_1.claudinar_Name,
    api_key: config_1.cludinaryKey,
    api_secret: config_1.claudinarySecret,
    secure: true
});
function uploadImage(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield cloudinary_1.v2.uploader.upload(filePath, {
            folder: "stored",
            equalize: true,
            quality: "auto",
            transformation: [
                { gravity: "face", height: 400, width: 400, crop: "crop" },
                { radius: "max" },
                { width: 200, crop: "scale" }
            ]
        });
    });
}
exports.uploadImage = uploadImage;
function deleteImage(publicId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield cloudinary_1.v2.uploader.destroy(publicId);
    });
}
exports.deleteImage = deleteImage;
//# sourceMappingURL=cloudinary.js.map