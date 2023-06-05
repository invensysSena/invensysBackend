import  { Router } from "express";
import ManageExpiration from "../controllers/GestionExpiration";

const router: Router = Router();

class ExpirationRouter extends ManageExpiration {
  public PostCaducidad() {
    router.post("/caducidad", this.CreateExpiration);
    return router;
  }
  public GetCaducidad() {
    router.get("/caducidad", this.GetExpiration);
    return router;
  }
}

export default ExpirationRouter;
