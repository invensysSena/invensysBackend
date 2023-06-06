import { Router } from "express";
import LoginRegister from "../controllers/GestionUser";
import fileUpload from "express-fileupload";
const router: Router = Router();
import path from "path";
import ChangeDataController from "../controllers/ChangeData";
const dataChange = new ChangeDataController();
class RouterUser extends LoginRegister {

  public changePassAdmin(){
    router.put("/changePassAdmin", dataChange.UpdatePassAdmin);
    return router;
  }
  public changeEmailUser(){
    router.put("/changeEmailUser/:id", dataChange.UpdateEmailUser);
    return router;
  }

  public changePassUser(){
    router.put("/changePassUser/:id", dataChange.UpdatePassUser); 
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
    router.post("/registerUser", this.RegisterUsuario);
    return router;
  }
  public getDataAdmin() {
    router.get("/getDataAdmin", this.getAdminData);
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
    return router.get("/getUsersData/:idToken", this.getUsersAdminData);
  }
  public UsersDelete() {
    return router.post("/deleteUser", this.deleteAllUsers);
  }
  public GetCountUsers() {
    return router.get("/countUsers/:idToken", this.CountUsersAll);
  }

  public GetModuleUsers() {
    return router.get("/getModuleUsers/:id", this.getModuleUsers);
  }

  public GetPermisions() {
    return router.get("/getPermisions/:idModule", this.getPermisions);
  }

  public UpdateAdmin() {
    return router.post("/updateAdmin", this.updateAdmin);
  }

  public DeleteModuleUser() {
    return router.post("/deleteModuleUser", this.deleteModule);
  }

  public SetModuleUsers() {
    return router.post("/setModule", this.setModule);
  }

  public SetPermisionModule() {
    return router.post(
      "/setPermisionModule/:idModule",
      this.setPermisionModule
    );
  }

  public DeletePermisionModule() {
    return router.post(
      "/deletePermisionModule/:idModule",
      this.deletePermisionModule
    );
  }

  public GetMod() {
    return router.get("/getMod/:id", this.getMod);
  }

  public getAdminDataALL() {
    return router.get("/getAdminAll/:id", this.getAdminAll);
  }
  public UpdateAdminALL() {
    return router.put("/updateAdminALL", this.UpdateAdminAll);
  }
  public uploadImageAdmin() {
    return router.put(
      "/AuploadImageA",
      fileUpload({
        useTempFiles: true,
        tempFileDir: "./uploads",
      }),
      this.uploadImageA
    );
  }
  public ServiseUser() {
    return router.get("/serviceId/:id", this.GetServiceUser);
  }
}

export default RouterUser;
