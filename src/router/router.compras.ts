import { Router } from "express";
import ComprasClass from "../controllers/GestionCompras";

const router: Router = Router();

class RouterCompras extends ComprasClass {
  public PostComprasRouter() {
    router.post("/compras", this.postCompras);
    return router;
  }
  public GetComprasRouter() {
    router.get("/compras/:id", this.getCompras);
    return router;
  }

  public GetComprasFvRouter() {
    router.get("/comprasfv", this.getComprasFv);
    return router;
  }
}

export default RouterCompras;
