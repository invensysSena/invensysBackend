import { Request, Response, NextFunction } from "express";
import { queryData } from "../secure/DbQuery";
import settings from "../data/settings.json";

let app_settings = settings[0]
class ResourceGetAdminAll
{
    public async getAdminAll(req: Request | any,res: Response,_next: Partial<NextFunction>) {
        try {

          let response:any = await queryData.queryGet(app_settings.METHOD.GET,app_settings.schema,app_settings.TABLES.ADMIN,Object.keys({idadmin:req.users.id}),Object.values({idadmin:req.users.id}),["WHERE"],[])
                if (response.resultGet?.rows?.length > 0) {
                  return res
                    .status(200)
                    .json({ message: "GET_ADMIN_ALL", data: response.resultGet?.rows });
                } else {
                  return res.status(400).json({ message: "ERROR_GET_ADMIN_ALL" });
                }
        } catch (error) {
          return res.status(400).json({ message: "ERROR_TOKEN" });
        }
      }
}

export const resourceGetAdminAll = new ResourceGetAdminAll();