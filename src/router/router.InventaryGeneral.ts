import { Router } from "express";
import MaganeIGeneral from "../controllers/GestionInventaryGeneral";
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";

const router: Router = Router();
const valid = new ValidationTokenAndCreateToken();
const isAllowed = new AllowedModules();

class RouterInventaryGeneral extends MaganeIGeneral {
  public PostInventaryGeneral() {
    return router.post("/inventGeneral",valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.postInventaryGeneral);
  }
    public GetInventaryGeneral() {
    return router.get("/inventGeneral/:id",valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.getInventaryGeneral);
    }
    public PutInventaryGeneral() {
    return router.put("/inventGeneral/:id",valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.putInventaryGeneral);
    }
    public DeleteInventaryGeneral() {
    return router.delete("/inventGeneral/:id",valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.deleteInventaryGeneral);
    }
}

export default RouterInventaryGeneral;
