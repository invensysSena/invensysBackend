import { Request, Response, NextFunction } from "express";
import {forgotPassword} from "../interfaces/users";
import { conexion } from "../database/database";
import { recoveryAdminPass } from "../libs/forGotPassword";
import { QueryError, RowDataPacket } from "mysql2";

class ResourceRecoveryPassword{
    public async recoveryPassword(req: Request,res: Response,_next: Partial<NextFunction>) {
        try {
          const conn: any = await conexion.connect();
          const { email } = req.body;
          const mail: forgotPassword = {
            correo: email,
          };
          conn.query(
            `CALL ADMIN_SELECT_EMAIL('${mail.correo}')`,
            [mail.correo],
            (error: QueryError, rows: RowDataPacket) => {
              if (error) {
                return res.json({ message: error });
              }
              if (rows.length) {
                const min = 100000;
                const max = 999999;
                let codeAcceso = Math.floor(Math.random() * (max - min + 1) + min);
    
                conn.query(
                  `CALL ADMIN_RECOVERY__PASSWORD_CODE('${mail.correo}','${codeAcceso}')`,
                  (error: QueryError, row: RowDataPacket) => {
                    if (error)
                      return res.json({ message: "ERROR_CODE_WZ", err: error });
    
                    conn.query(
                      `CALL ADMIN_SELECT_CODE('${mail.correo}')`,
                      (error: QueryError, row: RowDataPacket) => {
                        if (error)
                          return res.json({
                            message: "ERROR_CODE_OBTENER_CODE_SQL",
                          });
    
                        if (rows.length) {
                          const resultCode = new recoveryAdminPass().sendCode(
                            codeAcceso,
                            mail.correo
                          );
                          return res
                            .status(200)
                            .json({ message: "VERIFY", email: mail.correo });
                        } else {
                          if (error)
                            return res.json({
                              message: "ERROR_CODE_OBTENER_CODE_SQL",
                            });
                        }
                      }
                    );
                  }
                );
              } else {
                res.status(401).json({ message: "EMAIL_NOT_EXIST" });
              }
            }
          );
        } catch (error) {
          return res.status(400).json({ error });
        }
      }
}

export const resourceRecoveryPassword = new ResourceRecoveryPassword();