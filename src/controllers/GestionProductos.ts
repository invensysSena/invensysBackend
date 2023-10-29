import { Product } from "./../interfaces/product";
import { Request, Response, NextFunction } from "express";
import ProductSchema from "../models/modelProduct";
import Todo from "../class/Notification.Todo";
abstract class ManageProducts {
  public async postProducts(req: Request|any, res: Response) {
    try {
      const {iva,name,category,price,priceBuy,fechaInicio,description,fechaFin,} = req.body;
      let responsable = req.user.email;
      let tokenIdUser = req.user.id;
        const product: Product = new ProductSchema({
          iva,name,tokenIdUser,category,price,priceBuy,fechaInicio,description,fechaFin,
        });
        const produ = await product.save();
        await new Todo().createNotificationClass(
          "Se creo un nuevo  producto",
          name,responsable,
          "product",
          tokenIdUser
        );
        console.log("craete product")
        return res.status(200).json({ok: true,message: "Producto creado correctamente",
            data: produ,
          })
    } catch (error) {
      return res.status(500).json({ ok: false, message: "Error en el servidor" });
    }
  }

  public async getProducts(req: Request|any,res: Response,_next: NextFunction) {
    try {
      let tokenIdUser = req.user.id;
      const products: Product[] = await ProductSchema.find({
        tokenIdUser,
      });
      return res.status(200).json({ ok: true, products });
    } catch (error) {
      return res.status(500).json({ ok: false, message: error });
    }
  }
  public async getProductsId(req: Request|any,res: Response,_next: NextFunction) {
    try {
      const parsedQuery = JSON.parse(req.query.q);
      const _id = parsedQuery.id;
      const product = await ProductSchema.findById(_id);
      return res.status(200).json({ ok: true, data: product });
    } catch (error) {
      return res
        .status(500)
        .json({ ok: false, message: "Error en el servidor" });
    }
  }

  public async getProductsIdCategory(req: Request|any,res: Response,_next: NextFunction) {
    try {
      let tokenIdUser = req.user.id;
      const idCategory = req.params.idCategory;
      const product = await ProductSchema.find({ idCategory }, { tokenIdUser });
      return res.status(200).json({ ok: true, product });
    } catch (error) {
      return res.status(500).json({ ok: false, message: "Error en el servidor" });
    }
  }

  public async putProducts(req: Request|any,res: Response,_next: NextFunction) {
    try {
      const parsedQuery = JSON.parse(req.query.q);
      const _id = parsedQuery.id;
      const product = await ProductSchema.findByIdAndUpdate(
        _id,
        req.body,{new: true,});
      return res.status(200).json({ ok: true, message: "Product Update", product });
    } catch (error) {
      return res.status(500).json({ ok: false, message: "Error en el servidor" });
    }
  }

  public async deleteProducts(req: Request|any,res: Response,_next: NextFunction) {
    try {
      let tokenIdUser = req.user.id;
      let responsable = req.user.email;
      const product = await ProductSchema.findByIdAndDelete(req.params.id, {
        tokenIdUser,
      });
      await new Todo().createNotificationClass(
        "Se Elimino el producto con exito",
        "Se elimino el producto",responsable,
        "product",
        tokenIdUser
      );
      return res.status(200).json({ ok: true, message: "Product Delete", product });
    } catch (error) {
     
      return res
        .status(500)
        .json({ ok: false, message: "Error en el servidor" });
    }
  }
}

export default ManageProducts;
