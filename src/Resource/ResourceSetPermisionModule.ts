import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import { QueryError, RowDataPacket } from "mysql2";

class ResourceSetPermisionModule  {
    public async setPermisionModule(req: Request | any,res: Response,_next: Partial<NextFunction>) {
        try {
          const verifyToken: Array<any> | any = jwt.verify(
            req.params.idToken,
            SECRET
          )!;
          const { id } = verifyToken;
          if (id) {
            const conn: any = await conexion.connect();
            conn.query(
              `CALL ASIGNED_PERMISION_USER_ACCOUNT('${id}','${req.body.idModule}','${req.body.permisions}')`,
              (error: QueryError, rows: RowDataPacket) => {
                if (rows) {
                  return res
                    .status(200)
                    .json({ message: "SET_PERMISIONS_MODULE_USER" });
                } else {
                  return res
                    .status(400)
                    .json({ message: "ERROR_SET_PERMISIONS_MODULE_USER" });
                }
              }
            );
          }
        } catch (error) {
          return res.status(400).json({ message: "ERROR_SESSION" });
        }
      }
}

export const resourceSetPermisionModule = new ResourceSetPermisionModule();