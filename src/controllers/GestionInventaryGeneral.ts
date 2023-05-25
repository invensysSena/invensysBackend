import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import GerneralInventary from "../class/InventaryGeneral";
import { SECRET } from "../config/config";
import SubProductosModel from "../models/SubProductos.model";
abstract class MaganeIGeneral {
  public async postInventaryGeneral(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const idCreated: any = req.headers["authorization"];
      const typeUser: any = req.headers["typeuser"];
      const decoded: any = jwt.verify(idCreated, SECRET);
      const idTokenAdmin = decoded.id;

      await new GerneralInventary().setProperties(
        idTokenAdmin,
        typeUser,
        req.body
      );
      return res.status(200).json({ message: "sucess" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
    }
  }

  public async getInventaryGeneral(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const { id } = req.params;
      const dataSubProduct = await SubProductosModel.find({ idInventario: id });
      console.log(dataSubProduct);

      return res.status(200).json({ message: "sucess", dataSubProduct });
    } catch (error) {
      return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
    }
  }

  public putInventaryGeneral(req: any, res: any, next: any) {
    res.send("putInventaryGeneral");
  }

  public deleteInventaryGeneral(req: any, res: any, next: any) {
    res.send("deleteInventaryGeneral");
  }
}

export default MaganeIGeneral;
