import  { Router } from "express";
import ManageExpiration from "../controllers/GestionExpiration";

const router: Router = Router();
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
const valid = new ValidationTokenAndCreateToken();
class ExpirationRouter extends ManageExpiration {
  public PostCaducidad() {
    router.post("/caducidad", valid.verifyTokenAndAdmin, this.CreateExpiration);
    return router;
  }
  public GetCaducidad() {
    router.get("/caducidad", valid.verifyTokenAndAdmin, this.GetExpiration);
    return router;
  }
}

export default ExpirationRouter;
