import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import Notification from "../controllers/GestionNotification";
const router: Router = Router();

class RouterNotification extends Notification {
  public GetNotification() {
    router.get("/notification/:id", this.getNotification);
    return router;
  }

  public GetNotificationId() {
    router.get("/notificationId/:_id", this.getNotificationId);
    return router;
  }

  public DeleteNotificationId() {
    router.delete("/notification/:id", this.deleteNotification);
    return router;
  }
  public PostcreateNotification() {
    router.post("/notification", this.createNotification);
    return router;
  }
  public DeleteNotificationEstado() {
    router.delete("/notificationTodoEstado", this.estadoDeleteNotification);
    return router;
  }
}

export default RouterNotification;
