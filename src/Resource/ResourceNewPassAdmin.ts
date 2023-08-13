import { encripte } from "../utils/encriptePassword";
import { Request, Response, NextFunction } from "express";
import {newPasswordAdmin} from "../interfaces/users";
import { conexion } from "../database/database";
import { ConfirmPasswordExito } from "../libs/confirmPasswordExito";
import { QueryError, RowDataPacket } from "mysql2";

class ResourceNewPassAdmin
{
    public async newPassAdmin(req: Request,res: Response,_next: Partial<NextFunction>){
        try {
          const conn: any = await conexion.connect();
          const { codigo, correo, newPassword } = req.body.data;
          const validate: newPasswordAdmin = {
            correo: correo,
            codePass: codigo,
            newPassword: newPassword,
          };
          const hasPassword = await encripte.encriptePassword(validate.newPassword,);
          conn.query(
            `CALL ADMIN_SELECT_EMAIL('${validate.correo}')`,
            (error: QueryError, rows: RowDataPacket) => {
              if (error)
                return res
                  .status(500)
                  .json({ message: "ERROR_EMAIL_OBTENER_CODE_SQL", error });
              if (rows.length > 0) {
                conn.query(
                  `CALL ADMIN_UPDATE_PASSWORD('${validate.correo}','${hasPassword}')`,
                  async (error: QueryError, row: RowDataPacket) => {
                    if (error)
                      return res
                        .status(400)
                        .json({ message: "ERROR_UPDATE_PASS", error });
                    if (rows) {
                      conn.query(
                        `UPDATE admin SET codigo = NULL WHERE correo = ? `,
                        [validate.correo]
                      );
    
                      await new ConfirmPasswordExito().sendConfirmEmail(
                        validate.correo
                      );
                      return res
                        .status(204)
                        .json({ message: "PASS_UPDATE_SUCCESFULLY" });
                    }
                  }
                );
              }
            }
          );
        } catch (error) {
          return res.status(400).json({ error });
        }
      }
}

export const resourceNewPassAdmin = new ResourceNewPassAdmin();