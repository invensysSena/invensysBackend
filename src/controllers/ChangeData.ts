import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { encripte } from "../utils/encriptePassword";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import {QueryError,RowDataPacket,} from "mysql2";
import { conexion } from "../database/database";
import moment from "moment-with-locales-es6";
import settings from "../data/settings.json";
import permissions from "../data/permissions_settings.json";
import { queryData } from "../secure/DbQuery";
let app_settings = settings[0]
let permissions_settings = permissions[0]
let moments: moment = moment;
class ChangeDataController {
  public async UpdatePassAdmin(req: Request,res: Response,next: NextFunction
  ) {
    try {
      const token: any = req.headers.authorization!;
      const decoded: any = jwt.verify(token, SECRET);
      const validateToken = decoded.id;
      const { password, newPassword } = req.body.data;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      // dar tipado a la conexion

      const conn: any = await conexion.connect();

      conn.query("select password from admin where idUsers = ?",[validateToken],
        async (err: QueryError, result: RowDataPacket) => {
          if (err) {
            return res.status(400).json({
              ok: false,
              message: "ERROR_DB",
            });
          }
          if (result[0].password === null) {
            conn.query("update admin set ? where idUsers = ?", [
              { password: hash },
              validateToken,
            ]);
            return res.status(200).json({
              ok: true,
              message: "UPDATE_PASSWORD_SUCCESS",
            });
          }
          if (result.length > 0) {
            const validatePass = await bcrypt.compare(
              password,
              result[0].password
            );
            if (validatePass) {
              return res.status(400).json({
                ok: false,
                message: "PASSWORD_EQUAL",
              });
            } else {
              conn.query("update admin set ? where idUsers = ?", [
                { password: hash },
                validateToken,
              ]);
              return res.status(200).json({
                ok: true,
                message: "UPDATE_PASSWORD_SUCCESS",
              });
            }
          }
        }
      );
    } catch (error) {
      next(error);
    }
  }

  public async UpdateEmailUser(req: Request,res: Response,next: NextFunction): Promise<Request | Response | any> {
    try {
      const {email} = req.body.data
      let method = app_settings.METHOD.PUT
      let schema = app_settings.schema
      let table = app_settings.TABLES.USERS

      let condition = Object.keys({iduser:req.params.id})
       await queryData.QueryUpdate(method,schema,table,Object.keys({email}),Object.values({email,iduser:req.params.id}),["WHERE"],condition,req)
      return res.status(200).json({ message: "UPDATE_DATA" });
     
    } catch (error) {
      return res.status(400).json({ message: "ERROR_DATA",error });
    }
  
  }

  public async UpdatePassUser(req: Request,res: Response,next: NextFunction): Promise<Request | Response | any> {

    try{
    const {newPassword} = req.body.data
    let method = app_settings.METHOD.PUT
    let schema = app_settings.schema
    let table = app_settings.TABLES.USERS
    let condition = Object.keys({iduser:req.params.id})
    const hasPassword = await encripte.encriptePassword(newPassword);
     await queryData.QueryUpdate(method,schema,table,Object.keys({password:hasPassword}),Object.values({hasPassword,iduser:req.params.id}),["WHERE"],condition,req)
    return res.status(200).json({ message: "UPDATE_DATA" });
   
  } catch (error) {
    return res.status(400).json({ message: "ERROR_DATA",error });
  
  }
}
}

export default ChangeDataController;
