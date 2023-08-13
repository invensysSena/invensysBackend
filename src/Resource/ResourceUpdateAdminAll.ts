import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import moment from "moment-with-locales-es6";
import Todo from "../class/Notification.Todo";
import { QueryError, RowDataPacket } from "mysql2";
class ResourceUpdateAdminAll 
{
    public async UpdateAdminAll(req: Request | any,res: Response,next: Partial<NextFunction>){
        try {
          let responsable = req.users.email;
          const verifyToken: Array<any> | any = jwt.verify(
            req.headers.authorization,
            SECRET
          )!;
          console.log(verifyToken);
    
          const { id } = verifyToken;
          console.log(id);
    
          if (id) {
            const conn: any = await conexion.connect();
            conn.query(
              `CALL ADMIN_UPDATE_DATA('${id}','${req.body.data.name}','${parseInt(
                req.body.data.document
              )}','${parseInt(req.body.data.telefono)}','${
                req.body.data.empresa
              }')`,
              async (error: QueryError, rows: RowDataPacket) => {
                console.log(rows, error);
    
                if (rows) {
                  conn.query(
                    `CALL ADMIN_SELECT('${id}')`,
                    async (error: QueryError, rows: RowDataPacket) => {
                      await new Todo().createNotificationClass(
                        `Tus datos se actualizaron correctamente`,
                        "se mantendra la misma contraseña",responsable,
                        "users",
                        `${id}`
                      );
                      return res
                        .status(200)
                        .json({ message: "UPDATE_ADMIN_ALL", data: rows[0] });
                    }
                  );
                } else {
                  return res.status(400).json({ message: "ERROR_DATA" });
                }
              }
            );
          } else {
            return res.status(400).json({ message: "ERROR_TOKEN" });
          }
        } catch (error) {
          return res.status(400).json({ message: "ERROR_TOKEN" });
        }
      }
}

export const resourceUpdateAdminAll = new ResourceUpdateAdminAll();