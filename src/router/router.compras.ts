import { Router } from "express";
import ComprasClass from "../controllers/GestionCompras";
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";

const valid = new ValidationTokenAndCreateToken();
const isAllowed = new AllowedModules();
const router: Router = Router();
class RouterCompras extends ComprasClass {
  public PostComprasRouter() {
   return router.post("/compras", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.postCompras);
  }
  public GetComprasRouter() {
   return router.get("/compras/:id", valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.getCompras);
  }
  public GetComprasFvRouter() {
   return router.get("/comprasfv", valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.getComprasFv);
  }
}

export default RouterCompras;
