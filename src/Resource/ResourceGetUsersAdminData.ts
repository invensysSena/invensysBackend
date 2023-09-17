import { Request, Response, NextFunction } from "express";
import { queryData } from "../secure/DbQuery";
import settings from "../data/settings.json";
let app_settings = settings[0]

class ResourceGetUsersAdminData {
    public async getUsersAdminData(req: Request|any,res: Response,_next: Partial<NextFunction>) {
      
        try {

          let response:any = await queryData.queryGet(app_settings.METHOD.GET,app_settings.schema,app_settings.TABLES.USERS,
            Object.keys({idadmin:req.user.id}),Object.values({idadmin:req.user.id}),["WHERE"],[],req)
          if (response.resultGet?.rows?.length > 0) {
            return res
              .status(200)
              .json({ message: "GET_ADMIN_ALL", data:  response.resultGet?.rows });
          } else {
            return res.status(304).json({ message: "ERROR_GET_ADMIN_ALL" });
          }
        } catch (error) {
          return res.status(400).json({ error });
        }
      }
}

export const resourceGetUsersAdminData = new ResourceGetUsersAdminData();