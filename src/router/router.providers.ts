import { Router } from "express";
const router: Router = Router();
import ManageProviders from "../controllers/GestionProviders";
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";
const valid = new ValidationTokenAndCreateToken();
const isAllowed = new AllowedModules();
class RouterProviders extends ManageProviders {
  public GetProviders() {
    return router.get("/providers/:id", valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.getProviders);
  }
  public GetProvidersId() {
    return router.get("/providers/:id", valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.getProvidersId);
  }
  public PostProviders() {
    return router.post("/providers", valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.postProviders);
  }
  public PutProviders() {
    return router.put("/providers/:id", valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.putProviders);
  }
  public DeleteProviders() {
    return router.delete("/providers/:id", valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.deleteProviders);
  }
  public GetProvidersProducts() {
    return router.get("/providers/:id/products", valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.getProvidersProducts);
  }
}

export default RouterProviders;
