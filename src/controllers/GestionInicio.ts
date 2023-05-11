import { Request, Response, NextFunction, json } from "express";
import ProductSchema from "../models/modelProduct";
import CategorySchema from "../models/CategoryM";
import ProviderSchema from "../models/modelProviders";
import { Product } from "../interfaces/product";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import InventorySchema from "../models/modelInventario";
class AllModules {
  public async getModules(
    req: Request | any,
    res: Response | any,
    next: NextFunction
  ): Promise<Request | Response | any> {
    try {
      const TokenCreate: string = req.params.id!;
      const veryfyToken: Array<any> | any = jwt.verify(TokenCreate, SECRET)!;
      const tokenIdUser = veryfyToken.id;
      console.log(tokenIdUser);

      if (!tokenIdUser) {
        return res.json({
          message: "El token no existe!",
        });
      } else {
        const dataProduct = await ProductSchema.find({
          tokenIdUser,
        });
        const dataSumProduct = await ProductSchema.aggregate([])
          .match({ tokenIdUser })
          .group({ _id: null, total: { $sum: "$quantity" } });
        const dataCategory = await CategorySchema.find({ tokenIdUser });
        const dataProductCategory = await CategorySchema.distinct(
          "categories",
          (err: any, categorias: any) => {
            if (err) {
              console.error(err);
              return;
            }

            categorias.forEach(async (categoria: any) => {
              const productosCategory = await CategorySchema.find({
                categoria,
              });
            });
          }
        );

        const dataProvider = await ProviderSchema.find({ tokenIdUser });
        const dataInventary = await InventorySchema.aggregate([])
          .match({ tokenIdUser })
          .group({ _id: null, total: { $sum: "$quantity" } });

        return res.status(200).json({
          ok: true,
          dataCategory,
          dataProductCategory,
          dataProduct,
          dataProvider,
          dataSumProduct,
          dataInventary,
        });
      }
    } catch (error) {
      return res.status(500).json({ error, message: "ERROR_SERVER" });
    }
  }
}

export default AllModules;
