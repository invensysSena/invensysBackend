import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import { QueryError, RowDataPacket } from "mysql2";

class ResourceGetUsersAdminData {
    public async getUsersAdminData(req: Request,res: Response,_next: Partial<NextFunction>) {
        try {
          const verifyToken: Array<any> | any = jwt.verify(
            req.params.idToken,
            SECRET
          )!;
          const { id } = verifyToken;
    
          if (id) {
            const conn: any = await conexion.connect();
            conn.query(
              `CALL GET_USER('${id}')`,
              (error: QueryError, rows: RowDataPacket) => {
                if (error)
                  return res
                    .status(500)
                    .json({ message: "ERROR_GET_USERS_ADMIN_DATA", error });
                if (rows) {
                  return res
                    .status(200)
                    .json({ message: "GET_USERS_ADMIN_DATA", data: rows[0] });
                }
              }
            );
          } else {
            return res.status(400).json({ message: "ERROR_SESSION" });
          }
        } catch (error) {
          return res.status(400).json({ error });
        }
      }
}

export const resourceGetUsersAdminData = new ResourceGetUsersAdminData();