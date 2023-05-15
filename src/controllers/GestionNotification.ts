import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import { AnyArray } from "mongoose";
import Todo from "../class/Notification.Todo";
abstract class Notification {
  public async createNotification(
    req: Request,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {
    try {
      let idToken: any = req.headers.authorization;
      const verifyToken: any = jwt.verify(idToken, SECRET);
      const { title, description, type } = req.body;
      let responseNotification = await new Todo().createNotificationClass(
        title,
        description,
        type,
        verifyToken.id
      );
      res.status(200).json({ message: "ok", responseNotification });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en el servidor ok", error });
    }
  }

  public async getNotification(
    req: Request,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {
    let idToken: any = req.params.id;
   
    const verifyToken: any = jwt.verify(idToken, SECRET);
    if (verifyToken.id) {
      let responseNotification = await new Todo().getNotificationClass(
        verifyToken.id
      );

      res.status(200).json({ message: "ok", responseNotification });
    } else {
      return res.status(401).json({ message: "NO_PERMISION" });
    }
  }
  public async getNotificationId(
    req: Request,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {
    res.send("get id");
  }

  public async deleteNotification(
    req: Request,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {
    if (req.params.id) {
      let responseNotification = await new Todo().deleteNotificationClass(
        req.params.id
      );

      res.status(200).json({ message: "ok", responseNotification });
    } else {
      return res.status(401).json({ message: "NO_PERMISION" });
    }
  }
}
export default Notification;
