import  { Router } from "express";
import ManageExpiration from "../controllers/GestionExpiration";

const router: Router = Router();

import { AllowedModules } from "../middlewares/isAlloweedModule";
import passport from "passport";
let AuthPassport = passport.authenticate("jwt",{session: false,});

const isAllowed = new AllowedModules();
class ExpirationRouter extends ManageExpiration {
  public PostCaducidad() {
   return router.post("/caducidad", AuthPassport, isAllowed.isAllowedPermissions, this.CreateExpiration);
  }
  public GetCaducidad() {
   return router.get("/caducidad", AuthPassport, isAllowed.isAllowedPermissions, this.GetExpiration);
  }
}

export default ExpirationRouter;
