"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GestionUser_1 = __importDefault(require("../controllers/GestionUser"));
const GestionLicence_1 = __importDefault(require("../controllers/GestionLicence"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const router = (0, express_1.Router)();
const path_1 = __importDefault(require("path"));
const ChangeData_1 = __importDefault(require("../controllers/ChangeData"));
const changeData = new ChangeData_1.default();
const licence = new GestionLicence_1.default();
class RouterUser extends GestionUser_1.default {
    updateAdminPass() {
        router.put("/updateAdminPass", changeData.UpdatePassAdmin);
        return router;
    }
    updatePassUser() {
        router.put("/updatePassUser/:id", changeData.UpdatePassUser);
        return router;
    }
    updateEmailUser() {
        router.put("/updateEmailUser/:id", changeData.UpdateEmailUser);
        return router;
    }
    licenceRouter() {
        router.post("/createLicence/:id", licence.createLicence);
        return router;
    }
    getLicence() {
        router.get("/getLicence/:id", licence.getLicence);
        return router;
    }
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