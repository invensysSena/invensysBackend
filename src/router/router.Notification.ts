import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import Notification from "../controllers/GestionNotification";
const router: Router = Router();
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
const valid = new ValidationTokenAndCreateToken();
class RouterNotification extends Notification {
  public GetNotification() {
    router.get("/notification/:id", valid.verifyTokenAndAdmin, this.getNotification);
    return router;
  }

  public GetNotificationId() {
    router.get("/notificationId/:_id", valid.verifyTokenAndAdmin, this.getNotificationId);
    return router;
  }

  public DeleteNotificationId() {
    router.delete("/notification/:id", valid.verifyTokenAndAdmin, this.deleteNotification);
    return router;
  }
  public PostcreateNotification() {
    router.post("/notification", valid.verifyTokenAndAdmin, this.createNotification);
    return router;
  }
  public DeleteNotificationEstado() {
    router.delete("/notificationTodoEstado", valid.verifyTokenAndAdmin, this.estadoDeleteNotification);
    return router;
  }
}

export default RouterNotification;
