import { Request, Response, NextFunction } from "express";
import comprasModelClass from "../class/comprasModelClass";
import ComprasSchema from "../models/Compras";
import ComprasFvModule from "../interfaces/Compras.Salidas";
class ComprasClass {
  public async getCompras(req: Request|any, res: Response): Promise<any> {
    try {
      const response = await ComprasSchema.find({idCompra: req.params.id,});
      return res.status(200).json({ message: "OK_SUCESSFUL_COMPRA", response });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en el servidor ok", error });
    }
  }
  public async getComprasFv(req: Request|any, res: Response): Promise<any> {
    try {
      let idToken = req.user.id;
      const responseFv: any = await ComprasFvModule.find({tokeIdUser: idToken});
      return res
        .status(200)
        .json({ message: "OK_SUCESSFUL_COMPRA", responseFv });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en el servidor ok", error });
    }
  }
  public async postCompras(req: Request|any, res: Response): Promise<any> {
    try {
      let idToken = req.user.id;
      const response = new comprasModelClass().setProperties(req.body.data,idToken);
      return res.status(200).json({ message: "OK_SUCESSFUL_COMPRA", response });
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
