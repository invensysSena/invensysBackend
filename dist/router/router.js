"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GestionUser_1 = __importDefault(require("../controllers/GestionUser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const router = (0, express_1.Router)();
const path_1 = __importDefault(require("path"));
class RouterUser extends GestionUser_1.default {
    Login() {
        router.post("/login", this.LoginAuth);
        return router;
    }
    registerAdmin() {
        router.post("/register", this.AdminRegister);
        return router;
    }
    registerUser() {
        router.post("/registerUser", this.RegisterUsuario);
        return router;
    }
    getDataAdmin() {
        router.get("/getDataAdmin", this.getAdminData);
        return router;
    }
    recoveryPass() {
        router.post("/recovery", this.recoveryPassword);
        return router;
    }
    veryfiCod() {
        router.post("/recoverycode", this.veryfidCode);
        return router;
    }
    newPassword() {
        return router.post("/newPass", this.newPassAdmin);
    }
    authGoogle() {
        return router.post("/authgoogleAccount", this.passpAuthGoogle);
    }
    uploadCsvUsers() {
        return router.post("/uploadcsvUsers", (0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: path_1.default.join(__dirname, "/uploadcsv"),
        }), this.uploadusersCsv);
    }
    getUsersAdmin() {
        return router.get("/getUsersData/:idToken", this.getUsersAdminData);
    }
    UsersDelete() {
        return router.post("/deleteUser", this.deleteAllUsers);
    }
    GetCountUsers() {
        return router.get("/countUsers/:idToken", this.CountUsersAll);
    }
    GetModuleUsers() {
        return router.get("/getModuleUsers/:id", this.getModuleUsers);
    }
    GetPermisions() {
        return router.get("/getPermisions/:idModule", this.getPermisions);
    }
    UpdateAdmin() {
        return router.post("/updateAdmin", this.updateAdmin);
    }
    DeleteModuleUser() {
        return router.post("/deleteModuleUser", this.deleteModule);
    }
    SetModuleUsers() {
        return router.post("/setModule", this.setModule);
    }
    SetPermisionModule() {
        return router.post("/setPermisionModule/:idModule", this.setPermisionModule);
    }
    DeletePermisionModule() {
        return router.post("/deletePermisionModule/:idModule", this.deletePermisionModule);
    }
    GetMod() {
        return router.get("/getMod/:id", this.getMod);
    }
    getAdminDataALL() {
        return router.get("/getAdminAll/:id", this.getAdminAll);
    }
    UpdateAdminALL() {
        return router.put("/updateAdminALL", this.UpdateAdminAll);
    }
    uploadImageAdmin() {
        return router.put("/AuploadImageA", (0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: "./uploads",
        }), this.uploadImageA);
    }
    ServiseUser() {
        return router.get("/serviceId/:id", this.GetServiceUser);
    }
}
exports.default = RouterUser;
//# sourceMappingURL=router.js.map