import { Request, Response, NextFunction, request } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";

export class ValidationTokenAndCreateToken {
  public verifyToken(req: any, res: Response, next: NextFunction) {
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

  public async verifyTokenAndAdmin(req: Request | any,res: Response,next: NextFunction
  ) {
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
        req.users = verifyToken;
        next();
      }
    } catch (error) {
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
        expiresIn: 60 * 60 * 24,
      });

      req.users = token;
      return token;
    } catch (error) {
      
      return error;
    }
  }

  public async createTokenUser(req:Request|any,id1: string, email: string) {
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


