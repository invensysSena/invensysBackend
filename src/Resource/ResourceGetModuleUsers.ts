import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import { QueryError, RowDataPacket } from "mysql2";
class ResourceGetModuleUsers
{
    public async getModuleUsers(req: any,res: Response,_next: Partial<NextFunction>){
        try {
          const verifyToken: Array<any> | any = jwt.verify(
            req.headers.authorization,
            SECRET
          )!;
          const { id } = verifyToken;
          if (id) {
            const conn: any = await conexion.connect();
            conn.query(
              `CALL GET_MODULE_ACCOUNT_USER('${req.params.id}')`,
              (error: QueryError, rows: RowDataPacket) => {
                if (rows) {
                  return res
                    .status(200)
                    .json({ message: "GET_MODULE_USER", data: rows[0] });
                } else {
                  return res.status(400).json({ message: "ERROR_GET_MODULE_USER" });
                }
              }
            );
          }
        } catch (error) {
          res.send("error");
    
          return error;
        }
      }
}

export const resourceGetModuleUsers = new ResourceGetModuleUsers();