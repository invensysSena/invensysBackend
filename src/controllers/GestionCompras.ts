import { Request, Response, NextFunction } from "express";
import comprasModelClass from "../class/comprasModelClass";
import ComprasSchema from "../models/Compras";
import ComprasFvModule from "../interfaces/Compras.Salidas";
import { Logger } from "../utils/Logger";
class ComprasClass {
  public async getCompras(req: Request|any, res: Response): Promise<any> {
    try {
      const response = await ComprasSchema.find({idCompra: req.params.id,});
      Logger().debug({message: `GET CATEGORY -> MONGOOSE body:${req.body} params:${req.params} query:${req.query}`})
      return res.status(200).json({ message: "OK_SUCESSFUL_COMPRA", response });
    } catch (error) {
      Logger().error({error: `ERROR GET CATEGORY -> MONGOOSE ERROR: ${error}`}) 
      return res
        .status(500)
        .json({ message: "Error en el servidor ok", error });
    }
  }
  public async getComprasFv(req: Request|any, res: Response): Promise<any> {
    try {
      let idToken = req.user.id;
      const responseFv: any = await ComprasFvModule.find({tokeIdUser: idToken});
      Logger().debug({message: `GET CATEGORY -> MONGOOSE body:${req.body} params:${req.params} query:${req.query}`})
      return res
        .status(200)
        .json({ message: "OK_SUCESSFUL_COMPRA", responseFv });
    } catch (error) {
      Logger().error({error: `ERROR GET CATEGORY -> MONGOOSE ERROR: ${error}`}) 
      return res
        .status(500)
        .json({ message: "Error en el servidor ok", error });
    }
  }
  public async postCompras(req: Request|any, res: Response): Promise<any> {
    try {
      let idToken = req.user.id;
      const response = new comprasModelClass().setProperties(req.body.data,idToken);
      Logger().debug({message: `POST CATEGORY -> MONGOOSE body:${req.body} params:${req.params} query:${req.query}`})
      return res.status(200).json({ message: "OK_SUCESSFUL_COMPRA", response });
    } catch (error) {
      Logger().error({error: `ERROR POST CATEGORY -> MONGOOSE ERROR: ${error}`}) 
      return res
        .status(500)
        .json({ message: "Error en el servidor ok", error });
    }
  }
  public async putCompras(req: Request, res: Response): Promise<any> {}

  public async deleteCompras(req: Request, res: Response): Promise<any> {}
}

export default ComprasClass;
