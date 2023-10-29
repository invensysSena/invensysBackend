import { encripte } from "../utils/encriptePassword";
import { Request, Response, NextFunction, json } from "express";
import { queryData } from "../secure/DbQuery";
import { globalData } from "../utils/utilFunction";
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import settings from "../data/settings.json";
let app_settings = settings[0]

class ResourceLoginAll {
    public async LoginAuth(req: Request|any,res: Response,_next: Partial<NextFunction>) {
      
        try {
          const data = {
            correo: req.body.email,
            password: req.body.password,
          };
          let email = data.correo;
          let response:any;
          let method = app_settings.METHOD.GET
          let schema = app_settings.schema
          let tableAdmin = app_settings.TABLES.ADMIN
          let dableUser = app_settings.TABLES.USERS
          let dataKey = Object.keys({email})
          let dataValues = Object.values({email})


          response = await queryData.queryGet(method,schema,tableAdmin,dataKey,dataValues,["WHERE"],[],req) // obtener datos de la tabla admin

          if (response?.resultGet?.rows?.length > 0) {

            response = await queryData.queryGet(method,schema,tableAdmin,dataKey,dataValues,["WHERE"],[],req) // obtener datos de la tabla admin
            const token = await new ValidationTokenAndCreateToken().createTokenAdmin(req,null,response.resultGet?.rows[0].idadmin,response.resultGet?.rows[0].email,);
            return res.status(200).json({ token,auth: true, rol: response?.resultGet?.rows[0].rol,type: "admin", email:email });
         
          }else {
            response = await queryData.queryGet(method,schema,dableUser,dataKey,dataValues,["WHERE"],[],req)// obtener datos de la tabla user

            if (response?.resultGet?.rows?.length > 0) {
              const validPassword = await encripte.comparePassword(data.password,response.resultGet?.rows[0].password);// comparar contraseña
              if (validPassword) {

                response = await queryData.queryGet(method,schema,dableUser,dataKey,dataValues,["WHERE"],[],req) // obtener datos de la tabla user

                const token = await new ValidationTokenAndCreateToken().createTokenAdmin(req,response.resultGet?.rows[0].iduser,response.resultGet?.rows[0].idadmin,response.resultGet?.rows[0].email,);
                let moduleresp =  await queryData.queryGet(method,schema,app_settings.TABLES.MODULE,Object.keys({iduser:""}),Object.values({iduser:response.resultGet?.rows[0].iduser}),["WHERE"],[],req)
                if (moduleresp.resultGet) {
                  
                  return res.status(200).json({ token,auth: true, rol: response?.resultGet?.rows[0].rol,type: "user", email:email,modules:moduleresp.resultGet?.rows });
                }else {
                  return res.status(402).json({ message: "NOT_MODULES" });
                }
                
              } else {
                return res.status(401).json({ message: "ERROR_PASSWORD" });
              }
            }
          }
        } catch (error) {
          return res.status(500).json({error: error });
        }
      }
}

export const  resourceLoginAll = new ResourceLoginAll();