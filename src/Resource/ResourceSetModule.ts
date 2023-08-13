import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import { QueryError, RowDataPacket } from "mysql2";

class ResourceSetModule
{
    public async setModule(req: any,res: Response,_next: Partial<NextFunction>) {
        try {
          const verifyToken: Array<any> | any = jwt.verify(
            req.headers?.authorization,
            SECRET
          )!;
          const { id } = verifyToken;
          if (id) {
            const conn: any = await conexion.connect();
            conn.query(
              `CALL INSERT_MODULE_USER('${req.body.data.module}','${req.body.data.module}','${req.body.data.idAccount}')`,
              (error: QueryError, rows: RowDataPacket) => {
                conn.query(
                  "SELECT IDmodulo, titulo FROM modulo WHERE titulo = ?",
                  [req.body.data.module],
                  (error: QueryError, row: RowDataPacket) => {
                    if (rows) {
                      return res
                        .status(200)
                        .json({ message: "SET_MODULE_USER", data: row });
                    } else {
                      return res
                        .status(400)
                        .json({ message: "ERROR_SET_MODULE_USER" });
                    }
                  }
                );
              }
            );
          }
        } catch (error) {
          return res.status(400).json({ message: "ERROR_SESSION" });
        }
      }
}

export const resourceSetModule = new ResourceSetModule();