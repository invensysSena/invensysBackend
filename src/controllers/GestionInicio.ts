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
    console.log("entro");
    
    try {
      const TokenCreate: string = req.params?.id!;
      const veryfyToken: Array<any> | any = jwt.verify(TokenCreate, SECRET)!;
      const tokenIdUser = veryfyToken.id;
      //console.log(tokenIdUser);

      if (!tokenIdUser) {
        return res.json({
          message: "El token no existe!",
        });
      } else { 
        const dataProduct = await ProductSchema.find({tokenIdUser: tokenIdUser });
        const dataCategory = await CategorySchema.find({ tokenIdUser: tokenIdUser});
        const dataProvider = await ProviderSchema.find({ tokenIdUser: tokenIdUser});
        const dataInventary = await InventorySchema.find({ tokenIdUser: tokenIdUser});
        const dataPedidos = await PedidosSchema.find({ tokenIdUser: tokenIdUser});
        const dataNotify = await NotificationSchema.find({ tokenIdUser: tokenIdUser});
        console.log(dataProduct);
        

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
