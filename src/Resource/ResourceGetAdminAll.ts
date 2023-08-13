import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import { QueryError, RowDataPacket } from "mysql2";


class ResourceGetAdminAll
{
    public async getAdminAll(req: Request | any,res: Response,_next: Partial<NextFunction>) {
        try {
          const verifyToken: Array<any> | any = jwt.verify(req.params.id, SECRET)!;
    
          const { id } = verifyToken;
          if (id) {
            const conn: any = await conexion.connect();
            conn.query(
              "select * from admin where idUsers = ?",
              [id],
              (error: QueryError, rows: RowDataPacket) => {
                if (rows) {
                  return res
                    .status(200)
                    .json({ message: "GET_ADMIN_ALL", data: rows });
                } else {
                  return res.status(400).json({ message: "ERROR_GET_ADMIN_ALL" });
                }
              }
            );
          }
        } catch (error) {
          return res.status(400).json({ message: "ERROR_TOKEN" });
        }
      }
}

export const resourceGetAdminAll = new ResourceGetAdminAll();