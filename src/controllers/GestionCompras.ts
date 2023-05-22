import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Todo from "../class/Notification.Todo";
import { SECRET } from "../config/config";
import comprasModelClass from "../class/comprasModelClass"
class ComprasClass  {
  public async getCompras(req: Request, res: Response): Promise<any> {}

  public async getComprasId(req: Request, res: Response): Promise<any> {}

  public async postCompras(req: Request, res: Response): Promise<any> {
   
    try {
      let idToken: any = req.headers.authorization;
      const verifyToken: any = jwt.verify(idToken, SECRET);
  
      
      const response = new comprasModelClass().setProperties(req.body.data,verifyToken.id)
      return res
      .status(200)
      .json({ message: "OK_SUCESSFUL_COMPRA",response });

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
