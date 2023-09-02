import { encripte } from "../utils/encriptePassword";
import { Request, Response, NextFunction } from "express";
import { login } from "../interfaces/users";
import moment from "moment-with-locales-es6";
import settings from "../data/settings.json";
import permissions from "../data/permissions_settings.json";
import { queryData } from "../secure/DbQuery";
let app_settings = settings[0]
let permissions_settings = permissions[0]
let moments: moment = moment;
moment.locale("es");

class ResourceRegisterUsuario {
  public async RegisterUsuario(req: Request | any, res: Response, _next: Partial<NextFunction>) {
    // try {
    const data: login = {
      correo: req.body.postDataUserRegister.email,
      password: req.body.postDataUserRegister.password,
      authCuenta: true,
      token: '',
      refreshToken: '',
    };

    const fecha = moments()
    const hasPassword = await encripte.encriptePassword(data.password);
    let method = app_settings.METHOD.GET
    let schema = app_settings.schema
    let table = app_settings.TABLES.USERS
    let columnsValidate = Object.keys({ email: data.correo, iduser: "" })
    let condition = ["WHERE"]
    let values = Object.values({ email: data.correo })
    let dataConsult = Object.keys({ email: data.correo })
    let path = { pathrouter: "", code: 0, description: "", estado: "activo", createdate: fecha }

    permissions_settings.PERMISSIONS_USER_PATH.forEach((item: any) => {
      if (item.url === req.body.postDataUserRegister.modulo) {
        path.pathrouter = "users" + item.url
        path.code = item.id_modulo,
          path.description = item.nombre
      }
    })

    let dataBodyUser = { email: data.correo, password: hasPassword, datecreate: fecha,
       estado: "activo", imgurl: "url", imgid: "id", idadmin: req.users.id, dateuptate: fecha }

     await queryData.QueryPost(app_settings.METHOD.POST, schema, table, Object.keys(dataBodyUser),
            Object.values(dataBodyUser)).then(async (result: any) => {

              if (result.severity !== 'ERROR') {
                  await queryData.queryGet(method, schema, table, dataConsult, values, condition, columnsValidate)
                  .then(async (result: any) => {
                    // datos para insertar modulo
                     let inserModule = { ...path, iduser: result.resultGet.rows[0].iduser }

                      await queryData.QueryPost(app_settings.METHOD.POST, schema, app_settings.TABLES.MODULE,
                       Object.keys(inserModule), Object.values(inserModule)).then(async (result: any) => {
                        if (result.severity !== 'ERROR') {
                           return res.status(201).json({ message: "USER_REGISTER_SUCCESFULL", status: 201 })

                 }
                }
                  ).catch((error: any) => {
                    return res.status(401).json({ message: "ERROR_DATA_ADMIN", error: error })
               })

        }).catch((error: any) => {
          return res.status(401).json({ message: "ERROR_DATA_ADMIN", error: error })
        }
        );
      }
    }).catch((error: any) => {
      return res.status(401).json({ message: "ERROR_DATA_ADMIN", error: error })
    });
   
  }
}

export const resourceRegisterUsuario = new ResourceRegisterUsuario();