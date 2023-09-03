import { encripte } from "../utils/encriptePassword";
import {  Response, NextFunction } from "express";
import {PersonRegister} from "../interfaces/users";
import { sendMailAdmin } from "../libs/libs";
import { globalData } from "../utils/utilFunction";
import Todo from "../class/Notification.Todo";
import { queryData } from "../secure/DbQuery";
import settings from "../data/settings.json";
import { Logger } from "winston";

let app_settings = settings[0]
class ResourceRegisterAdmin {
    public async AdminRegister(req: any,res: Response,_next: Partial<NextFunction>,log:Logger) {
        try {
          const data: PersonRegister = {
            correo: req.query.email,
            password: req.query.password,
            authCuenta: false,
            token: '',
            refreshToken: '',
            nameRol: "superAdmin",
          };
          let getGlobalDataZone:any = await  globalData();
          const hasPassword = await encripte.encriptePassword(data.password);
              let cuenta = "Invensys";
              let state = "activo";
              let authCount = "OK";
              let rol = "superAdmin";
           
              let dataAllInfo = {
                email: data.correo,fechacreacion: getGlobalDataZone.ZONE_GLOBAL,hora: getGlobalDataZone.ZONE_TIME,
                rol: rol,cuenta: cuenta,ip: getGlobalDataZone.ip,pais: getGlobalDataZone.country,
                ciudad: getGlobalDataZone.city,region: getGlobalDataZone.region,
                loc: getGlobalDataZone.loc,estado: state,authcuenta: authCount,password: hasPassword,
                dateupdate: getGlobalDataZone.ZONE_GLOBAL, org:getGlobalDataZone.org,postal:getGlobalDataZone.postal,
                hostname:getGlobalDataZone.hostname,readme:getGlobalDataZone.readme,zoneglobal:getGlobalDataZone.timezone
              };
              await queryData.QueryPost(app_settings.METHOD.POST,app_settings.schema,app_settings.TABLES.ADMIN,Object.keys(dataAllInfo),Object.values(dataAllInfo)).then(async (result:any) => {
                if (result.severity !== 'ERROR') {
                  const token: any = encripte.encriptePassword(data.correo);
                  // new sendMailAdmin().sendMailer(data.correo);
                  await new Todo().createNotificationClass(
                    `Creaste una cuenta de administrado: ${data.correo}`,
                    "Comienza a administrar tu negocio",data.correo,"admin",`${data.correo}`
                  );

                  log.info({ message: JSON.stringify(result) })
                  return res.status(200).json({
                    message: "USER_CREATE_SUCCESFULL",
                    token,
                    auht: data.authCuenta,
                  });
                } else {
                  return res.status(400).json({ message: "ERROR_DATA_ADMIN" });
                }
              }
              ).catch((error:any) => {
                log.error({message:error});
                return res.status(401).json({ message: "ERROR_DATA_ADMIN", error: error })});
        } catch (error: any) {
                log.error({message:error});
          return res.status(500).json({ message: "ERROR_SERVER_SERVICES", error });
        }
      }
}
export const resourceRegisterAdmin = new ResourceRegisterAdmin();