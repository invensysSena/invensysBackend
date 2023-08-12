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
    return router.get("/notification/:id", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.getNotification);
  }
  public GetNotificationId() {
    return router.get("/notificationId/:_id", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.getNotificationId);
  }
  public DeleteNotificationId() {
    return router.delete("/notification/:id", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.deleteNotification);
  }
  public PostcreateNotification() {
    return router.post("/notification", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.createNotification);
  }
  public DeleteNotificationEstado() {
    return router.delete("/notificationTodoEstado", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.estadoDeleteNotification);
  }
}

export default RouterNotification;
