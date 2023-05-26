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
import InventaryGeneral from "../models/InventaryGeneral";
import ComprasFvModule  from '../interfaces/Compras.Salidas';
import TranslateSubPModel from "../interfaces/TranslateSubP.Model";
TranslateSubPModel

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
        const products = await ProductSchema.find({
          tokenIdUser: tokenIdUser,
        });
        const catagories = await CategorySchema.find({
          tokenIdUser: tokenIdUser,
        });
        const providers = await ProviderSchema.find({
          tokenIdUser: tokenIdUser,
        });
        const bodegas = await InventorySchema.find({
          tokenIdUser: tokenIdUser,
        });
        const pedidos = await PedidosSchema.find({
          tokenIdUser: tokenIdUser,
        });
        const subProducts = await SubProductosModel.find({
          tokenIdUser: tokenIdUser,
        });
        const translateSubps = await TranslateSubPModel.find({
          tokenIdUser: tokenIdUser,
        });
        const notifications = await NotificationSchema.find({
          tokenIdUser: tokenIdUser,
        });
        const compras = await Compras.find({ tokenIdUser: tokenIdUser });
        const comprasNFS = await ComprasFvModule.find({ tokeIdUser: tokenIdUser });
        const companies = await modelCompany.find({
          tokenIdUser: tokenIdUser,
        });
        const pedidoProviders = await PedidosProvedor.find({
          idTokenAdmin: tokenIdUser,
        });

        const inventaryGeneral = await InventaryGeneral.find(
          { idTokenAdmin: tokenIdUser },
        );

        return res.status(200).json({
          ok: true,
          products,
          catagories,
          providers,
          bodegas,
          pedidos,
          subProducts,
          translateSubps,
          notifications,
          compras,
          comprasNFS,
          companies,
          pedidoProviders,
          inventaryGeneral,
        });
      }
    } catch (error) {
      return res.status(500).json({ error, message: "ERROR_SERVER" });
    }
  }
}

export default AllModules;
