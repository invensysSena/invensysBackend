import { Request, Response, NextFunction } from "express";
import ProductSchema from "../models/modelProduct";
import CategorySchema from "../models/CategoryM";
import ProviderSchema from "../models/modelProviders";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import InventorySchema from "../models/modelInventario";
import PedidosSchema from "../models/modelPedidos";
import NotificationSchema from "../models/modelNotfication";
import Compras from "../models/Compras";
import modelCompany from "../models/modelCompany";
import SubProductosModel from "../models/SubProductos.model";
import PedidosProvedor from "../models/PedidosProvedor";
class AllModules {
  public async getModules(
    req: Request | any,
    res: Response | any,
    next: NextFunction
  ): Promise<Request | Response | any> {
    try {
      const TokenCreate: string = req.params?.id!;
      const veryfyToken: Array<any> | any = jwt.verify(TokenCreate, SECRET)!;
      const tokenIdUser = veryfyToken.id;

      if (!tokenIdUser) {
        return res.json({
          message: "El token no existe!",
        });
      } else {
        const dataProduct = await ProductSchema.find({
          tokenIdUser: tokenIdUser,
        });
        const dataCategory = await CategorySchema.find({
          tokenIdUser: tokenIdUser,
        });
        const dataProvider = await ProviderSchema.find({
          tokenIdUser: tokenIdUser,
        });
        const dataInventary = await InventorySchema.find({
          tokenIdUser: tokenIdUser,
        });
        const dataPedidos = await PedidosSchema.find({
          tokenIdUser: tokenIdUser,
        });
        const dataSubProduct = await SubProductosModel.find({
          tokenIdUser: tokenIdUser,
        });
        const dataNotify = await NotificationSchema.find({
          tokenIdUser: tokenIdUser,
        });
        const dataCompras = await Compras.find({ tokenIdUser: tokenIdUser });
        const dataCompany = await modelCompany.find({
          tokenIdUser: tokenIdUser,
        });
        const dataPedidoProvedor = await PedidosProvedor.find({
          idTokenAdmin: tokenIdUser,
        });

        return res.status(200).json({
          ok: true,
          dataCategory,
          dataProduct,
          dataProvider,
          dataInventary,
          dataPedidos,
          dataSubProduct,
          dataNotify,
          dataCompras,
          dataCompany,
          dataPedidoProvedor,
        });
      }
    } catch (error) {
      return res.status(500).json({ error, message: "ERROR_SERVER" });
    }
  }
}

export default AllModules;
