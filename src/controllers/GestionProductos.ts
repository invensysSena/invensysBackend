import { Product } from "./../interfaces/product";
import { Request, Response, NextFunction } from "express";
import ProductSchema from "../models/modelProduct";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import Todo from "../class/Notification.Todo";
abstract class ManageProducts {
  public async postProducts(req: Request, res: Response) {
    try {
      const {
        iva,
        name,
        category,
        price,
        priceBuy,
        fechaInicio,
        description,
        fechaFin,
      } = req.body.data;

      const tokenCreate: string = req.headers.authorization as string;
      const verifyToken: Array<any> | any = jwt.verify(tokenCreate, SECRET)!;
      const tokenIdUser = verifyToken.id;

      if (!tokenIdUser) {
        return res
          .status(400)
          .json({ ok: false, message: "No existe el token" });
      } else {
        const product: Product = new ProductSchema({
          iva,
          name,
          tokenIdUser,
          category,
          price,
          priceBuy,
          fechaInicio,
          description,
          fechaFin,
        });
        const produ = await product.save();
        await new Todo().createNotificationClass(
          "Se creo un nuevo  producto",
          name,
          "product",
          tokenIdUser
        );
        return res
          .status(200)
          .json({
            ok: true,
            message: "Producto creado correctamente",
            data: produ,
          });
      }
    } catch (error) {
 
      return res
        .status(500)
        .json({ ok: false, message: "Error en el servidor" });
    }
  }

  public async getProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const tokenCreate: string = req.params._id;

      const verifyToken: Array<any> | any = jwt.verify(tokenCreate, SECRET)!;
      const tokenIdUser = verifyToken.id;

      if (!tokenIdUser) {
        return res
          .status(400)
          .json({ ok: false, message: "No existe el token" });
      }

      const products: Product[] = await ProductSchema.find({
        tokenIdUser,
      });

      return res.status(200).json({ ok: true, products });
    } catch (error) {
      return res.status(500).json({ ok: false, message: error });
    }
  }
  public async getProductsId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const tokenCreate: string = req.headers.authorization as string;
      const verifyToken: Array<any> | any = jwt.verify(tokenCreate, SECRET)!;
      const tokenIdUser = verifyToken.id;

      if (!tokenIdUser) {
        return res
          .status(400)
          .json({ ok: false, message: "No existe el token" });
      }

      const product = await ProductSchema.findById(req.params.id);
    
      return res.status(200).json({ ok: true, data: product });
    } catch (error) {
      
      return res
        .status(500)
        .json({ ok: false, message: "Error en el servidor" });
    }
  }

  public async getProductsIdCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request> {
    try {
      const tokenCreate: string = req.headers.authorization as string;
      const verifyToken: Array<any> | any = jwt.verify(tokenCreate, SECRET)!;
      const tokenIdUser = verifyToken.id;

      if (!tokenIdUser) {
        return res
          .status(400)
          .json({ ok: false, message: "No existe el token" });
      }
      const idCategory = req.params.idCategory;
      const product = await ProductSchema.find({ idCategory }, { tokenIdUser });
      
      return res.status(200).json({ ok: true, product });
    } catch (error) {

      return res
        .status(500)
        .json({ ok: false, message: "Error en el servidor" });
    }
  }

  public async putProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {


    try {
      const tokenCreate: string = req.headers.authorization as string;
      const verifyToken: Array<any> | any = jwt.verify(tokenCreate, SECRET)!;
      const tokenIdUser = verifyToken.id;

      if (!tokenIdUser) {
        return res
          .status(400)
          .json({ ok: false, message: "No existe el token" });
      }

      const product = await ProductSchema.findByIdAndUpdate(
        req.params.id,
        req.body.data,
        {
          new: true,
        }
      );
  

      return res
        .status(200)
        .json({ ok: true, message: "Product Update", product });
    } catch (error) {
   
      return res
        .status(500)
        .json({ ok: false, message: "Error en el servidor" });
    }
  }

  public async deleteProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const tokenCreate: string = req.headers.authorization as string;
      const verifyToken: Array<any> | any = jwt.verify(tokenCreate, SECRET)!;
      const tokenIdUser = verifyToken.id;

      if (!tokenIdUser) {
        return res
          .status(400)
          .json({ ok: false, message: "No existe el token" });
      }
      const product = await ProductSchema.findByIdAndDelete(req.params.id, {
        tokenIdUser,
      });
      await new Todo().createNotificationClass(
        "Se Elimino el producto con exito",
        "Se elimino el producto",
        "product",
        tokenIdUser
      );
      return res
        .status(200)
        .json({ ok: true, message: "Product Delete", product });
    } catch (error) {
     
      return res
        .status(500)
        .json({ ok: false, message: "Error en el servidor" });
    }
  }
}

export default ManageProducts;
