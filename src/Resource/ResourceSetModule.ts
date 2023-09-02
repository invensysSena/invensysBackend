import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import moment from "moment-with-locales-es6";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import { QueryError, RowDataPacket } from "mysql2";
import settings from "../data/settings.json";
import permissions from "../data/permissions_settings.json";
import { queryData } from "../secure/DbQuery";
let app_settings = settings[0]
let permissions_settings = permissions[0]
let moments: moment = moment;
class ResourceSetModule
{
    public async setModule(req: any,res: Response,_next: Partial<NextFunction>) {

          console.log(req.body)
        try {
          const fecha = moments()

          let idmodule = req.body.idmodule
          let method = app_settings.METHOD.GET
          let table = app_settings.TABLES.MODULE
          let schema = app_settings.schema

          let path = { pathrouter: "", code: 0, description: "", estado: "activo", createdate: fecha }
    
          permissions_settings.PERMISSIONS_USER_PATH.forEach((item: any) => {

            let pathRouter = app_settings.PATH.URL+item.url
            
            if (pathRouter   === req.body.path) {
                path.pathrouter = "users" + item.url
                path.code = item.id_modulo,
                path.description = item.nombre
            }else {
              return null
            }
          })

           queryData.queryGet(method,schema,table, Object.keys({idmodule}), Object.values({idmodule}), ["WHERE"], []).then(async (result: any) => {
          
            if ( result.statusText == 200) {
              
              queryData.QueryDelete(app_settings.METHOD.DELETE, schema, table, Object.keys({ idmodule }), Object.values({ idmodule })).then(async (result: any) => {
                if (result.severity !== 'ERROR') {
                  return res.status(201).json({ message: "MODULE_DELETE_SUCCESFULL", status: 201 })
                }
              })
            } else {
              let inserModule = { ...path, iduser: req.body.iduser }
              await queryData.QueryPost(app_settings.METHOD.POST, schema, table, Object.keys(inserModule), Object.values(inserModule)).then(async (result: any) => {
                if (result.severity !== 'ERROR') {
                  return res.status(201).json({ message: "MODULE_REGISTER_SUCCESFULL", status: 201 })
                }
              })
            }
          })
          // const verifyToken: Array<any> | any = jwt.verify(
          //   req.headers?.authorization,
          //   SECRET
          // )!;
          // const { id } = verifyToken;
          // if (id) {
          //   const conn: any = await conexion.connect();
          //   conn.query(
          //     `CALL INSERT_MODULE_USER('${req.body.data.module}','${req.body.data.module}','${req.body.data.idAccount}')`,
          //     (error: QueryError, rows: RowDataPacket) => {
          //       conn.query(
          //         "SELECT IDmodulo, titulo FROM modulo WHERE titulo = ?",
          //         [req.body.data.module],
          //         (error: QueryError, row: RowDataPacket) => {
          //           if (rows) {
          //             return res
          //               .status(200)
          //               .json({ message: "SET_MODULE_USER", data: row });
          //           } else {
          //             return res
          //               .status(400)
          //               .json({ message: "ERROR_SET_MODULE_USER" });
          //           }
          //         }
          //       );
          //     }
          //   );
          // }
        } catch (error) {
          return res.status(400).json({ message: "ERROR_SESSION" });
        }
      }
}

export const resourceSetModule = new ResourceSetModule();