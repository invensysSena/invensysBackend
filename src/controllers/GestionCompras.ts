import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Todo from "../class/Notification.Todo";
import { SECRET } from "../config/config";
class ComprasClass {
  public async getCompras(req: Request, res: Response): Promise<any> {}

  public async getComprasId(req: Request, res: Response): Promise<any> {}

  public async postCompras(req: Request, res: Response): Promise<any> {
   
    try {
      let idToken: any = req.headers.authorization;
      const verifyToken: any = jwt.verify(idToken, SECRET);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en el servidor ok", error });
    }
  }

  public async putCompras(req: Request, res: Response): Promise<any> {}

  public async deleteCompras(req: Request, res: Response): Promise<any> {}
}

export default ComprasClass;
