import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import bcrypt from "bcrypt";
export const authAdmin = async (
  correo: any,
  password: any,
  authCuenta: any,
  token: any
): Promise<any> => {
  try {
    const conn: any = await conexion.connect();
    const expresiones = {
      password: /^.{4,20}$/,
      correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    };

    // if (req.headers["authorization-google"]) {

    //   conn.query("")
    // }

    if (
      expresiones.correo.test(correo) &&
      expresiones.password.test(password)
    ) {
      conn.query(
        "SELECT password,idAdmin,rol FROM admin WHERE correo = ?",
        [correo],
        async (error: Array<Error> | any, rows: any) => {
          if (error) {

            return "ERROR_AUTH_ADMIN";
          }
          if (rows) {
            return "Hola";
          }
        }
      );
    } else {
      return "ERROR_DATE_ADMIN";
      // return res.json({
      //   message: "DATA_NOT_VALID",
      // });
    }
  } catch (error) {
    return Error;
  }
};
