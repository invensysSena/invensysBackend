import { Request, Response, NextFunction, json } from "express";
import ProductSchema from "../models/modelProduct";
import CategorySchema from "../models/CategoryM";
import ProviderSchema from "../models/modelProviders";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import InventorySchema from "../models/modelInventario";
import PedidosSchema from "../models/modelPedidos";
import NotificationSchema from "../models/modelNotfication";
class AllModules {
  public async getModules(
    req: Request | any,
    res: Response | any,
    next: NextFunction
  ): Promise<Request | Response | any> {
    try {
      const TokenCreate: string = req.headers["x-id-token"]!;
      const veryfyToken: Array<any> | any = jwt.verify(TokenCreate, SECRET)!;
      const tokenIdUser = veryfyToken.id;
      //console.log(tokenIdUser);

      if (!tokenIdUser) {
        return res.json({
          message: "El token no existe!",
        });
      } else {
        const dataProduct = await ProductSchema.find({ });
        const dataCategory = await CategorySchema.find({ });
        const dataProvider = await ProviderSchema.find({ });
        const dataInventary = await InventorySchema.find({ });
        const dataPedidos = await PedidosSchema.find({ });
        const dataNotify = await NotificationSchema.find({  });

        return res.status(200).json({
          ok: true,
          dataCategory,
          dataProduct,
          dataProvider,
          dataInventary,
          dataPedidos,
          dataNotify,
          
        });
      }
    
    } catch (error) {
      console.log(error);

      return res.status(500).json({ error, message: "ERROR_SERVER" });
    }
  }
}

export default AllModules;
