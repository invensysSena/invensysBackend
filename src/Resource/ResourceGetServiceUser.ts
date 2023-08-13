import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import { QueryError, RowDataPacket } from "mysql2";

class ResourceGetServiceUser
{
    public async GetServiceUser(req: Request | any,res: Response,_next: Partial<NextFunction>) {
        try {
          if (req.params.id === "undefined") {
            return res.send({ message: "ERROR_ID" });
          }
    
          const conn: any = await conexion.connect();
          conn.query(
            `CALL GET_SERVICE_USER('${req.params.id}')`,
            (error: QueryError, rows: RowDataPacket) => {
              if (rows) {
                return res
                  .status(200)
                  .json({ message: "GET_SERVICE_USER", data: rows[0] });
              } else {
                return res.status(400).json({ message: "ERROR_GET_SERVICE_USER" });
              }
            }
          );
        } catch (error) {
          return res.status(400).json({ message: "ERROR_TOKEN" });
        }
      }
}

export const resourceGetServiceUser = new ResourceGetServiceUser();