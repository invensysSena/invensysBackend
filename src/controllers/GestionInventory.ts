import { Request, Response, NextFunction } from "express";
import InventorySchema from "../models/modelInventario";
import TranslateSubPSchema from "../interfaces/TranslateSubP.Model";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import Todo from "../class/Notification.Todo";
import subProductSchema from "../models/SubProductos.model";
import { conexion } from "../database/database";
import TranslateBodega from "../class/TranlateBodega";
import SubProductosModel from "../models/SubProductos.model";
import NotificationSchema from "../models/modelNotfication";
class InventoryProduct {
  public async postInventory(req: Request|any, res: Response, _next: NextFunction) {
    try {
      const { name_inventory, description } = req.body.data;
      let typeUser: any = req.headers["typeautorization"];
      let tokeIdUser = req.user.id;
      let responsable = req.user.email;
      const conn: any = await conexion.connect();
      if (typeUser === "administrador") {
        conn.query("SELECT correo FROM admin WHERE idUsers = ? ",[tokeIdUser],
          async (_err: any, rows: any, _fields: any) => {
            if (rows) {
              const inventory = new InventorySchema({
                tokeIdUser,name_inventory,description,estadoInventory: "activo",
                responsableInventory: rows[0].correo,type: "Administrador",});
              const response = await inventory.save();
              await new Todo().createNotificationClass(
                "Se creo una nueva bodega",
                name_inventory,
                responsable,
                "inventory",
                tokeIdUser
              );
              res.status(200).json({ message: "Inventory created", response });
            }
          }
        );
      } else if (typeUser === "user") {
        const token: any = req.headers["authorization1"];
        const decoded: any = jwt.verify(token, SECRET);
        const tokeIdUser1 = decoded.id1;
        let responsable = req.user.email;
        conn.query(
          "SELECT correo FROM account WHERE idAccount    = ? ",
          [tokeIdUser1],
          async (_err: any, rows: any, _fields: any) => {
            if (rows) {
              const inventory = new InventorySchema({
                tokeIdUser,name_inventory,
                description,estadoInventory: "Activo",responsableInventory: rows[0].correo,
                type: "Usuario",
              });
              const response = await inventory.save();
              await new Todo().createNotificationClass(
                "Se creo un nuevo inventario",
                name_inventory,
                responsable,
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

  public async getInventory(req: Request|any, res: Response, _next: NextFunction) {
    try {
      let tokeIdUser = req.user.id;
      const response = await InventorySchema.find({tokeIdUser: tokeIdUser,});
      res.status(200).json({ message: "Inventory", response });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }

  public async putInventoryId(req: Request,res: Response,_next: NextFunction) {
    //actualizar inventario

    try {
      const { _id } = req.params;
      const response = await InventorySchema.findByIdAndUpdate({ _id },
        req.body.data,{ new: true });
      res.status(200).json({ message: "Inventory updated", response });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }
  public async deleteInventoryId(req: Request|any,res: Response,_next: NextFunction) {
    try {
      const { _id } = req.params;
      let tokeIdUser = req.user.id;
      let responsable = req.user.email;
      const searchSubProduct = await subProductSchema.find({
        idInventory: _id,
      });
      if (searchSubProduct.length > 0) {
        await new Todo().createNotificationClass(
          "No se puede eliminar el inventario",
          "Error",
          "inventory",responsable,
          tokeIdUser
        );
        return res.status(400).json({
          message: "No se puede eliminar el inventario, tiene subproductos",
        });
      } else {
        const response = await InventorySchema.deleteOne({ _id });
        const response2 = await subProductSchema.deleteMany({idInventory: _id,});
        if (response2) {
          await new Todo().createNotificationClass(
            "se elimino los subproductos con exito",
            "Sucessfull",
            responsable,
            "inventory",
            tokeIdUser
          );
        }

        await new Todo().createNotificationClass(
          "se elimino el inventario con exito",
          "Sucessfull",responsable,
          "inventory",
          tokeIdUser
        );
        res.status(200).json({ message: "Inventory deleted", response });
      }
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }
  public async UploadInsertProducts(req: Request|any,res: Response,next: NextFunction) {
    try {
      let tokeIdUser = req.user.id;
      const {
        name,priceCompra,priceVenta,stockMinimo,stockMaximo,unidad,
        caducidad,idInventory,} = req.body.data;
      const subProduct = new subProductSchema({
        tokenIdUser: tokeIdUser,name,priceCompra,
        priceVenta,stockMinimo,stockMaximo,unidad,caducidad,idInventory,});
      const response = await subProduct.save();
      res.status(200).json({ message: "SubProduct created", response });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }
  public async GetSubProducta(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await subProductSchema.find({ idInventory: id });

      res.status(200).json({ message: "get products", response });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }

  public async TranslateProducts(req: Request|any,res: Response,_next: NextFunction) {
    try {
      let tokeIdUser = req.user.id;
      const { idDestino, idOrigen, idSubProducto, cantidad, userCorreo } =
        req.body.data;

      const responseClass = await new TranslateBodega(
        tokeIdUser,idDestino,idOrigen,idSubProducto,cantidad,userCorreo).Initial();

      return res.status(200).json({ message: "get products", responseClass });
    } catch (error) {
      return res.status(500).json({ message: "Error in the server", error });
    }
  }

  public async GetTranslateProducts(req: Request,res: Response,_next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await TranslateSubPSchema.find({ idDestino: id });
      res.status(200).json({ message: "get products", response });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }

  public async postTranslateProductsOrigen(req: Request,res: Response,_next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const responseDataClass = new TranslateBodega(
        "","","","","",""
      ).TranslateProduct(id, req.body.data);
      res.status(200).json({ message: "get products", responseDataClass });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }
  public async UpdateCorreoBodega(req: Request,res: Response,_next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const { id } = req.params;
      const responseEmailUpdate = await InventorySchema.findByIdAndUpdate(
        { _id: id },
        {responsableInventory: req.body.data,type: "Usuario",
        },{ new: true }
      );
      res.status(200).json({ message: "updateEmail", responseEmailUpdate });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }
  public async SubProductsIdAll(req: Request|any,res: Response,_next: NextFunction) {
    try {
      let tokeIdUser = req.user.id;
      const response = await subProductSchema.find({ idUser: tokeIdUser });
      res.status(200).json({ message: "get products", response });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }
  public async searchProductUnidadesDisminucon(req: Request|any,res: Response,_next: NextFunction) {
    try {
      let id = req.user.id;
      const dataSubProduct: any = await SubProductosModel.find({idInventario: id,});
      let responsable = req.user.email;
      const SerachProductWithUnidades: any = dataSubProduct.filter(
        async (element: any) => {
          if (element.unidad <= 10) {
            const searchNotificationDuplicate: any =
              await NotificationSchema.find({
                name: element.description,
              });
            if (searchNotificationDuplicate.length > 0) {
              const updateNotification: any =
                await NotificationSchema.findByIdAndUpdate(
                  { _id: searchNotificationDuplicate[0]._id || "" },
                  {
                    name: element.description,
                    description: `${element.name} tiene ${element.unidad} unidades bajas con un precio de ${element.priceVenta}`,
                    type: "unidadBaja",
                  }
                );

              if (searchNotificationDuplicate.length > 0) {
              } else {
                 await new Todo().createNotificationClass(
                  "Este producto esta por agotarse",
                  `${element.name} tiene ${element.unidad} unidades bajas con un precio de ${element.priceVenta}`,responsable,
                  "unidadBaja",
                  id
                );
              }
            } else {
               await new Todo().createNotificationClass(
                "Este producto esta por agotarse",
                `${element.name} tiene ${element.unidad} unidades bajas con un precio de ${element.priceVenta}`,responsable,
                "unidadBaja",
                id
              );
            }
          }
        }
      );

      return res
        .status(200)
        .json({ message: "sucess", SerachProductWithUnidades });
    } catch (error) {
      return res.status(500).json({ message: "INTERNAL_SERVER_ERROR", error });
    }
  }
}

export default InventoryProduct;
