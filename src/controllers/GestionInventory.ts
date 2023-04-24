import { Request, Response, NextFunction } from "express";
import InventorySchema from "../models/modelInventario";
import TranslateSubPSchema from "../interfaces/TranslateSubP.Model";
import { category } from "../interfaces/CategoryI";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import Todo from "../class/Notification.Todo";
import subProductSchema from "../models/SubProductos.model";
import { conexion } from "../database/database";
import modelInventoryData from "../class/Inventory.model";
import TranslateBodega from "../class/TranlateBodega";
class InventoryProduct {
  public async postInventory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name_inventory, description } = req.body.data;
      const token: any = req.headers["authorization"];
      let typeUser: any = req.headers["typeautorization"];
      const decoded: any = jwt.verify(token, SECRET);
      const tokeIdUser = decoded.id;
      const conn = await conexion.connect();
      console.log(typeUser);

      if (typeUser === "superAdmin") {
        conn.query(
          "SELECT correo FROM admin WHERE idUsers = ? ",
          [tokeIdUser],
          async (err, rows: any, fields) => {
            if (rows) {
              const inventory = new InventorySchema({
                tokeIdUser,
                name_inventory,
                description,
                estadoInventory: "activo",
                responsableInventory: rows[0].correo,
                type: "Administrador",
              });
              const response = await inventory.save();
              await new Todo().createNotificationClass(
                "Se creo un nuevo inventario",
                name_inventory,
                "inventory",
                tokeIdUser
              );
              res.status(200).json({ message: "Inventory created", response });
            }
          }
        );
      } else if (typeUser === "user") {
        console.log(typeUser);
        const token: any = req.headers["authorization1"];

        const decoded: any = jwt.verify(token, SECRET);
        const tokeIdUser1 = decoded.id1;
        console.log(tokeIdUser);

        conn.query(
          "SELECT correo FROM account WHERE idAccount    = ? ",
          [tokeIdUser1],
          async (err, rows: any, fields) => {
            if (rows) {
              const inventory = new InventorySchema({
                tokeIdUser,
                name_inventory,
                description,
                estadoInventory: "Activo",
                responsableInventory: rows[0].correo,
                type: "Usuario",
              });
              const response = await inventory.save();
              await new Todo().createNotificationClass(
                "Se creo un nuevo inventario",
                name_inventory,
                "inventory",
                tokeIdUser
              );
              res.status(200).json({ message: "Inventory created", response });
            }
          }
        );
      }
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }

  public async getInventory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const decoded: any = jwt.verify(id, SECRET);
      const tokeIdUser = decoded.id;
      const response = await InventorySchema.find({
        tokeIdUser: tokeIdUser,
      });
      res.status(200).json({ message: "Inventory", response });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }

  public async putInventoryId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    //actualizar inventario
    console.log(req.body);

    try {
      const { _id } = req.params;
      const token: any = req.headers["authorization"];
      const decoded: any = jwt.verify(token, SECRET);
      const tokeIdUser = decoded.id;
      const { name_inventory, description } = req.body;
      const response = await InventorySchema.findByIdAndUpdate(
        { _id },
        req.body.data,
        { new: true }
      );
      res.status(200).json({ message: "Inventory updated", response });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }
  public async deleteInventoryId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { _id } = req.params;
      const token: any = req.headers["authorization"];
      const decoded: any = jwt.verify(token, SECRET);
      const tokeIdUser = decoded.id;

      const response = await InventorySchema.deleteOne({ _id });

      const response2 = await subProductSchema.deleteMany({
        idInventory: _id,
      });

      if (response2) {
        await new Todo().createNotificationClass(
          "se elimino los subproductos con exito",
          "Sucessfull",
          "inventory",
          tokeIdUser
        );
      }

      await new Todo().createNotificationClass(
        "se elimino el inventario con exito",
        "Sucessfull",
        "inventory",
        tokeIdUser
      );
      res.status(200).json({ message: "Inventory deleted", response });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }

  public async UploadInsertProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { _id } = req.params;
      const token: any = req.headers["authorization"];
      const decoded: any = jwt.verify(token, SECRET);
      const tokeIdUser = decoded.id;
      const {
        name,
        priceCompra,
        priceVenta,
        stockMinimo,
        stockMaximo,
        unidad,
        caducidad,
        idInventory,
      } = req.body.data;
      const subProduct = new subProductSchema({
        name,
        priceCompra,
        priceVenta,
        stockMinimo,
        stockMaximo,
        unidad,
        caducidad,
        idInventory,
      });
      const response = await subProduct.save();
      res.status(200).json({ message: "SubProduct created", response });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }
  public async GetSubProducta(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const token: any = req.headers["authorization"];
      const decoded: any = jwt.verify(token, SECRET);
      const tokeIdUser = decoded.id;
      const response = await subProductSchema.find({ idInventory: id });

      res.status(200).json({ message: "get products", response });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }

  public async TranslateProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token: any = req.headers["authorization"];
      const decoded: any = jwt.verify(token, SECRET);
      const tokeIdUser = decoded.id;
      const { idDestino, idOrigen, idSubProducto, cantidad, userCorreo } =
        req.body.data;
      console.log(req.body);

      const responseClass = new TranslateBodega(
        tokeIdUser,
        idDestino,
        idOrigen,
        idSubProducto,
        cantidad,
        userCorreo
      ).Initial();

      return res.status(200).json({ message: "get products", responseClass });
    } catch (error) {
      return res.status(500).json({ message: "Error in the server", error });
    }
  }

  public async GetTranslateProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const { id } = req.params;
      const token: any = req.headers["authorization"];
      const decoded: any = jwt.verify(token, SECRET);
      const tokeIdUser = decoded.id;
      const response = await TranslateSubPSchema.find({ idDestino: id });

      res.status(200).json({ message: "get products", response });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }

  public async postTranslateProductsOrigen(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const { id } = req.params;
      const token: any = req.headers["authorization"];
      const decoded: any = jwt.verify(token, SECRET);
      const tokeIdUser = decoded.id;
      const responseDataClass = new TranslateBodega(
        "",
        "",
        "",
        "",
        "",
        ""
      ).TranslateProduct(id, req.body.data);
      res.status(200).json({ message: "get products", responseDataClass });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }
}

export default InventoryProduct;
