import { encripte } from "../utils/encriptePassword";
import { Request, Response, NextFunction } from "express";
import {login} from "../interfaces/users";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import moment from "moment-with-locales-es6";
import Todo from "../class/Notification.Todo";
import { QueryError, RowDataPacket } from "mysql2";
let moments: moment = moment;
moment.locale("es");

class ResourceRegisterUsuario 
{
    public async RegisterUsuario(req: Request|any,res: Response,_next: Partial<NextFunction>){
        try {
          let tokenIdAcc: any = req.headers.authorization;
          let responsable = req.users.email;
          const verifyToken: Array<any> | any = jwt.verify(tokenIdAcc, SECRET)!;
          const data: login = {
            correo: req.body.postDataUserRegister.email,
            password: req.body.postDataUserRegister.password,
            authCuenta: true,
            token: req.body.token,
            refreshToken: req.body.refreshToken,
          };
          const permisions = {
            delete: "eliminar",
            editar: "editar",
            crear: "crear",
            leer: "leer",
            state: "Inactivo",
          };
          if (verifyToken?.id) {
            const fecha = moments().format("MMMM Do YYYY");
            const hora = moments().format("h:mm:ss a");
            const hasPassword = await encripte.encriptePassword(data.password);
            const conn: any = await conexion.connect();
            conn.query(
              "SELECT * FROM account",
              async (error: QueryError, rows: RowDataPacket) => {
                if (rows.length > 0) {
                  for (let i = 0; i < rows.length; i++) {
                    if (rows[i].correo === data.correo) {
                      return res.json({
                        message: "ERR_MAIL_EXIST_USER",
                        status: 404,
                      });
                    }
                  }
                }
                conn.query(
                  `CALL CREATE_USER('${data.correo}','${hasPassword}','${fecha}','${verifyToken.id}','${hora}','${req.body.postDataUserRegister.estado}')`,
                  (error: QueryError, rows: RowDataPacket) => {
                    if (rows) {
                      conn.query(
                        `CALL GET_USER_SECOND_USER('${data.correo}')`,
                        (error: QueryError, rows: RowDataPacket) => {
                          if (rows) {
                            conn.query(
                              `CALL INSERT_MODULE_USER('${req.body.postDataUserRegister.modulo}','${req.body.postDataUserRegister.modulo}','${rows[0][0].idAccount}')`,
                              (error: any, rowsid: any) => {
                                console.log(
                                  "insert module",
                                  rowsid,
                                  "error",
                                  error
                                );
                                if (rowsid) {
                                  conn.query(
                                    `CALL GET_MODULE_ACCOUNT_USER('${rows[0][0].idAccount}')`,
                                    (error: any, rowsData: any) => {
                                      if (rowsData) {
                                        conn.query(
                                          `CALL ASIGNED_PERMISION_USER_ACCOUNT('${rowsData[0][0].IDmodulo}','${permisions.editar}','${permisions.editar}','${permisions.state}')`,
                                          async (error: any, rowsData: any) => {
                                            console.log(error);
    
                                            if (rowsData) {
                                              conn.query(
                                                `CALL GET_USER_CREATE('${data.correo}')`,
                                                async (
                                                  error: QueryError,
                                                  rows: RowDataPacket
                                                ) => {
                                                  await new Todo().createNotificationClass(
                                                    `Creaste un nuevo usuario`,
                                                    data.correo, responsable,
                                                    "users",
                                                    `${verifyToken.id}`
                                                  );
                                                  return res.status(201).json({
                                                    message:
                                                      "USER_REGISTER_SUCCESFULL",
                                                    status: 201,
                                                    data: rows,
                                                  });
                                                }
                                              );
                                            } else {
                                              return res.status(400).json({
                                                message: "USER_REGISTER_ERROR",
                                                status: 400,
                                                error,
                                              });
                                            }
                                          }
                                        );
                                      } else {
                                        return res.status(400).json({
                                          message: "USER_REGISTER_ERROR",
                                          status: 400,
                                        });
                                      }
                                    }
                                  );
                                } else {
                                  return res.status(400).json({
                                    message: "USER_REGISTER_ERROR",
                                    status: 400,
                                  });
                                }
                              }
                            );
                          }
                        }
                      );
                    } else {
                      return res
                        .status(400)
                        .json({ message: "USER_REGISTER_ERROR", status: 400 });
                    }
                  }
                );
              }
            );
          } else {
            return res.status(401).json({ message: "N0T_ALLOWED" });
          }
        } catch (error) {
          res.status(400).send({ message: "NOT_AUTORIZED" });
        }
      }
}

export const resourceRegisterUsuario = new ResourceRegisterUsuario();