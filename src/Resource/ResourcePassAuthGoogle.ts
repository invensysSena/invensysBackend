import { Request, Response, NextFunction, json } from "express";
import { queryData } from "../secure/DbQuery";
import { globalData } from "../utils/utilFunction";
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import settings from "../data/settings.json";

let app_settings = settings[0]
class ResourcePassAuthGoogle {
    public async passpAuthGoogle(req: Request,res: Response,_next: Partial<NextFunction>,Log:any) {
      
         try {
          const { email, name, picture } = req.query;
          let response:any;
          Log.info({ message: JSON.stringify(req.query) })
          let columns = Object.keys({idadmin:"idadmin",rol:"rol",email})
          let querys = Object.keys({email})
          let data = Object.values({email})
          response = await queryData.queryGet(app_settings.METHOD.GET,app_settings.schema,app_settings.TABLES.ADMIN,Object.keys({email}),Object.values({email}),["WHERE"],Object.keys({email}),req)
         if (response?.resultGet?.rows?.length > 0) {
           response = await queryData.queryGet(app_settings.METHOD.GET,app_settings.schema,app_settings.TABLES.ADMIN,querys,data,["WHERE"],columns,req)
           const token = await new ValidationTokenAndCreateToken().createTokenAdmin(req,response.resultGet?.rows[0].idadmin,response.resultGet?.rows[0].email,);
          Log.info({ message: JSON.stringify(response.resultGet?.rows[0] )})
           return res.status(200).json({
                    message: "LOGIN_SUCCESSFULL",
                    token,
                    auth: true,
                    rol: response?.resultGet?.rows[0].rol,
                    type: "admin",
                  });
          
         }else {
          let getGlobalDataZone:any = await  globalData();
          let cuenta = "Google";
          let state = "activo";
          let rol = "administrador";
          let dataAllInfo = {
            email: email,fechacreacion: getGlobalDataZone.ZONE_GLOBAL,hora: getGlobalDataZone.ZONE_TIME,
            rol: rol,cuenta: cuenta,ip: getGlobalDataZone.ip,pais: getGlobalDataZone.country,
            ciudad: getGlobalDataZone.city,region: getGlobalDataZone.region,
            loc: getGlobalDataZone.loc,estado: state,authcuenta: true,password: 'no found',
            dateupdate: getGlobalDataZone.ZONE_GLOBAL, org:getGlobalDataZone.org,postal:getGlobalDataZone.postal,
            hostname:getGlobalDataZone.hostname,readme:getGlobalDataZone.readme,zoneglobal:getGlobalDataZone.timezone,
            nameadmin:name,imgurl:picture
          };
          await queryData.QueryPost(app_settings.METHOD.POST,app_settings.schema,app_settings.TABLES.ADMIN,Object.keys(dataAllInfo),Object.values(dataAllInfo),req).then(async (result:any) => {
          if (result.severity !== 'ERROR') {
            response = await queryData.queryGet(app_settings.METHOD.GET,app_settings.schema,app_settings.TABLES.ADMIN,querys,data,["WHERE"],columns,req)
            const token = await new ValidationTokenAndCreateToken().createTokenAdmin(req,response.resultGet?.rows[0].idadmin,response.resultGet?.rows[0].email,);
           Log.info({ message: JSON.stringify(response.resultGet?.rows[0]) })
           
            return res.status(200).json({
                     message: "LOGIN_SUCCESSFULL",
                     token,
                     auth: true,
                     rol: response?.resultGet?.rows[0].rol,
                     type: "admin",
                   });
          } else {

            Log.debug({ message: JSON.stringify(result) })
            return res.status(400).json({ message: "ERROR_DATA_ADMIN" });
          }
        }
        ).catch((error:any) => {
          return res.status(401).json({ message: "ERROR_DATA_ADMIN", error: error })});
         }

        } catch (error) {

            Log.error({ message: JSON.stringify(error) })
          return res
            .status(500)
            .json({ message: "ERROR_AUTH_ADMIN", error: error });
        }
      }
}

export const resourcePassAuthGoogle = new ResourcePassAuthGoogle();