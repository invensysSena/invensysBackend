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
import { queryData } from "../secure/DbQuery";
import settings from "../data/settings.json";
let app_settings = settings[0]
// es la creacion de la bodega


 /**
 * Actualiza el correo de la bodega en el inventario.
 * @param req - El objeto Request de Express.
 * @param res - El objeto Response de Express.
 * @param next - La función NextFunction de Express.
 * @returns Una respuesta HTTP con el resultado de la actualización o un mensaje de error.
 */
class InventoryProduct {
  public async postInventory(req: Request|any, res: Response, _next: NextFunction) {
    try {
      const { name_inventory, description } = req.body;
    
      let tokeIdUser = req.user.id;
      let responsable = req.user.email;
      if (req.user.rol === "administrador") {
        await queryData.queryGet(app_settings.METHOD.GET,app_settings.schema,app_settings.TABLES.ADMIN,
          Object.keys({idadmin:req.user.id}),Object.values({idadmin:req.user.id}),["WHERE"],[],req)
        .then(async (response:any)=>{

          const inventory = new InventorySchema({
            tokeIdUser,name_inventory,description,estadoInventory: "activo",
            responsableInventory: req.user.email,type: "administrador",});

            const responseInventiry = await inventory.save();

            await new Todo().createNotificationClass(
            "Se creo una nueva bodega",
             name_inventory,responsable, "inventory", tokeIdUser);
             
              res.status(200).json({ message: "Inventory created", response: responseInventiry });
        }).catch((error:any)=>{
          return res.status(400).json({ message: "ERROR_GET_ADMIN_ALL", data:[],error});
        })
        
      } else if (req.user.rol === "user") {
      //   const token: any = req.headers["authorization1"];
      //   const decoded: any = jwt.verify(token, SECRET);
      //   const tokeIdUser1 = decoded.id1;
      //   let responsable = req.user.email;
      //   conn.query(
      //     "SELECT correo FROM account WHERE idAccount    = ? ",
      //     [tokeIdUser1],
      //     async (_err: any, rows: any, _fields: any) => {
      //       if (rows) {
      //         const inventory = new InventorySchema({
      //           tokeIdUser,name_inventory,
      //           description,estadoInventory: "Activo",responsableInventory: rows[0].correo,
      //           type: "Usuario",
      //         });
      //         const response = await inventory.save();
      //         await new Todo().createNotificationClass(
      //           "Se creo un nuevo inventario",
      //           name_inventory,
      //           responsable,
      //           "inventory",
      //           tokeIdUser
      //         );
      //         res.status(200).json({ message: "Inventory created", response });
      //       }
      //     }
      //   );
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

  public async putInventoryId(req: Request|any,res: Response,_next: NextFunction) {
    //actualizar inventario

    try {
      const parsedQuery = JSON.parse(req.query.q);
      const _id = parsedQuery.id;
      const response = await InventorySchema.findByIdAndUpdate({ _id },
        req.body,{ new: true });
        
      res.status(200).json({ message: "Inventory updated", response });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }
  public async deleteInventoryId(req: Request|any,res: Response,_next: NextFunction) {
   
    try {
      const parsedQuery = JSON.parse(req.query.q);
      const _id = parsedQuery.id;
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
        caducidad,idInventory,} = req.body;
      const subProduct = new subProductSchema({
        tokenIdUser: tokeIdUser,name,priceCompra,
        priceVenta,stockMinimo,stockMaximo,unidad,caducidad,idInventory,});
      const response = await subProduct.save();
      res.status(200).json({ message: "SubProduct created", response });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }
  public async GetSubProducta(req: Request|any, res: Response, next: NextFunction) {
    try {
      const parsedQuery = JSON.parse(req.query.q);
      const id = parsedQuery.id;
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
        req.body;

      const responseClass = await new TranslateBodega(
        tokeIdUser,idDestino,idOrigen,idSubProducto,cantidad,userCorreo).Initial();

      return res.status(200).json({ message: "get products", responseClass });
    } catch (error) {
      return res.status(500).json({ message: "Error in the server", error });
    }
  }

  public async GetTranslateProducts(req: Request|any,res: Response,_next: NextFunction) {
    try {
      const parsedQuery = JSON.parse(req.query.q);
      const id = parsedQuery.id;
      const response = await TranslateSubPSchema.find({ idDestino: id });
      res.status(200).json({ message: "get products", response });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }

  public async postTranslateProductsOrigen(req: Request|any,res: Response,_next: NextFunction
  ) {
    console.log(req.body);
    console.log(req.query)
    try {
      const parsedQuery = JSON.parse(req.query.q);
      const id = parsedQuery.id;
     

      const responseDataClass = new TranslateBodega(
        "","","","","",""
      ).TranslateProduct(id, req.body.type);
      res.status(200).json({ message: "get products", responseDataClass });
    } catch (error) {
      res.status(500).json({ message: "Error in the server", error });
    }
  }

  public async  updateCorreoBodega(req: Request, res: Response, _next: NextFunction): Promise<Response> {
    try {
      // Verificar si req.query.q es un arreglo y obtener el primer elemento si es así.
      const parsedQuery = typeof req.query.q === 'string' ? JSON.parse(req.query.q) : {};
      const id = parsedQuery.id;
      if (!id) {
        throw new Error("El parámetro 'id' no se encontró en la consulta.");
      }
  
      // Actualizar el correo de la bodega en el inventario.
      const responseEmailUpdate = await InventorySchema.findByIdAndUpdate({ _id: id },
        {
          responsableInventory: req.body.correo,
          type: "Usuario",
        },
        { new: true }
      );
      // Responder con un mensaje de éxito y la respuesta de la actualización.
      return res.status(200).json({ message: "Correo actualizado exitosamente", responseEmailUpdate });
    } catch (error) {
      // Manejar errores y responder con un mensaje de error.
      return res.status(500).json({ message: "Error en el servidor", error: error });
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
