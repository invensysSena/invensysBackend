import { Router } from "express";
import ComprasClass from "../controllers/GestionCompras";
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";
import passport from "passport";
let AuthPassport = passport.authenticate("jwt",{session: false,});
const valid = new ValidationTokenAndCreateToken();
const isAllowed = new AllowedModules();
const router: Router = Router();
class RouterCompras extends ComprasClass {
  public PostComprasRouter() {
   return router.post("/compras", AuthPassport, isAllowed.isAllowedPermissions, this.postCompras);
  }
  public GetComprasRouter() {
   return router.get("/compras/:id", AuthPassport,isAllowed.isAllowedPermissions, this.getCompras);
  }
  public GetComprasFvRouter() {
   return router.get("/comprasfv", AuthPassport,isAllowed.isAllowedPermissions, this.getComprasFv);
  }
}

export default RouterCompras;
