import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import moment from "moment-with-locales-es6";
import Todo from "../class/Notification.Todo";
import { QueryError, RowDataPacket } from "mysql2";
import { queryData } from "../secure/DbQuery";
import settings from "../data/settings.json";

let app_settings = settings[0]
class ResourceUpdateAdminAll 
{
    public async UpdateAdminAll(req: Request | any,res: Response,next: Partial<NextFunction>){
        try {
         
          let condition = Object.keys({idadmin:req.user.id,})
           await queryData.QueryUpdate(app_settings.METHOD.PUT,app_settings.schema,app_settings.TABLES.ADMIN,
          Object.keys({
            nameadmin:req.body.data.name,
            nombrenegocio:req.body.data.empresa,
            telefono:req.body.data.telefono,
            document:req.body.data.document,
          }),Object.values({
            nameadmin:req.body.data.name,
            nombrenegocio:req.body.data.empresa,
            telefono:parseInt(req.body.data.telefono),
            document:parseInt(req.body.data.document),
            idadmin:req.user.id,

          }),["WHERE"],condition,req)

          return res.status(200).json({ message: "UPDATE_DATA" });
         
        } catch (error) {
          console.log(error)
          return res.status(400).json({ message: "ERROR_DATA",error });
        }
      }
}

export const resourceUpdateAdminAll = new ResourceUpdateAdminAll();