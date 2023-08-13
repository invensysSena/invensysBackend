import { Request, Response, NextFunction } from "express";
import { resourceRegisterAdmin } from "../Resource/ResourceRegisterAdmin";
import { resourceLoginAll } from "../Resource/ResourceLoginAll";
import { resourceVerifyCode } from "../Resource/ResourceVerifyCode"; 
import { resourceRegisterUsuario } from "../Resource/ResourceRegisterUsuario";
import { resourcePassAuthGoogle } from "../Resource/ResourcePassAuthGoogle";
import { resourceNewPassword } from "../Resource/ResourceNewPasswordUser";
import { resourceRecoveryPassword } from "../Resource/ResourceRecoveryPassword";
import { resourceNewPassAdmin } from "../Resource/ResourceNewPassAdmin";
import { resourceUploadusersCsv } from "../Resource/ResourceUploadusersCsv";
import { resourceGetUsersAdminData } from "../Resource/ResourceGetUsersAdminData";
import { resourceDeleteAllUsers } from "../Resource/ResourceDeleteAllUsers";
import { resourceCountUsersAll } from "../Resource/ResourceCountUsersAll";
import { resourceGetModuleUsers } from "../Resource/ResourceGetModuleUsers";
import { resourceGetPermisions } from "../Resource/ResourceGetPermisions";
import { resourceUpdateAdmin } from "../Resource/ResourceUpdateAdmin";
import { resourceDeleteModule } from "../Resource/ResourceDeleteModule";
import { resourceSetModule } from "../Resource/ResourceSetModule";
import { resourceSetPermisionModule } from "../Resource/ResourceSetPermisionModule";
import { resourceDeletePermisionModule } from "../Resource/ResourceDeletePermisionModule";
import { resourceGetMod } from "../Resource/ResourceGetMod";
import { resourceGetAdminAll } from "../Resource/ResourceGetAdminAll";
import { resourceUploadImageA } from "../Resource/ResourceUploadImageA";
import { resourceUpdateAdminAll } from "../Resource/ResourceUpdateAdminAll";
import { resourceGetServiceUser } from "../Resource/ResourceGetServiceUser";
abstract class LoginRegister {
  public async veryfidCode(req: Request,res: Response,_next: Partial<NextFunction>) {
    try {
     return await resourceVerifyCode.veryfidCode(req,res,_next);
    } catch (error) {
      return res.status(500).json({ message: "ERROR_SERVER", error });
    }
  }
  public async AdminRegister(req: any,res: Response,_next: Partial<NextFunction>) {
    try {
      return await resourceRegisterAdmin.AdminRegister(req,res,_next);
    } catch (error: any) {
      return res.status(500).json({ message: "ERROR_SERVER_CONNECT", error });
    }
  }
  public async LoginAuth(req: Request|any,res: Response,_next: Partial<NextFunction>) {
    try {
      return await resourceLoginAll.LoginAuth(req,res,_next);
    } catch (error) {
      return res.status(500).json({ message: "ERROR_AUTH_ADMIN", error: error });
    }
  }
  public async passpAuthGoogle(req: Request,res: Response,_next: Partial<NextFunction>) {
    try {
      return await resourcePassAuthGoogle.passpAuthGoogle(req,res,_next);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "ERROR_AUTH_ADMIN", error: error });
    }
  }
  public async RegisterUsuario(req: Request|any,res: Response,_next: Partial<NextFunction>){
    try {
     return resourceRegisterUsuario.RegisterUsuario(req,res,_next);
    } catch (error) {
      res.status(400).send({ message: "NOT_AUTORIZED" });
    }
  }
  public async newPassUser(req: Request|any,res: Response,_next: Partial<NextFunction>) {
    try {
      return await resourceNewPassword.newPassUser(req,res,_next);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
  public async recoveryPassword(req: Request,res: Response,_next: Partial<NextFunction>) {
    try {
      return await resourceRecoveryPassword.recoveryPassword(req,res,_next);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
  public async newPassAdmin(req: Request,res: Response,_next: Partial<NextFunction>){
    try {
     return await resourceNewPassAdmin.newPassAdmin(req,res,_next);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
  public async uploadusersCsv(req: any,res: Response,_next: Partial<NextFunction>) {
    try {
      return await resourceUploadusersCsv.uploadusersCsv(req,res,_next);
     } catch (error) {
       return res.status(400).json({ error });
     }
  }
  public async getUsersAdminData(req: Request,res: Response,_next: Partial<NextFunction>) {
    try {
      return resourceGetUsersAdminData.getUsersAdminData(req,res,_next);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
  public async deleteAllUsers(req: Request|any,res: Response,_next: Partial<NextFunction>) {
    try {
      return await resourceDeleteAllUsers.deleteAllUsers(req,res,_next);
    } catch (error) {
      return res.status(400).json({ message: "ERROR_SESSION" });
    }
  }
  public async CountUsersAll(req: Request,res: Response,_next: Partial<NextFunction>) {
    try {
     return await resourceCountUsersAll.CountUsersAll(req,res,_next);
    } catch (error) {
      return res.status(400).json({ message: "ERROR_SESSION" });
    }
  }
  public async getModuleUsers(req: any,res: Response,_next: Partial<NextFunction>){
    try {
    return await resourceGetModuleUsers.getModuleUsers(req,res,_next);
    } catch (error) {
      res.send("error");

      return error;
    }
  }
  public async getPermisions(req: Request,res: Response,_next: Partial<NextFunction>) {
    try {
     return await resourceGetPermisions.getPermisions(req,res,_next);
    } catch (error) {
      return res.status(400).json({ message: "ERROR_SESSION" });
    }
  }
  public async updateAdmin(req: Request,res: Response,_next: Partial<NextFunction>) {
    try {
     return await resourceUpdateAdmin.updateAdmin(req,res,_next);
    } catch (error) {
      return res.status(400).json({ message: "ERROR_SESSION" });
    }
  }
  public async deleteModule(req: any,res: Response,_next: Partial<NextFunction>) {
    try {
     return await resourceDeleteModule.deleteModule(req,res,_next);
    } catch (error) {
      return res.status(400).json({ message: "ERROR_SESSION" });
    }
  }
  public async setModule(req: any,res: Response,_next: Partial<NextFunction>) {
    try {
      return await resourceSetModule.setModule(req,res,_next);
    } catch (error) {
      return res.status(400).json({ message: "ERROR_SESSION" });
    }
  }
  public async setPermisionModule(req: Request | any,res: Response,_next: Partial<NextFunction>) {
    try {
      return await resourceSetPermisionModule.setPermisionModule(req,res,_next);
    } catch (error) {
      return res.status(400).json({ message: "ERROR_SESSION" });
    }
  }
  public async deletePermisionModule(req: Request | any,res: Response,_next: Partial<NextFunction>){
    try {
      return await resourceDeletePermisionModule.deletePermisionModule(req,res,_next);
    } catch (error) {
      return res.status(400).json({ message: "ERROR_SESSION" });
    }
  }
  public async getMod(req: Request | any,res: Response,_next: Partial<NextFunction>) {
    try {
      return await resourceGetMod.getMod(req,res,_next);
    } catch (error) {
      return res.status(400).json({ message: "ERROR_GET_MODULES_USER" });
    }
  }
  public async getAdminAll(req: Request | any,res: Response,_next: Partial<NextFunction>) {
    try {
      return await resourceGetAdminAll.getAdminAll(req,res,_next);
    } catch (error) {
      return res.status(400).json({ message: "ERROR_TOKEN" });
    }
  }
  public async uploadImageA(req: Request | any,res: Response,_next: Partial<NextFunction>) {
    try {
     return await resourceUploadImageA.uploadImageA(req,res,_next);
    } catch (error) {
      return res.status(400).json({ message: "ERROR_TOKEN", error });
    }
  }
  public async UpdateAdminAll(req: Request | any,res: Response,next: Partial<NextFunction>){
    try {
      
      return await resourceUpdateAdminAll.UpdateAdminAll(req,res,next);
    } catch (error) {
      return res.status(400).json({ message: "ERROR_TOKEN" });
    }
  }
  public async GetServiceUser(req: Request | any,res: Response,_next: Partial<NextFunction>) {
    try {
      return await resourceGetServiceUser.GetServiceUser(req,res,_next);
    } catch (error) {
      return res.status(400).json({ message: "ERROR_TOKEN" });
    }
  }
}
export default LoginRegister;
