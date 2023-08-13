import { encripte } from "../utils/encriptePassword";
import { Response, NextFunction } from "express";
import fs from "fs-extra";
import csvtojson from "csvtojson";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import moment from "moment-with-locales-es6";
import { QueryError, RowDataPacket } from "mysql2";
let moments: moment = moment;
moment.locale("es");

class ResourceUploadusersCsv 
{
    public async uploadusersCsv(req: any,res: Response,_next: Partial<NextFunction>) {
        const fecha = moments().format("MMMM Do YYYY");
        const hora = moments().format("h:mm:ss a");
        const permisions = {
          delete: "eliminar",
          editar: "editar",
          crear: "crear",
          leer: "leer",
          state: "Inactivo",
        };
        let tokenIdAcc: any = req.headers.authorization;
        const verifyToken: Array<any> | any = jwt.verify(tokenIdAcc, SECRET)!;
        const { id } = verifyToken;
        if (id) {
        const conn: any = await conexion.connect();
          if (req.files?.archivousuariocsv) {
            let fileName = req.files?.archivousuariocsv?.tempFilePath!;
    
            csvtojson()
              .fromFile(fileName)
              .then(async (source: any) => {
                let users = 1;
                for (let i = 0; i < source.length; i++) {
                  let correo = source[i]["correo"],
                    password = source[i]["password"];
                  const hasPassword = await encripte.encriptePassword(password,);
                  conn.query(
                    "SELECT * FROM account",
                    async (error: QueryError, rows: RowDataPacket) => {
                      for (let i = 0; i < rows.length; i++) {
                        if (rows[i].correo == correo) {
                        }
                      }
                      conn.query(
                        `CALL CREATE_USER('${correo}','${hasPassword}','${fecha}','${id}','${hora}','${req.body["formDataCsv[estado]"]}')`,
                        (error: QueryError, row: RowDataPacket) => {
                          if (rows) {
                            conn.query(
                              `CALL GET_USER_SECOND_USER('${correo}')`,
                              (error: QueryError, rows: RowDataPacket) => {
                                if (rows) {
                                  conn.query(
                                    `CALL INSERT_MODULE_USER('${req.body["formDataCsv[modulo]"]}','${req.body["formDataCsv[modulo]"]}','${rows[0][0].idAccount}')`,
                                    (error: QueryError, rowsid: RowDataPacket) => {
                                      if (rowsid) {
                                        conn.query(
                                          `CALL GET_MODULE_ACCOUNT_USER('${rows[0][0].idAccount}')`,
                                          (error: any, rowsData: any) => {
                                            if (rowsData) {
                                              conn.query(
                                                `CALL ASIGNED_PERMISION_USER_ACCOUNT('${rowsData[0][0].IDmodulo}','${permisions.editar}','${permisions.editar}','${permisions.state}')`,
                                                (error: any, rowsData: any) => {}
                                              );
                                            }
                                          }
                                        );
                                      }
                                    }
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  );
                }
    
                await fs.remove(req.files?.archivousuariocsv?.tempFilePath);
                conn.query(
                  `CALL GET_USER('${id}')`,
                  (error: QueryError, rows: RowDataPacket) => {
                    return res.status(201).json({
                      message: "USER_REGISTER_SUCCESFULL",
                      status: 201,
                      data: rows,
                    });
                  }
                );
              });
          } else {
            await fs.remove(req.files?.archivousuariocsv?.tempFilePath);
            return res.send("no subio el documento");
          }
        } else {
          await fs.remove(req.files?.archivousuariocsv?.tempFilePath);
          return res.status(400).json({ message: "ERROR_SESSION" });
        }
      }
}


export const resourceUploadusersCsv = new ResourceUploadusersCsv();