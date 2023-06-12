import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import { QueryError, RowDataPacket } from "mysql2";
import { conexion } from "../database/database";

class ChangeDataController {
  public async UpdatePassAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Request | Response | any> {
    try {
      const token: any = req.headers.authorization!;
      const decoded: any = jwt.verify(token, SECRET);
      const validateToken = decoded.id;
      const { password, newPassword } = req.body.data;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const conn: any = await conexion.connect();

      conn.query(
        "select password from admin where idUsers = ?",
        [validateToken],
        async (err: QueryError, result: RowDataPacket) => {
          if (err) {
            return res.status(400).json({
              ok: false,
              message: "ERROR_DB",
            });
          }
          if (result[0].password === null) {
            conn.query("update admin set ? where idUsers = ?", [
              { password: hash },
              validateToken,
            ]);
            return res.status(200).json({
              ok: true,
              message: "UPDATE_PASSWORD_SUCCESS",
            });
          }
          if (result.length > 0) {
            const validatePass = await bcrypt.compare(
              password,
              result[0].password
            );
            if (validatePass) {
              return res.status(400).json({
                ok: false,
                message: "PASSWORD_EQUAL",
              });
            } else {
              conn.query("update admin set ? where idUsers = ?", [
                { password: hash },
                validateToken,
              ]);
              return res.status(200).json({
                ok: true,
                message: "UPDATE_PASSWORD_SUCCESS",
              });
            }
          }
        }
      );
    } catch (error) {
      next(error);
    }
  }

  public async UpdateEmailUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Request | Response | any> {
    try {
      const token = req.headers.authorization!;
      const decoded: any = jwt.verify(token, SECRET);
      const validateToken = decoded.id;
      const { email } = req.body.data;
      const { id } = req.params;
      const conn: any = await conexion.connect();
      if (!validateToken) {
        return res.status(400).json({
          ok: false,
          message: "NO_EXIST_TOKEN",
        });
      } else {
        conn.query(
          "select correo from account where idAccount = ?",
          [id],
          async (err: any, result: any) => {
            if (err) {
              return res.status(400).json({
                ok: false,
                message: "ERROR_DB",
              });
            }
            if (result.length > 0) {
              if (email === result[0].correo) {
                return res.status(400).json({
                  ok: false,
                  message: "EMAIL_EQUAL_USER",
                });
              } else {
                conn.query("update account set ? where idAccount = ?", [
                  { correo: email },
                  id,
                ]);
                return res.status(200).json({
                  ok: true,
                  message: "UPDATE_EMAIL_SUCCESS",
                });
              }
            }
          }
        );
      }
    } catch (error) {
      next(error);
    }
  }

  public async UpdatePassUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Request | Response | any> {
    try {
      const token = req.headers.authorization!;
      const decoded: any = jwt.verify(token, SECRET);
      const validateToken = decoded.id;
      const { password, newPassword } = req.body.data;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
      const { id } = req.params;
      console.log(req.body);

      if (!validateToken) {
        return res.status(400).json({
          ok: false,
          message: "NO_EXIST_TOKEN",
        });
      } else {
        const conn: any = await conexion.connect();
        conn.query(
          "select password from account where idAccount = ?",
          [validateToken],
          async (err: QueryError, result: RowDataPacket) => {
            if (err) {
              return res.status(400).json({
                ok: false,
                message: "ERROR_DB",
              });
            }
            if (result.length > 0) {
              const compare = await bcrypt.compare(
                password,
                result[0].password
              );
              if (compare) {
                return res.status(400).json({
                  ok: false,
                  message: "PASSWORD_EQUAL",
                });
              }
            } else {
              conn.query("update account set ? where idAccount = ?", [
                { password: hash },
                id,
              ]);

              return res.status(200).json({
                ok: true,
                message: "UPDATE_PASSWORD_SUCCESS",
                hash,
              });
            }
          }
        );
      }
    } catch (error) {
      next(error);
    }
  }
}

export default ChangeDataController;
