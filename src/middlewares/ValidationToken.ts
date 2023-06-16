import { Request, Response, NextFunction } from "express";
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

  public async verifyTokenAndAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const Tokenid_U: any = req.headers.authorization;
      const verifyToken: Array<any> | any = jwt.verify(Tokenid_U, SECRET)!;
      const tokeIdUser = verifyToken.id;

      if (!tokeIdUser) {
        return res.status(400).json({
          ok: false,
          message: "NOT TOKEN ACCESS DENIED",
        });
      } else {
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
}
