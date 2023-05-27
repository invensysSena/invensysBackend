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
import ComprasFvModule from "../interfaces/Compras.Salidas";
import TranslateSubPModel from "../interfaces/TranslateSubP.Model";
TranslateSubPModel;

class AllModules {
  public async getModules(
    req: Request | any,
    res: Response | any,
    next: NextFunction
  ): Promise<Request | Response | any> {
    try {
      const Token: string = req.params?.id!;

      const veryfyToken: Array<any> | any = jwt.verify(Token, SECRET)!;
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
          tokeIdUser: tokenIdUser,
        });
        const dataProvider = await ProviderSchema.find({
          tokenIdUser: tokenIdUser,
        });
        const dataInventary = await InventorySchema.find({
          tokeIdUser: tokenIdUser,
        });
        const dataPedidos = await PedidosSchema.find({
          tokeIdUser: tokenIdUser,
        });
        const dataSubProduct = await SubProductosModel.find({
          tokenIdUser: tokenIdUser,
        });
        const dataNotify = await NotificationSchema.find({
          tokeIdUser: tokenIdUser,
        });
        const dataCompras = await Compras.find({ tokeIdUser: tokenIdUser });
        const dataCompany = await modelCompany.find({
          tokenIdUser: tokenIdUser,
        });
        const dataPedidoProvedor = await PedidosProvedor.find({
          tokeIdUser: tokenIdUser,
        });

        const dataIGeneral = await InventaryGeneral.find({
          tokenIdUser: tokenIdUser,
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
          dataIGeneral,
        });
      }
    } catch (error) {
      return res.status(500).json({ error, message: "ERROR_SERVER" });
    }
  }
}

export default AllModules;
