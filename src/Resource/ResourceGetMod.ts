import { Request, Response, NextFunction, json } from "express";
import { queryData } from "../secure/DbQuery";
import { globalData } from "../utils/utilFunction";
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import settings from "../data/settings.json";

let app_settings = settings[0]
class ResourceGetMod
{
    public async getMod(req: Request | any,res: Response,_next: Partial<NextFunction>) {

        try {
          let response:any;
          let querys = Object.keys({iduser:req.user.iduser})
          let data = Object.values({iduser:req.user.iduser})
          let schema = app_settings.schema
          let table = app_settings.TABLES.MODULE
          let method = app_settings.METHOD.GET
           response = await queryData.queryGet(method,schema,table,querys,data,["WHERE"],[],req) 

            return res.status(200).json({data:response.resultGet.rows });
        } catch (error) {
          return res.status(400).json({ error });
        }
      }
}

export const resourceGetMod = new ResourceGetMod();