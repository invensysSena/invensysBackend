import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import { QueryError, RowDataPacket } from "mysql2";

class ResourceDeletePermisionModule
{
    public async deletePermisionModule(req: Request | any,res: Response,_next: Partial<NextFunction>){
        try {
          const verifyToken: Array<any> | any = jwt.verify(
            req.params.idToken,
            SECRET
          )!;
          const { id } = verifyToken;
          if (id) {
            const conn: any = await conexion.connect();
            conn.query(
              `CALL DELETE_PERMISIONS_MODULE_USER('${id}','${req.body.idModule}')`,
              async (error: QueryError, rows: RowDataPacket) => {
                if (rows) {
                  return res
                    .status(200)
                    .json({ message: "DELETE_PERMISIONS_MODULE_USER" });
                } else {
                  return res
                    .status(400)
                    .json({ message: "ERROR_DELETE_PERMISIONS_MODULE_USER" });
                }
              }
            );
          }
        } catch (error) {
          return res.status(400).json({ message: "ERROR_SESSION" });
        }
      }
}

export const resourceDeletePermisionModule = new ResourceDeletePermisionModule();