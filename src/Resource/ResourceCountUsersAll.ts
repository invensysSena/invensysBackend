import { Request, Response, NextFunction } from "express";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; //
import { QueryError, RowDataPacket } from "mysql2";

class ResourceCountUsersAll {
  public async CountUsersAll(
    req: Request,
    res: Response,
    _next: Partial<NextFunction>
  ) {
    try {
      const verifyToken: Array<any> | any = jwt.verify(
        req.params.idToken,
        SECRET
      )!;
      const { id } = verifyToken;

      if (id) {
        const conn: any = await conexion.connect();
        conn.query(
          `CALL GET_COUNT_USERS('${id}')`,
          (error: QueryError, rows: RowDataPacket) => {
            conn.query(
              `CALL COUNT_STATE_USER('${id}')`,
              (error: any, rowsActive: any) => {
                conn.query(
                  `CALL COUNT_STATE_USER_INACTIVO('${id}')`,
                  (error: any, rowsInactive: any) => {
                    if (rows) {
                      return res.status(200).json({
                        message: "COUNT_USERS_ALL",
                        countUsers: rows[0][0].total,
                        stateActive: rowsActive[0][0].totalActive,
                        stateInactive: rowsInactive[0][0].totalActive,
                      });
                    } else {
                      return res
                        .status(400)
                        .json({ message: "ERROR_COUNT_USERS_ALL" });
                    }
                  }
                );
              }
            );
          }
        );
      }
    } catch (error) {
      return res.status(400).json({ message: "ERROR_SESSION" });
    }
  }
}

export const resourceCountUsersAll = new ResourceCountUsersAll();
