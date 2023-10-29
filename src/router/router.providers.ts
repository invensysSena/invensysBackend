import { Router } from "express";
const router: Router = Router();
import ManageProviders from "../controllers/GestionProviders";
import { AllowedModules } from "../middlewares/isAlloweedModule";
import passport from "passport";
const isAllowed = new AllowedModules();

let AuthPassport = passport.authenticate("jwt",{session: false,});
class RouterProviders extends ManageProviders {
  public GetProviders() {
    return router.get("/providers", AuthPassport,isAllowed.isAllowedPermissions, this.getProviders);
  }
  public GetProvidersId() {
    return router.get("/providers/:id", AuthPassport,isAllowed.isAllowedPermissions, this.getProvidersId);
  }
  public PostProviders() {
    return router.post("/providers", AuthPassport,isAllowed.isAllowedPermissions, this.postProviders);
  }
  public PutProviders() {
    return router.put("/providers/", AuthPassport,isAllowed.isAllowedPermissions, this.putProviders);
  }
  public DeleteProviders() {
    return router.delete("/providers/", AuthPassport,isAllowed.isAllowedPermissions, this.deleteProviders);
  }
  public GetProvidersProducts() {
    return router.get("/providers/:id/products", AuthPassport,isAllowed.isAllowedPermissions, this.getProvidersProducts);
  }
}

export default RouterProviders;
