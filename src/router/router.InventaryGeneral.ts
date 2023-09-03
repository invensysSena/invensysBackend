import { Router } from "express";
import MaganeIGeneral from "../controllers/GestionInventaryGeneral";
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";
import passport from "passport";

const router: Router = Router();
const valid = new ValidationTokenAndCreateToken();
const isAllowed = new AllowedModules();
let AuthPassport = passport.authenticate("jwt",{session: false,});
class RouterInventaryGeneral extends MaganeIGeneral {
  public PostInventaryGeneral() {
    return router.post("/inventGeneral",AuthPassport, isAllowed.isAllowedPermissions, this.postInventaryGeneral);
  }
    public GetInventaryGeneral() {
    return router.get("/inventGeneral/:id",AuthPassport, isAllowed.isAllowedPermissions, this.getInventaryGeneral);
    }
    public PutInventaryGeneral() {
    return router.put("/inventGeneral/:id",AuthPassport, isAllowed.isAllowedPermissions, this.putInventaryGeneral);
    }
    public DeleteInventaryGeneral() {
    return router.delete("/inventGeneral/:id",AuthPassport, isAllowed.isAllowedPermissions, this.deleteInventaryGeneral);
    }
}

export default RouterInventaryGeneral;
