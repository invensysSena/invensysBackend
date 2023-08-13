import { Request, Response, NextFunction } from "express";
import GerneralInventary from "../class/InventaryGeneral";
import SubProductosModel from "../models/SubProductos.model";
abstract class MaganeIGeneral {
  public async postInventaryGeneral(req: Request|any,res: Response,_next: NextFunction) {
    try {
      const typeUser: any = req.headers["typeuser"];
      let idTokenAdmin = req.users.id;
      await new GerneralInventary().setProperties(idTokenAdmin,typeUser,req.body);
      return res.status(200).json({ message: "sucess" });
    } catch (error) {
      return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
    }
  }

  public async getInventaryGeneral(req: Request,res: Response,_next: NextFunction) {
    try {
      const { id } = req.params;
      const dataSubProduct = await SubProductosModel.find({ idInventario: id });
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
