import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";

class ChangeDataController {
  public async UpdatePassAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Request | Response | any> {
    try {
      const token = req.params["authorization"];
      const decoded: any = jwt.verify(token, SECRET);
      const validateToken = decoded.id;
      const { password } = req.body.data;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const conn: any = await conexion.connect();
      await conn.query(
        "select password from admin where idUsers = ?",
        [validateToken],
        async (err: any, result: any) => {
          if (err) {
            return res.status(400).json({
              ok: false,
              message: "ERROR_DB",
            });
          }
          if (result.length > 0) {
            const compare = await bcrypt.compare(password, result[0].password);
            if (compare) {
              return res.status(400).json({
                ok: false,
                message: "PASSWORD_EQUAL",
              });
            }
          } else {
            await conn.query("update admin set ? where idUsers = ?", [
              { password: hash },
              validateToken,
            ]);

            return res.status(200).json({
              ok: true,
              message: "UPDATE_PASSWORD_SUCCESS",
            });
          }
        }
      );
    } catch (error) {
      next(error);
    }
  }
}

export default ChangeDataController;
