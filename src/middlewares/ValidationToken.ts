import { Request, Response, NextFunction, request } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import { Logger } from "../utils/Logger";
export class ValidationTokenAndCreateToken {

  public verifyToken(req: any, res: Response, next: NextFunction) {
    console.log(req.headers)
    
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "Access Denied" });
    try {
      const verified = jwt.verify(token, SECRET);
      req.user = verified!;
      next();
    } catch (error) {
      res.status(400).json({ error: "Invalid Token" });
    }
  }

  public async verifyTokenAndAdmin(req: Request | any,res: Response,next: NextFunction) {

    Logger().debug(req.headers);
    try {
      const Tokenid_U: string   = req.headers.authorization;
      const verifyToken:any = jwt.verify(Tokenid_U, SECRET)!;
      const tokeIdUser = verifyToken.id;

      if (!tokeIdUser) {
        return res.status(400).json({
          ok: false,
          message: "NOT TOKEN ACCESS DENIED",
        });
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


  public async createTokenAdmin(req:Request|any,id: string, email: string) {
    try {
      const token = jwt.sign({ id, email }, SECRET, {
        expiresIn: "24h"
      });
      req.user = token;
      return token;
    } catch (error) {
      
      return error;
    }
  }
  public async createTokenUser(_req:Request|any,id1: string, email: string) {
    try {
      const token = jwt.sign({ id1, email }, SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      return token;
    } catch (error) {
      return error;
    }
  }
}


