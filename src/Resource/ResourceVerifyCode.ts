import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import { QueryError, RowDataPacket } from "mysql2";

class ResourceVerifyCode 
{
    public async veryfidCode(req: Request,res: Response,_next: Partial<NextFunction>) {
        try {
          const conn: any = await conexion.connect();
          conn.query(
            `CALL ADMIN_SELECT_CODE('${req.body.data.email}')`,
            async (_error: QueryError, rows: RowDataPacket) => {
              for (let i = 0; i < rows.length; i++) {
                if (rows[i][0].codigo == parseInt(req.body.data.codigo)) {
                  return res
                    .status(200)
                    .json({ message: "CODE_CORRECT", code: rows[i].codigo });
                } else {
                  return res.status(400).json({ message: "CODE_INCORRECT" });
                }
              }
            }
          );
        } catch (error) {
          return res.status(500).json({ message: "ERROR_SERVER", error });
        }
      }
}

export const resourceVerifyCode = new ResourceVerifyCode();