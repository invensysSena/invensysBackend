import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import Todo from "../class/Notification.Todo";
import { QueryError, RowDataPacket } from "mysql2";

class ResourceDeleteAllUsers
{
    public async deleteAllUsers(req: Request|any,res: Response,_next: Partial<NextFunction>) {
        try {
          let tokenIdAcc: any = req.headers.authorization;
          let responsable = req.user.email;
          const verifyToken: Array<any> | any = jwt.verify(tokenIdAcc, SECRET)!;
          const { id } = verifyToken;
          if (id) {
            const conn: any = await conexion.connect();
            conn.query("DELETE  FROM services WHERE idAccountUsers = ?", [
              req.body.deleteData,
            ]);
            conn.query(
              `CALL SELECT_ALL_MODULE_USERS('${req.body.deleteData}')`,
              (error: QueryError, rows: RowDataPacket) => {
                if (rows[0].length > 0) {
                  conn.query(
                    `CALL DELETE_ALL_USERS('${req.body.deleteData}','${rows[0][0].IDmodulo}')`,
                    async (error: QueryError, rows: RowDataPacket) => {
                      try {
                        if (rows) {
                          await new Todo().createNotificationClass(
                            "Se elimino un usuario de la plataforma",responsable,
                            "usuario",
                            "users",
                            id
                          );
    
                          return res
                            .status(200)
                            .json({ message: "DELETE_ALL_USERS" });
                        } else {
                          return res
                            .status(400)
                            .json({ message: "ERROR_DELETE_ALL_USERS", error });
                        }
                      } catch (error) {
                        return res
                          .status(400)
                          .json({ message: "ERROR_DELETE_ALL_USERS", error });
                      }
                    }
                  );
                } else {
                  return res
                    .status(400)
                    .json({ message: "ERROR_DELETE_ALL_USERS", error });
                }
              }
            );
          } else {
            return res.status(400).json({ message: "ERROR_SESSION" });
          }
        } catch (error) {
          return res.status(400).json({ message: "ERROR_SESSION" });
        }
      }
}

export const resourceDeleteAllUsers = new ResourceDeleteAllUsers();