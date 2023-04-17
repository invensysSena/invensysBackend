import { Request, Response, NextFunction } from "express";
import SchemaPedidos from "../models/modelPedidos";
import { IPedidos } from "../interfaces/pedidos";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";

abstract class ManagePedidos {
  public async postPedidos(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const tokenAccesId: any = req.headers["x-id-token"];
      const verifyToken: any = jwt.verify(tokenAccesId, SECRET);
      const idTokenAdmin = verifyToken.id;

      let [id_inventario, id_provedor, id_subproducto]   = [req.body.id_inventario, req.body.id_provedor, req.body.id_subproducto];

      const { company, cantidad, tipo, totalCompra } = req.body;
      const inventario = await SchemaPedidos.find({ id_inventario });
      if (inventario.length > 0){
           const provedor = await SchemaPedidos.find({ id_provedor });
        if(provedor.length > 0){
        res.status(404).json({ message: "PROVEDOR_NOT_FOUND" });
      }
         
      }
        // return res.status(404).json({ message: "INVENTARIO_NOT_FOUND" });

   

      const subproducto = await SchemaPedidos.find({
        id_inventario: id_subproducto,
      });
      if (subproducto.length > 0)
        return res.status(404).json({ message: "SUBPRODUCTO_NOT_FOUND" });

      if (!idTokenAdmin){
        return res.status(404).json({ message: "TOKEN_NOT_FOUND" });
      }else{
        const newPedidos: IPedidos = new SchemaPedidos({
          id_inventario,
          id_provedor,
          id_subproducto,
          company,
          cantidad,
          tipo,
          totalCompra,
          idTokenAdmin,
        });
        const pedidos = await newPedidos.save();
        return res.status(200).json({ message: "PEDIDOS_CREATED", pedidos });
      }
    } catch (error) {
      return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
    }
  }

  public async getPedidos(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const pedidos = await SchemaPedidos.find();
      return res.status(200).json({ message: "PEDIDOS_FOUND", pedidos });
    } catch (error) {
      return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
    }
  }

  public async getPedidosId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const { id } = req.params;
      const pedidos = await SchemaPedidos.findById(id);
      return res.status(200).json({ message: "PEDIDOS_FOUND", pedidos });
    } catch (error) {
      return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
    }
  }

  public async putPedidos(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const { id } = req.params;
      const {
        id_producto,
        id_provedor,
        id_inventario,
        company,
        cantidad,
        fecha,
      } = req.body;
      const pedidos = await SchemaPedidos.findByIdAndUpdate(
        id,
        {
          id_producto,
          id_provedor,
          id_inventario,
          company,
          cantidad,
          fecha,
        },
        { new: true }
      );
      return res.status(200).json({ message: "PEDIDOS_UPDATED", pedidos });
    } catch (error) {
      return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
    }
  }

  public async deletePedidos(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const { id } = req.params;
      const pedidos = await SchemaPedidos.findByIdAndDelete(id);
      return res.status(200).json({ message: "PEDIDOS_DELETED", pedidos });
    } catch (error) {
      return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
    }
  }
}

export default ManagePedidos;
