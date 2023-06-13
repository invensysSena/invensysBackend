import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import Notification from "../controllers/GestionNotification";
const router: Router = Router();
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";
const valid = new ValidationTokenAndCreateToken();
const isAllowed = new AllowedModules();

class RouterNotification extends Notification {
  public GetNotification() {
    router.get("/notification/:id", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.getNotification);
    return router;
  }

  public GetNotificationId() {
    router.get("/notificationId/:_id", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.getNotificationId);
    return router;
  }

  public DeleteNotificationId() {
    router.delete("/notification/:id", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.deleteNotification);
    return router;
  }
  public PostcreateNotification() {
    router.post("/notification", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.createNotification);
    return router;
  }
  public DeleteNotificationEstado() {
    router.delete("/notificationTodoEstado", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.estadoDeleteNotification);
    return router;
  }
}

export default RouterNotification;
