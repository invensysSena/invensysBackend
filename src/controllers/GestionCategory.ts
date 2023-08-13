import { Request, Response, NextFunction } from "express";
import CategorySchema from "../models/CategoryM";
import { category } from "../interfaces/CategoryI";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import Todo from "../class/Notification.Todo";
abstract class Categorys {
  public async createCategory(req: Partial<Request|any>,res: Response,_next: Partial<NextFunction>){
    try {
      const { name_category, description, imgURL, imgId } = req.body.data;
      let tokeIdUser = req.users.id;
      let responsable = req.users.email;
        const data: category = new CategorySchema({
          tokeIdUser,
          name_category,
          description,
          imgURL,
          imgId,
        });
        const dataCategory = await data.save();
        await new Todo().createNotificationClass("Se creo una nueva categoria",name_category,responsable,"category",tokeIdUser);
        
        return res.status(201).json({status: 201,message: "Categoria creada",data: dataCategory,});
    } catch (error) {

      return res.status(500).json({ok: false,message: "Error al crear la categoria",error});
    }
  }
  public async getCategory(req: Request|any,res: Response,_next: Partial<NextFunction>) {
    let tokeIdUser = req.users.id;
    try {
      const dataCategory = await CategorySchema.find({ tokeIdUser });
      return res.status(200).json({
        ok: true,
        message: "Categorias",
        data: dataCategory,
      });
    } catch (error) {
      return res.status(500).json({ok: false,message: "Error al obtener las categorias",error,});
    }
  }
  public async getCategoryId(req: Request,res: Response,_next: Partial<NextFunction>){
    try {
      const dataCategory = await CategorySchema.findById(req.params._id);
      return res.status(200).json({
        ok: true,
        message: "Categorias",
        data: dataCategory,
      });
    } catch (error) {
      return res.status(500).json({ok: false,message: "Error al obtener las categorias",error,
      });
    }
  }
  public async putCategory(req: Request,res: Response,_next: Partial<NextFunction>) {
    try {
        const ipdateCategory = await CategorySchema.findByIdAndUpdate(req.params._id,req.body.data,{new: true,});
        return res.status(200).json({
          ok: true,
          message: "update_category",
          data: ipdateCategory,
        });
      
    } catch (error) {
      return res.status(500).json({ok: false,message: "Error_category",error,});
    }
  }
  public async deleteCategory(req: Request|any,res: Response,_next: Partial<NextFunction>) {
    try {
      let tokeIdUser = req.users.id;
      let responsable = req.users.email;
      const dataCategory = await CategorySchema.findByIdAndDelete(
        req.params._id
      );
      await new Todo().createNotificationClass(
        "Eliminaste una categoria",
        "Se borro con exito",responsable,
        "category",
        tokeIdUser
      );
      return res.status(200).json({
        ok: true,
        message: "Delete category",
        data: dataCategory,
      });
    } catch (error) {
      return res.status(500).json({ok: false,message: "Error al eliminar  las categorias",error});
    }
  }
}

export default Categorys;
