import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import { QueryError, RowDataPacket } from "mysql2";

class ResourceGetPermisions
{
    public async getPermisions(req: Request,res: Response,_next: Partial<NextFunction>) {
        try {
          const verifyToken: Array<any> | any = jwt.verify(
            req.params.idModule,
            SECRET
          )!;
          const { id } = verifyToken;
          if (id) {
            const conn: any = await conexion.connect();
            conn.query(
              `CALL GET_PERMISIONS_MODULE_USER('${id}')`,
              (error: QueryError, rows: RowDataPacket) => {
                if (rows) {
                  return res
                    .status(200)
                    .json({ message: "GET_PERMISIONS_USER", data: rows[0] });
                } else {
                  return res
                    .status(400)
                    .json({ message: "ERROR_GET_PERMISIONS_USER" });
                }
              }
            );
          }
        } catch (error) {
          return res.status(400).json({ message: "ERROR_SESSION" });
        }
      }
}

export const resourceGetPermisions = new ResourceGetPermisions();