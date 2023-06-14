import { Router } from "express";
import LoginRegister from "../controllers/GestionUser";
import LicenceSofteareInvensys from "../controllers/GestionLicence";
import fileUpload from "express-fileupload";
const router: Router = Router();
import path from "path";
import ChangeDataController from "../controllers/ChangeData";
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
const valid = new ValidationTokenAndCreateToken();
const changeData = new ChangeDataController();
const licence = new LicenceSofteareInvensys();

class RouterUser extends LoginRegister {
  public updateAdminPass() {
    router.put(
      "/updateAdminPass",
      valid.verifyTokenAndAdmin,
      changeData.UpdatePassAdmin
    );
    return router;
  }

  public RouterPrincipal() {
    router.get("/", (req, res) => {
      res.send("Hello World");
    });
    return router;
  }

  public updatePassUser() {
    router.put(
      "/updatePassUser/:id",
      valid.verifyTokenAndAdmin,
      changeData.UpdatePassUser
    );
    return router;
  }

  public updateEmailUser() {
    router.put(
      "/updateEmailUser/:id",
      valid.verifyTokenAndAdmin,
      changeData.UpdateEmailUser
    );
    return router;
  }

  public licenceRouter() {
    router.post(
      "/createLicence/:id",
      valid.verifyTokenAndAdmin,
      licence.createLicence
    );

    return router;
  }
  public getLicence() {
    router.get(
      "/getLicence/:id",
      valid.verifyTokenAndAdmin,
      licence.getLicence
    );
    return router;
  }

  public Login() {
    router.post("/login", this.LoginAuth);

    return router;
  }

  public registerAdmin() {
    router.post("/register", this.AdminRegister);
    return router;
  }
  public registerUser() {
    router.post(
      "/registerUser",
      valid.verifyTokenAndAdmin,
      this.RegisterUsuario
    );
    return router;
  }
  public getDataAdmin() {
    router.get("/getDataAdmin", valid.verifyTokenAndAdmin, this.getAdminData);
    return router;
  }

  public recoveryPass() {
    router.post("/recovery", this.recoveryPassword);
    return router;
  }

  public veryfiCod() {
    router.post("/recoverycode", this.veryfidCode);
    return router;
  }
  public newPassword() {
    return router.post("/newPass", this.newPassAdmin);
  }
  public authGoogle() {
    return router.post("/authgoogleAccount", this.passpAuthGoogle);
  }
  public uploadCsvUsers() {
    return router.post(
      "/uploadcsvUsers",
      fileUpload({
        useTempFiles: true,

        tempFileDir: path.join(__dirname, "/uploadcsv"),
      }),
      this.uploadusersCsv
    );
  }
  public getUsersAdmin() {
    return router.get(
      "/getUsersData/:idToken",
      valid.verifyTokenAndAdmin,
      this.getUsersAdminData
    );
  }
  public UsersDelete() {
    return router.post(
      "/deleteUser",
      valid.verifyTokenAndAdmin,
      this.deleteAllUsers
    );
  }
  public GetCountUsers() {
    return router.get(
      "/countUsers/:idToken",
      valid.verifyTokenAndAdmin,
      this.CountUsersAll
    );
  }

  public GetModuleUsers() {
    return router.get(
      "/getModuleUsers/:id",
      valid.verifyTokenAndAdmin,
      this.getModuleUsers
    );
  }

  public GetPermisions() {
    return router.get(
      "/getPermisions/:idModule",
      valid.verifyTokenAndAdmin,
      this.getPermisions
    );
  }

  public UpdateAdmin() {
    return router.post(
      "/updateAdmin",
      valid.verifyTokenAndAdmin,
      this.updateAdmin
    );
  }

  public DeleteModuleUser() {
    return router.post(
      "/deleteModuleUser",
      valid.verifyTokenAndAdmin,
      this.deleteModule
    );
  }

  public SetModuleUsers() {
    return router.post("/setModule", valid.verifyTokenAndAdmin, this.setModule);
  }

  public SetPermisionModule() {
    return router.post(
      "/setPermisionModule/:idModule",
      valid.verifyTokenAndAdmin,
      this.setPermisionModule
    );
  }

  public DeletePermisionModule() {
    return router.post(
      "/deletePermisionModule/:idModule",
      valid.verifyTokenAndAdmin,
      this.deletePermisionModule
    );
  }

  public GetMod() {
    return router.get("/getMod/:id", this.getMod);
  }

  public getAdminDataALL() {
    return router.get(
      "/getAdminAll/:id",
      valid.verifyTokenAndAdmin,
      this.getAdminAll
    );
  }
  public UpdateAdminALL() {
    return router.put(
      "/updateAdminALL",
      valid.verifyTokenAndAdmin,
      this.UpdateAdminAll
    );
  }
  public uploadImageAdmin() {
    return router.put(
      "/AuploadImageA",
      valid.verifyTokenAndAdmin,
      fileUpload({
        useTempFiles: true,
        tempFileDir: "./uploads",
      }),
      this.uploadImageA
    );
  }
  public ServiseUser() {
    return router.get(
      "/serviceId/:id",
      valid.verifyTokenAndAdmin,
      this.GetServiceUser
    );
  }
}

export default RouterUser;
