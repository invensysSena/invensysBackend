import { Router } from "express";
import MaganeIGeneral from "../controllers/GestionInventaryGeneral";

const router: Router = Router();
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";
const valid = new ValidationTokenAndCreateToken();
const isAllowed = new AllowedModules();
class RouterInventaryGeneral extends MaganeIGeneral {
  public PostInventaryGeneral() {
    router.post("/inventGeneral",valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.postInventaryGeneral);
  
    return router;
  }

    public GetInventaryGeneral() {
    router.get("/inventGeneral/:id",valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.getInventaryGeneral);
    return router;
    }

    public PutInventaryGeneral() {
    router.put("/inventGeneral/:id",valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.putInventaryGeneral);
    return router;
    }

    public DeleteInventaryGeneral() {
    router.delete("/inventGeneral/:id",valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.deleteInventaryGeneral);
    return router;
    }
}

export default RouterInventaryGeneral;
