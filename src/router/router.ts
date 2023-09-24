import { Router } from "express";
import LoginRegister from "../controllers/GestionUser";
import LicenceSofteareInvensys from "../controllers/GestionLicence";
import fileUpload from "express-fileupload";
const router: Router = Router();
import path from "path";
import ChangeDataController from "../controllers/ChangeData";
import passport from "passport";
const changeData = new ChangeDataController();
const licence = new LicenceSofteareInvensys();
let AuthPassport = passport.authenticate("jwt",{session: false});
class RouterUser extends LoginRegister {
  public updateAdminPass() {
    return router.put("/updateAdminPass",AuthPassport, changeData.UpdatePassAdmin);
  }
  public updatePassUser() {
    return router.put("/updatePassUser/:id",AuthPassport,changeData.UpdatePassUser);
  }
  public updateEmailUser() {
    return router.put("/updateEmailUser/:id",AuthPassport,changeData.UpdateEmailUser);
   
  }
  public licenceRouter() {
   return router.post("/createLicence/:id",AuthPassport,licence.createLicence);
  }
  public getLicence() {
    return router.get("/getLicence/:id",AuthPassport,licence.getLicence);
  }
  public Login() {
   return router.post("/login", this.LoginAuth);
  }
  public registerAdmin() {
    return router.post("/register", this.AdminRegister);
  }
  public registerUser() {
   return router.post("/registerUser",AuthPassport,this.RegisterUsuario);
  }
  // public getDataAdmin() {
  //   router.get("/getDataAdmin", AuthPassport, this.getAdminData);
  //   return router;
  // }

  public recoveryPass() {
    return router.post("/recovery", this.recoveryPassword);
  }
  public veryfiCod() {
   return router.post("/recoverycode", this.veryfidCode);
  }
  public newPassword() {
    return router.post("/newPass", this.newPassAdmin);
  }
  public authGoogle() {
    return router.post("/authgoogleAccount", this.passpAuthGoogle);
  }
  public prueba() {
    return router.post("/prueba",(req,res)=>{
   
      res.send("hola")
    });
  }
  public uploadCsvUsers() {
    return router.post("/uploadcsvUsers",fileUpload({
        useTempFiles: true,
        tempFileDir: path.join(__dirname, "/uploadcsv"),
      }),
      this.uploadusersCsv
    );
  }
  public getUsersAdmin() {
    return router.get("/getUsersData",AuthPassport,this.getUsersAdminData);
  }
  public UsersDelete() {
    return router.post("/deleteUser",AuthPassport,this.deleteAllUsers);
  }
  public typePermissionsModule() {
    return router.post("/typePermissionsModulesUser",AuthPassport,this.modulePermissions);
  }
  public GetCountUsers() {
    return router.get("/countUsers/:idToken",AuthPassport,this.CountUsersAll);
  }
  public GetModuleUsers() {
    return router.get("/getModuleUsers",AuthPassport,this.getModuleUsers);
  }
  public GetPermisions() {
    return router.get("/getPermisions",AuthPassport,this.getPermisions);
  }
  public UpdateAdmin() {
    return router.post("/updateAdmin",AuthPassport,this.updateAdmin);
  }
  public DeleteModuleUser() {
    return router.post("/deleteModuleUser",AuthPassport,this.deleteModule);
  }
  public SetModuleUsers() {
    return router.post("/setModule", AuthPassport, this.setModule);
  }
  public SetPermisionModule() {
    return router.post("/setPermisionModule/:idModule",AuthPassport,this.setPermisionModule);
  }

  public DeletePermisionModule() {
    return router.post("/deletePermisionModule/:idModule",AuthPassport,this.deletePermisionModule);
  }

  public GetMod() {
    return router.get("/getMod/:id", this.getMod);
  }

  public getAdminDataALL() {
    return router.get("/getAdminAll/",AuthPassport,this.getAdminAll);
  }
  public UpdateAdminALL() {
    return router.put("/updateAdminALL",AuthPassport,this.UpdateAdminAll);
  }
  public uploadImageAdmin() {
    return router.put("/AuploadImageA",AuthPassport,fileUpload({
        useTempFiles: true,
        tempFileDir: "./uploads",
      }),
      this.uploadImageA
    );
  }
  public ServiseUser() {
    return router.get("/serviceId/:id",AuthPassport,this.GetServiceUser);
  }
}

export default RouterUser;
