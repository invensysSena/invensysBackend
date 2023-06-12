import { Router } from "express";
const router: Router = Router();
import ManageProviders from "../controllers/GestionProviders";
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
const valid = new ValidationTokenAndCreateToken();
class RouterProviders extends ManageProviders {
  public GetProviders() {
    router.get("/providers/:id", valid.verifyTokenAndAdmin, this.getProviders);
    return router;
  }
  public GetProvidersId() {
    router.get("/providers/:id", valid.verifyTokenAndAdmin, this.getProvidersId);
    return router;
  }
  public PostProviders() {
    router.post("/providers", valid.verifyTokenAndAdmin, this.postProviders);
    return router;
  }
  public PutProviders() {
    router.put("/providers/:id", valid.verifyTokenAndAdmin, this.putProviders);
    return router;
  }
  public DeleteProviders() {
    router.delete("/providers/:id", valid.verifyTokenAndAdmin, this.deleteProviders);
    return router;
  }
  public GetProvidersProducts() {
    router.get("/providers/:id/products", valid.verifyTokenAndAdmin, this.getProvidersProducts);
    return router;
  }
}

export default RouterProviders;
