import { Router } from "express";
import ComprasClass from "../controllers/GestionCompras";

const router: Router = Router();
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";
const valid = new ValidationTokenAndCreateToken();
const isAllowed = new AllowedModules();
class RouterCompras extends ComprasClass {
  public PostComprasRouter() {
    router.post("/compras", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.postCompras);
    return router;
  }
  public GetComprasRouter() {
    router.get("/compras/:id", valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.getCompras);
    return router;
  }
  public GetComprasFvRouter() {
    router.get("/comprasfv", valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.getComprasFv);
    return router;
  }
}

export default RouterCompras;
