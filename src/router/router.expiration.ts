import  { Router } from "express";
import ManageExpiration from "../controllers/GestionExpiration";

const router: Router = Router();
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";
const valid = new ValidationTokenAndCreateToken();
const isAllowed = new AllowedModules();
class ExpirationRouter extends ManageExpiration {
  public PostCaducidad() {
    router.post("/caducidad", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.CreateExpiration);
    return router;
  }
  public GetCaducidad() {
    router.get("/caducidad", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.GetExpiration);
    return router;
  }
}

export default ExpirationRouter;
