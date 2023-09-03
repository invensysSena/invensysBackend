import { Request, Response, NextFunction } from "express";
import moment from "moment-with-locales-es6";
import settings from "../data/settings.json";
import permissions from "../data/permissions_settings.json";
import { queryData } from "../secure/DbQuery";
let app_settings = settings[0]
let permissions_settings = permissions[0]
let moments: moment = moment;
moment.locale("es");
class ResourceGetPermisions
{
    public async getPermisions(req: Request,res: Response,_next: Partial<NextFunction>) {
      try {

      
        let response:any = await queryData.queryGet(app_settings.METHOD.GET,app_settings.schema,app_settings.TABLES.PERMISIONS,[],[],[],[])
        console.log(response.statusText)
        if (response.statusText === 200) {  
          console.log("entroooooooooooooooooooooooooo")       
                return res
                  .status(200)
                  .json({ message: "GET_PERMISSIONS_ALL_SUCCESFULL", data:response.resultGet?.rows  });
              } else {
                return res.status(400).json({ message: "ERROR_GET_ADMIN_ALL", data:[]});
              }
      } catch (error) {
        return res.status(400).json({ message: "ERROR_SESSION",error });
      }
      }
}

export const resourceGetPermisions = new ResourceGetPermisions();