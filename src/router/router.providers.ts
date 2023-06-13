import { Router } from "express";
const router: Router = Router();
import ManageProviders from "../controllers/GestionProviders";
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";
const valid = new ValidationTokenAndCreateToken();
const isAllowed = new AllowedModules();
class RouterProviders extends ManageProviders {
  public GetProviders() {
    router.get("/providers/:id", valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.getProviders);
    return router;
  }
  public GetProvidersId() {
    router.get("/providers/:id", valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.getProvidersId);
    return router;
  }
  public PostProviders() {
    router.post("/providers", valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.postProviders);
    return router;
  }
  public PutProviders() {
    router.put("/providers/:id", valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.putProviders);
    return router;
  }
  public DeleteProviders() {
    router.delete("/providers/:id", valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.deleteProviders);
    return router;
  }
  public GetProvidersProducts() {
    router.get("/providers/:id/products", valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.getProvidersProducts);
    return router;
  }
}

export default RouterProviders;
