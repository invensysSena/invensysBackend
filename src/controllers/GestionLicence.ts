import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import { Request, Response, NextFunction } from "express";

class LicenceSofteareInvensys {
  public async getLicence(
    req: Request | any,
    res: Response | any,
    next: NextFunction
  ) {
    try {
      const Token: string = req.params?.id!;
      const veryfyToken: Array<any> | any = jwt.verify(Token, SECRET)!;
      const tokenIdUser = veryfyToken.id;
      const conn: any = await conexion.connect();
      conn.query(
        "SELECT * FROM licence WHERE idUser = ?",
        [tokenIdUser],
        (err: any, result: any) => {
          if (err) {
            return res.json({
              ok: false,
              message: "Error al obtener la licencia",
              err,
            });
          }
          if (result.length === 0) {
            return res.json({
              ok: false,
              message: "No se encontro la licencia",
            });
          }
          return res.status(200).json({
            ok: true,
            result,
          });
        }
      );
    } catch (error) {
      return error;
    }
  }

  public async createLicence(
    req: Request | any,
    res: Response | any,
    next: NextFunction
  ) {
    console.log(req.body);

    try {
      const Token: string = req.params?.id!;
      const veryfyToken: Array<any> | any = jwt.verify(Token, SECRET)!;
      const tokenIdUser = veryfyToken.id;
      const { licence } = req.body;
      const conn: any = await conexion.connect();
      conn.query(
        "INSERT INTO licence (licence, idUser) VALUES (?,?)",
        [licence, tokenIdUser],
        (err: any, result: any) => {
          if (err) {
            return res.json({
              ok: false,
              message: "Error al crear la licencia",
              err,
            });
          }
          return res.status(200).json({
            ok: true,
            message: "Licencia creada con exito",
            result,
          });
        }
      );
    } catch (error) {
      return error;
    }
  }
}

export default LicenceSofteareInvensys;
