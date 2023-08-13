import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import { QueryError, RowDataPacket } from "mysql2";

class ResourceGetMod
{
    public async getMod(req: Request | any,res: Response,_next: Partial<NextFunction>) {
        try {
          const verifyToken: Array<any> | any = jwt.verify(req.params.id, SECRET)!;
          const { id1 } = verifyToken;
          if (id1) {
            const conn: any = await conexion.connect();
            conn.execute(
              `CALL GET_MODULE_ACCOUNT_USER('${id1}')`,
              (error: QueryError, rows: RowDataPacket) => {
                if (rows) {
                  return res
                    .status(200)
                    .json({ message: "GET_MODULES_USER", data: rows[0] });
                } else {
                  return res
                    .status(400)
                    .json({ message: "ERROR_GET_MODULES_USER" });
                }
              }
            );
          }
        } catch (error) {
          return res.status(400).json({ message: "ERROR_GET_MODULES_USER" });
        }
      }
}

export const resourceGetMod = new ResourceGetMod();