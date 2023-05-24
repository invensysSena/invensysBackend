import { Request, Response, NextFunction } from "express";
import SchemaPedidos from "../models/modelPedidos";
import PedidoProvider from "../models/PedidosProvedor";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import PedidosValiadation from "../class/Pedidos.model";
abstract class ManagePedidos {
  public async postPedidos(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const tokenAccesId: any = req.headers["authorization"];
      const verifyToken: any = jwt.verify(tokenAccesId, SECRET);
      const idTokenAdmin = verifyToken.id;

     
      
      await new PedidosValiadation().setProperties(req.body.data , idTokenAdmin);
      const responseClass = null 
     res.status(200).json({message:"sucess", responseClass})
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
      const tokenAccesId: any = req.headers["authorization"];
      const verifyToken: any = jwt.verify(tokenAccesId, SECRET);
      const idTokenAdmin = verifyToken.id;
      const pedidos = await SchemaPedidos.find({tokeIdUser:idTokenAdmin});
      const pedidosproveedor = await PedidoProvider.find({tokeIdUser:idTokenAdmin});
      return res.status(200).json({ message: "PEDIDOS_FOUND", pedidos,pedidosproveedor });
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
