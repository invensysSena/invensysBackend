import { encripte } from "../utils/encriptePassword";
import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import Todo from "../class/Notification.Todo";
import { QueryError, RowDataPacket } from "mysql2";

class ResourceNewPassword
{
    public async newPassUser(req: Request|any,res: Response,_next: Partial<NextFunction>) {
        try {
          const conn: any = await conexion.connect();
          const { codigo, correo, newPassword } = req.body;
          const validate: any = {
            correo: correo,
            codePass: codigo,
            newPassword: newPassword,
          };
          const expresiones = {
            password: /^.{4,20}$/,
          };
          if (expresiones.password.test(validate.newPassword)) {
            conn.query(
              "SELECT * FROM usuario WHERE correo = ? AND codigo = ?",
              [validate.correo, validate.codePass],
              async (error: QueryError, rows: RowDataPacket) => {
                if (error) {
                  return res.json({ message: "ERROR_NEW_PASS", error: error });
                }
                if (rows.length) {
                  const password = await encripte.encriptePassword(validate.newPassword);
                  conn.query(
                    "UPDATE usuario SET password = ? WHERE correo = ?",
                    [password, validate.correo],
                    async (error: QueryError, rows: RowDataPacket) => {
                      if (error)
                        return res.json({
                          message: "ERROR_UPDATE_PASS",
                          error: error,
                        });
                      if (rows) {
                        await new Todo().createNotificationClass(
                          "Se cambio la contraseña de tu cuenta correctamente",
                          correo, validate.correo,
                          "users",
                          correo
                        );
                        return res.json({ message: "PASS_UPDATE_SUCCESFULLY" });
                      }
                    }
                  );
                } else {
                  return res.json({ message: "ERROR_NEW_PASS" });
                }
              }
            );
          } else {
            return res.json({ message: "EMAIL_NOT_VALID" });
          }
        } catch (error) {
          return res.status(400).json({ error });
        }
      }
}

export const resourceNewPassword = new ResourceNewPassword();