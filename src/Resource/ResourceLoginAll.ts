import { encripte } from "../utils/encriptePassword";
import { Request, Response, NextFunction } from "express";
import {login} from "../interfaces/users";
import { conexion } from "../database/database";
import moment from "moment-with-locales-es6";
import Todo from "../class/Notification.Todo";
import { QueryError, RowDataPacket } from "mysql2";
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";

let moments: moment = moment;
moment.locale("es");
class ResourceLoginAll {
    public async LoginAuth(req: Request|any,res: Response,_next: Partial<NextFunction>) {
        try {
          const data: login = {
            correo: req.body.postDataUser.email,
            password: req.body.postDataUser.password,
            authCuenta: true,
            token: req.body.token,
            refreshToken: req.body.refreshToken,
          };
          const conn: any = await conexion.connect();
          conn.query(
            `CALL ADMIN_AUTH_LOGIN('${data.correo}')`,
            async (error: QueryError, rows: RowDataPacket) => {
              if (error)
                return res.status(400).json({ message: "ERROR_DB", error: error });
              if (rows[0].length > 0) {
                const user = rows[0][0];
                const validPassword = await encripte.comparePassword(data.password,user.password);
                if (validPassword) {
                const token = await new ValidationTokenAndCreateToken().createTokenAdmin(req,rows[0][0].idUsers,data.correo);
                  return res.status(200).json({
                    message: "LOGIN_SUCCESSFULL",
                    token,
                    auth: true,
                    rol: rows[0][0].rol,
                    type: "admin",
                  });
                } else {
                  return res
                    .status(401)
                    .json({ message: "ERROR_PASSWORD", statu: 401, type: "admin" });
                }
              } else
                conn.query(
                  `CALL USER_LOGIN('${data.correo}')`,
                  async (error: QueryError, rows: RowDataPacket) => {
                    if (error)
                      return res
                        .status(400)
                        .json({ message: "ERROR_DB", error: error });
    
                    if (rows[0].length > 0) {
                      const validPassword = await encripte.comparePassword(
                        data.password,
                        rows[0][0].password
                      );
                      if (validPassword) {
                        conn.query(
                          `CALL USER_LOGIN_MODULO('${rows[0][0].idAccount}')`,
                          async (error: QueryError, rowsP: RowDataPacket) => {
                            if (error)
                              return res
                                .status(400)
                                .json({ message: "ERROR_DB", error: error });
                            let modulo: any = rowsP[0];
                            const token =  new ValidationTokenAndCreateToken().createTokenAdmin(req,rows[0][0].idUsers,data.correo);
                            const token1 =  new ValidationTokenAndCreateToken().createTokenUser(req,rows[0][0].idAccount,data.correo);
                           
                            let dataDevice = {
                              device: "desktop",
                              navegador: "chrome",
                              infoNavegIp: "34.56",
                            };
    
                            await conn.execute(
                              "SELECT * FROM services WHERE idAccountUsers = ?",
                              [rows[0][0].idAccount],
                              async (error: QueryError, coll: RowDataPacket) => {
                                if (coll.length > 0) {
                                  conn.query(
                                    `CALL UPDATE_SESION_USER('${
                                      dataDevice.device
                                    }', '198.168.1.46','${token1}','${moments().format(
                                      "LLLL"
                                    )}','Colombia','Español','${
                                      dataDevice.navegador
                                    }','${dataDevice.infoNavegIp}',
                              'Armenia'}','Colombia','Quindío','${
                                rows[0][0].idAccount
                              }')`,
                                    (error: QueryError, rows: RowDataPacket) => {}
                                  );
                                } else {
                                  conn.execute(
                                    `INSERT INTO services(idAccountUsers) VALUES(?)`,
                                    [rows[0][0].idAccount],
                                    (error: QueryError, rowsp: RowDataPacket) => {
                                      conn.query(
                                        `CALL UPDATE_SESION_USER('${
                                          dataDevice.device
                                        }', '198.168.1.46','${token1}','${moments().format(
                                          "LLLL"
                                        )}','Armenia','Español','${
                                          dataDevice.navegador
                                        }','${dataDevice.infoNavegIp}',
                                      'Armenia','Colombia','Quindio','${
                                        rows[0][0].idAccount
                                      }')`,
                                        (
                                          error: QueryError,
                                          self: RowDataPacket
                                        ) => {}
                                      );
                                    }
                                  );
                                }
                              }
                            );
    
                            if (modulo == "") {
                              return res.status(201).json({
                                message: "NOT_ACCCESO",
                                module: "error",
                                type: "error",
                              });
                            }
                            await new Todo().createNotificationClass(
                              `Un usuario acaba de iniciar sesion en el sistema`,
                              `${data.correo}`,data.correo,
                              "users",
                              `${rows[0][0].idUsers1}`
                            );
                            return res.status(200).json({
                              message: "LOGIN_SUCCESSFULL",
                              token,
                              token1,
                              auth: true,
                              module: modulo,
                              type: "user",
                            });
                          }
                        );
                      } else {
                        return res.status(401).json({ message: "ERROR_PASSWORD" });
                      }
                    } else {
                      return res
                        .status(401)
                        .json({ message: "ERROR_USER", statu: 401 });
                    }
                  }
                );
            }
          );
        } catch (error) {
          return res
            .status(500)
            .json({ message: "ERROR_AUTH_ADMIN", error: error });
        }
      }
}

export const  resourceLoginAll = new ResourceLoginAll();