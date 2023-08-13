import { Request, Response, NextFunction } from "express";
import Todo from "../class/Notification.Todo";
abstract class Notification {
  public async createNotification(req: Request|any,res: Response,_next: Partial<NextFunction>
  ){
    try {
      let verifyToken = req.users.id;
      let responsable = req.users.email;
      const { title, description, type } = req.body;
      let responseNotification = await new Todo().createNotificationClass(
        title,description,responsable, type,verifyToken
      );
      res.status(200).json({ message: "ok", responseNotification });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en el servidor ok", error });
    }
  }

  public async getNotification(req: Request|any,res: Response,_next: Partial<NextFunction>) {
    try {
      let verifyToken = req.users.id;
        let responseNotification = await new Todo().getNotificationClass(
          verifyToken
        );
        res.status(200).json({ message: "ok", responseNotification });
     
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en el servidor ok", error });
    }
  }
  public async getNotificationId(_req: Request,res: Response,_next: Partial<NextFunction>
  ) {
    res.send("get id");
  }
  public async deleteNotification(req: Request,res: Response,_next: Partial<NextFunction>) {
    if (req.params.id) {
      let responseNotification = await new Todo().deleteNotificationClass(
        req.params.id
      );
      res.status(200).json({ message: "ok", responseNotification });
    } else {
      return res.status(401).json({ message: "NO_PERMISION" });
    }
  }
  public estadoDeleteNotification = async (req: Request|any,res: Response,_next: Partial<NextFunction>
  ) => {
    try {
      let verifyToken = req.users.id;
        let responseNotification = await new Todo().deleteEstado(
          verifyToken)
        res.status(200).json({ message: "ok", responseNotification });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en el servidor ok", error });
    }
  };
}
export default Notification;
