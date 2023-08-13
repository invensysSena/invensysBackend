import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import { QueryError, RowDataPacket } from "mysql2";
 class ResourceDeleteModule
 {
    public async deleteModule(req: any,res: Response,_next: Partial<NextFunction>) {
        try {
          const verifyToken: Array<any> | any = jwt.verify(
            req.headers.authorization,
            SECRET
          )!;
          const { id } = verifyToken;
    
          if (id) {
            const conn: any = await conexion.connect();
            conn.query(
              `CALL DELETE_MODULE_USER('${req.body.id}')`,
              (error: QueryError, rows: RowDataPacket) => {
                if (rows) {
                  return res.status(200).json({ message: "DELETE_MODULE_USER" });
                } else {
                  return res
                    .status(400)
                    .json({ message: "ERROR_DELETE_MODULE_USER" });
                }
              }
            );
          }
        } catch (error) {
          return res.status(400).json({ message: "ERROR_SESSION" });
        }
      }
 }

 export const resourceDeleteModule = new ResourceDeleteModule();