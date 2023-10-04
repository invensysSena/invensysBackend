import { Request, Response, NextFunction } from "express";
import GerneralInventary from "../class/InventaryGeneral";
import SubProductosModel from "../models/SubProductos.model";
import { Logger } from "../utils/Logger";
abstract class MaganeIGeneral {
  public async postInventaryGeneral(req: Request|any,res: Response,_next: NextFunction) {
    try {
      const typeUser: any = req.headers["typeuser"];
      let idTokenAdmin = req.user.id;
      await new GerneralInventary().setProperties(idTokenAdmin,typeUser,req.body);
      Logger().debug({message: `POST CATEGORY -> MONGOOSE body:${req.body} params:${req.params} query:${req.query}`})
      return res.status(200).json({ message: "sucess" });
    } catch (error) {
      Logger().error({error: `ERROR POST CATEGORY -> MONGOOSE ERROR: ${error}`}) 
      return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
    }
  }

  public async getInventaryGeneral(req: Request,res: Response,_next: NextFunction) {  
    try {
      const { id } = req.params;
      const dataSubProduct = await SubProductosModel.find({ idInventario: id });
      Logger().debug({message: `GET CATEGORY -> MONGOOSE body:${req.body} params:${req.params} query:${req.query}`})
      return res.status(200).json({ message: "sucess", dataSubProduct });
    } catch (error) {
      Logger().error({error: `ERROR GET CATEGORY -> MONGOOSE ERROR: ${error}`}) 
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
