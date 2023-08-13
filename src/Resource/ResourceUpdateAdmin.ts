import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import { QueryError, RowDataPacket } from "mysql2";

class ResourceUpdateAdmin
{
    public async updateAdmin(req: Request,res: Response,_next: Partial<NextFunction>) {
        try {
          const verifyToken: Array<any> | any = jwt.verify(
            req.params.idToken,
            SECRET
          )!;
          const { id } = verifyToken;
          if (id) {
            const conn: any = await conexion.connect();
    
            conn.query(
              `CALL ADMIN_UPDATE_DATA('${id}','${req.body.name}','${req.body.lastname}','${req.body.email}')`,
              (error: QueryError, rows: RowDataPacket) => {
                if (rows) {
                  return res.status(200).json({ message: "UPDATE_ADMIN_USER" });
                } else {
                  return res
                    .status(400)
                    .json({ message: "ERROR_UPDATE_ADMIN_USER" });
                }
              }
            );
          }
        } catch (error) {
          return res.status(400).json({ message: "ERROR_SESSION" });
        }
      }
}

export const resourceUpdateAdmin = new ResourceUpdateAdmin();