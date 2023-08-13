import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import { sendMailAdmin } from "../libs/libs";
import moment from "moment-with-locales-es6";
import { QueryError, RowDataPacket } from "mysql2";

let moments: moment = moment;
moment.locale("es");
class ResourcePassAuthGoogle {
    public async passpAuthGoogle(req: Request,res: Response,_next: Partial<NextFunction>) {
        try {
          const conn: any = await conexion.connect();
          const { email, name, picture } = req.body.data;
          const fecha = moments().format("Do MMMM  YYYY");
          const hora = moments().format("h:mm:ss a");
          conn.query(
            "SELECT * FROM admin  Where correo = ?",
            [email],
            async (error: QueryError, rows: RowDataPacket) => {
              if (error)
                return res.status(400).json({ message: "ERROR_DB", error: error });
    
              let rol = "superAdmin";
              let estado = "activo";
              if (rows.length > 0) {
                conn.query(
                  "SELECT idUsers,rol FROM admin WHERE correo = ?",
                  [email],
                  async (error: QueryError, rows: RowDataPacket) => {
                    if (error)
                      return res
                        .status(400)
                        .json({ message: "ERROR_DB", error: error });
                    conn.query(
                      `UPDATE admin SET estado = '${estado}' WHERE correo = '${email}'`
                    );
    
                    if (rows.length > 0) {
                      const token: any = jwt.sign(
                        { id: rows[0].idUsers },
                        SECRET || "tokenGenerate",
                        { expiresIn: 60 * 60 * 24 }
                      );
                      return res.status(200).json({
                        message: "ADMIN_AUTH_SUCCESFULL_GOOGLE",
                        token: token,
                        auth: true,
                        rol: rows[0].rol,
                      });
                    } else {
                      return res.status(400).json({ message: "ERROR_DATA_GOOGLE" });
                    }
                  }
                );
              } else {
                console.log("Crear la cuentas");
    
                const url = "https://ipapi.co/json/";
                const response = await fetch(url);
                const data = await response.json();
                const {
                  country_name,
                  city,
                  longitude,
                  latitude,
                  country_calling_code,
                  languages,
                  ip,
                  network,
                  version,
                } = data;
    
                let cuenta = "Google";
                let state = "activo";
                let tc = "si";
                let authCount = "OK";
                conn.query(
                  `CALL AUTH_GOOGLE('${email}', '${name}', '${picture}','${fecha}','${hora}',
                '${rol}','${cuenta}','${ip}','${country_name}','${city}','${country_calling_code}',
                '${languages}','${longitude}','${latitude}','${state}','${tc}','${authCount}')`,
                  async (error: QueryError, rows: RowDataPacket) => {
                    if (rows) {
                      conn.query(
                        "SELECT idUsers ,rol FROM admin WHERE correo = ?",
                        [email],
                        async (error: QueryError, rows: RowDataPacket) => {
                          if (error)
                            return res
                              .status(400)
                              .json({ message: "ERROR_DB", error: error });
                          if (rows.length > 0) {
                            const token: any = jwt.sign(
                              { id: rows[0].idUsers },
                              SECRET || "tokenGenerate",
                              { expiresIn: 60 * 60 * 24 }
                            );
                            const resultEmail =
                              await new sendMailAdmin().sendMailer(email);
    
                            return res.status(200).json({
                              message: "ADMIN_AUTH_SUCCESFULL_GOOGLE",
                              token: token,
                              auth: true,
                              rol: rows[0].rol,
                            });
                          }
                        }
                      );
                    } else {
                      console.log("error daniel",error)
                    }
                  }
                );
              }
            }
          );
        } catch (error) {
          return res
            .status(500)
            .json({ message: "ERROR_AUTH_ADMIN", error: error });
        }
      }
}

export const resourcePassAuthGoogle = new ResourcePassAuthGoogle();