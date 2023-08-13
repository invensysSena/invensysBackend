import { encripte } from "../utils/encriptePassword";
import {  Response, NextFunction } from "express";
import {PersonRegister} from "../interfaces/users";
import { conexion } from "../database/database";
import { sendMailAdmin } from "../libs/libs";
import moment from "moment-with-locales-es6";
import Todo from "../class/Notification.Todo";
import { QueryError, RowDataPacket } from "mysql2";
let moments: moment = moment;
moment.locale("es");

class ResourceRegisterAdmin {
    public async AdminRegister(req: any,res: Response,_next: Partial<NextFunction>) {
        try {
          const datas: PersonRegister = {
            correo: req.body.postDataAdmin.email,
            password: req.body.postDataAdmin.password,
            authCuenta: false,
            token: req.body.token,
            refreshToken: req.body.refreshToken,
            nameRol: "superAdmin",
          };
          const fecha = moments().format("YYYY-MM-DD");
          const hora = moments().format("HH:mm:ss");
          const hasPassword = await encripte.encriptePassword(datas.password);
          const conn: any = await conexion.connect();
          conn.query("SELECT * FROM admin",
            async (_error: QueryError, row: RowDataPacket) => {
              if (row.length < 0) {
                return res.status(400).json({ message: "ERROR_DATA_ADMIN" });
              }
              for (let i = 0; i < row.length; i++) {
                if (row[i].correo == datas.correo)
                  return res.status(400).json({ message: "ERR_EXIST_EMAIL" });
              }
    
              const url = "https://ipapi.co/json/";
              const response = await fetch(url);
              const data = await response.json();
              const {country_name,city,longitude,latitude,country_calling_code,languages,
              ip,network,version,} = data;
              let cuenta = "Invensys";
              let state = "activo";
              let tc = "si";
              let authCount = "OK";
              let rol = "superAdmin";
              conn.query(
                `CALL ADMIN_INSERT_LOGIN('${datas.correo}','${fecha}','${hora}',
            '${rol}','${cuenta}','${ip}','${country_name}','${city}','${country_calling_code}',
            '${languages}','${longitude}','${latitude}','${state}','${tc}','${authCount}','${hasPassword}')`,
                async (error: QueryError, rows: RowDataPacket) => {
                  if (error) {
                    return res.status(401).json({ message: "ERROR_DATA_ADMIN", error: error });
                  }
                  if (rows) {
                    const token: any = encripte.encriptePassword(datas.correo);
                    new sendMailAdmin().sendMailer(data.correo);
                    await new Todo().createNotificationClass(
                      `Creaste una cuenta de administrado: ${datas.correo}`,
                      "Comienza a administrar tu negocio",datas.correo,
                      "users",
                      `${datas.correo}`
                    );
                    return res.status(200).json({
                      message: "USER_CREATE_SUCCESFULL",
                      token,
                      auht: data.authCuenta,
                    });
                  } else {
                    return res.status(400).json({ message: "ERROR_DATA_ADMIN" });
                  }
                }
              );
            }
          );
        } catch (error: any) {
          return res.status(500).json({ message: "ERROR_SERVER_SERVICES", error });
        }
      }
}

export const resourceRegisterAdmin = new ResourceRegisterAdmin();