import { Request, Response, NextFunction, request } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import { Logger } from "../utils/Logger";
export class ValidationTokenAndCreateToken {

  public async verifyTokenAndAdmin(req: Request | any,res: Response,next: NextFunction) {

    Logger().debug(req.headers);
    try {
      const Tokenid_U: string   = req.headers.authorization;
      const verifyToken:any = jwt.verify(Tokenid_U, SECRET)!;
      const tokeIdUser = verifyToken.id;

      if (!tokeIdUser) {
        return res.status(402).json({ ok: false,message: "NOT TOKEN ACCESS DENIED", });
      } else {
        req.user = verifyToken;
        next();
      }
    } catch (error) {
      Logger().error({message:error});
      return res.status(500).json({
        ok: false,
        message: "ERROR TOKEN ACCESS DENIED",
        error,
      });
    }
  }


  public async createTokenAdmin(req:Request|any,idUser=null,id: string, email: string) {
    try {
      const token = jwt.sign({idUser, id, email }, SECRET, {expiresIn: "24h"});
      req.user = token;
      console.log(idUser,id,email)
      return token;
    } catch (error) {
      
      return error;
    }
  }
//   public async createTokenUser(_req:Request|any,id1: string, email: string) {
//     try {
//       const token = jwt.sign({ id1, email }, SECRET, {
//         expiresIn: 60 * 60 * 24,
//       });
//       return token;
//     } catch (error) {
//       return error;
//     }
//   }
}


