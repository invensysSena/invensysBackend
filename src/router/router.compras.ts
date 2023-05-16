import { Router } from "express";
import ComprasClass from "../controllers/GestionCompras";

const router: Router = Router();

class RouterCompras extends ComprasClass {
  public PostComprasRouter() {
    router.post("/compras", this.postCompras);
    return router;
  }
}

export default RouterCompras;
