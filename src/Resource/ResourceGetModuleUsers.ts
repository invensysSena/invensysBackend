import { Request, Response, NextFunction } from "express";
import { queryData } from "../secure/DbQuery";
import settings from "../data/settings.json";

let app_settings = settings[0]
class ResourceGetModuleUsers
{
    public async getModuleUsers(req: Request|any,res: Response,_next: Partial<NextFunction>){
        try {
      
          let query = {idmodule:req.params.id}
          console.log(query,"??????????")
          let response:any = await queryData.queryGet(app_settings.METHOD.GET,app_settings.schema,app_settings.TABLES.MODULE,Object.keys(query),Object.values(query),["WHERE"],[])
             
          if (response.resultGet?.rows?.length > 0) {
          
                  return res
                    .status(200)
                    .json({ message: "GET_MODULE_ALL", data:response?.resultGet?.rows });
                } else {
                 
                  return res.status(304).json({ message: "ERROR_GET_ADMIN_ALL", data:[]});
                }

          
        } catch (error) {
          
          return res.status(400).json({ message: "ERROR_SESSION",error });
    
        }
      }
}

export const resourceGetModuleUsers = new ResourceGetModuleUsers();