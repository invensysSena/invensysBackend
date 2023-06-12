import { Router } from "express";
import ComprasClass from "../controllers/GestionCompras";

const router: Router = Router();
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
const valid = new ValidationTokenAndCreateToken();
class RouterCompras extends ComprasClass {
  public PostComprasRouter() {
    router.post("/compras", valid.verifyTokenAndAdmin, this.postCompras);
    return router;
  }
  public GetComprasRouter() {
    router.get("/compras/:id", valid.verifyTokenAndAdmin, this.getCompras);
    return router;
  }

  public GetComprasFvRouter() {
    router.get("/comprasfv", valid.verifyTokenAndAdmin, this.getComprasFv);
    return router;
  }
}

export default RouterCompras;
