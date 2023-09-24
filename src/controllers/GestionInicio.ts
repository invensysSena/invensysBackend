import e, { Request, Response, NextFunction } from "express";
import ProductSchema from "../models/modelProduct";
import CategorySchema from "../models/CategoryM";
import ProviderSchema from "../models/modelProviders";
import InventorySchema from "../models/modelInventario";
import PedidosSchema from "../models/modelPedidos";
import NotificationSchema from "../models/modelNotfication";
import Compras from "../models/Compras";
import modelCompany from "../models/modelCompany";
import SubProductosModel from "../models/SubProductos.model";
import PedidosProvedor from "../models/PedidosProvedor";
import InventaryGeneral from "../models/InventaryGeneral";
import { Logger } from "../utils/Logger";

class AllModules {
  public async getModules(req: Request | any,res: Response,_next: NextFunction
  ): Promise<Request | Response | any> {
    try {
      let tokenIdUser = req.user.id;
        const dataProduct = await ProductSchema.find({tokenIdUser: tokenIdUser,});
        const dataCategory = await CategorySchema.find({tokeIdUser: tokenIdUser,});
        const dataProvider = await ProviderSchema.find({tokenIdUser: tokenIdUser,});
        const dataInventary = await InventorySchema.find({tokeIdUser: tokenIdUser,});
        const dataPedidos = await PedidosSchema.find({tokeIdUser: tokenIdUser,});
        const dataSubProduct = await SubProductosModel.find({tokenIdUser: tokenIdUser,});
        const dataNotify = await NotificationSchema.find({tokeIdUser: tokenIdUser,});
        const dataCompras = await Compras.find({ tokeIdUser: tokenIdUser });
        const dataCompany = await modelCompany.find({tokenIdUser: tokenIdUser,});
        const dataPedidoProvedor = await PedidosProvedor.find({tokeIdUser: tokenIdUser,});
        const dataIGeneral = await InventaryGeneral.find({tokenIdUser: tokenIdUser,});
        Logger().debug({ query:  "FIND ALL MODULE -> MONGOOSE"  });
        return res.status(200).json({
          ok: true,
          dataCategory,dataProduct,dataProvider,dataInventary,dataPedidos,dataSubProduct,
          dataNotify,dataCompras,dataCompany,dataPedidoProvedor,dataIGeneral,});
      
    } catch (error) {
      Logger().error({ query:  `ERROR -> MONGOOSE ${error}`  });
      return res.status(500).json({ error, message: "ERROR_SERVER" });
    }
  }
}

export default AllModules;
