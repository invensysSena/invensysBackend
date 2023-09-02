import { Request, Response, NextFunction } from "express";
import { queryData } from "../secure/DbQuery";
import settings from "../data/settings.json";
let app_settings = settings[0]

class ResourceGetUsersAdminData {
    public async getUsersAdminData(req: Request|any,res: Response,_next: Partial<NextFunction>) {
      
        try {

          let response:any = await queryData.queryGet(app_settings.METHOD.GET,app_settings.schema,app_settings.TABLES.USERS,
            Object.keys({idadmin:req.users.id}),Object.values({idadmin:req.users.id}),["WHERE"],[])
          if (response.resultGet?.rows?.length > 0) {
            return res
              .status(200)
              .json({ message: "GET_ADMIN_ALL", data:  response.resultGet?.rows });
          } else {
            return res.status(400).json({ message: "ERROR_GET_ADMIN_ALL" });
          }
          // const verifyToken: Array<any> | any = jwt.verify(
          //   req.params.idToken,
          //   SECRET
          // )!;
          // const { id } = verifyToken;
    
          //   const conn: any = await conexion.connect();
          //   conn.query(
          //     `CALL GET_USER('${id}')`,
          //     (error: QueryError, rows: RowDataPacket) => {
          //       if (error)
          //         return res
          //           .status(500)
          //           .json({ message: "ERROR_GET_USERS_ADMIN_DATA", error });
          //       if (rows) {
          //         return res
          //           .status(200)
          //           .json({ message: "GET_USERS_ADMIN_DATA", data: rows[0] });
          //       }
          //     }
          //   );
          
        } catch (error) {
          return res.status(400).json({ error });
        }
      }
}

export const resourceGetUsersAdminData = new ResourceGetUsersAdminData();