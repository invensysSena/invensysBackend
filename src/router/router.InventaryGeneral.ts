import { Router } from "express";
import MaganeIGeneral from "../controllers/GestionInventaryGeneral";

const router: Router = Router();
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
const valid = new ValidationTokenAndCreateToken();
class RouterInventaryGeneral extends MaganeIGeneral {
  public PostInventaryGeneral() {
    router.post("/inventGeneral",valid.verifyTokenAndAdmin, this.postInventaryGeneral);
  
    return router;
  }

    public GetInventaryGeneral() {
    router.get("/inventGeneral/:id",valid.verifyTokenAndAdmin, this.getInventaryGeneral);
    return router;
    }

    public PutInventaryGeneral() {
    router.put("/inventGeneral/:id",valid.verifyTokenAndAdmin, this.putInventaryGeneral);
    return router;
    }

    public DeleteInventaryGeneral() {
    router.delete("/inventGeneral/:id",valid.verifyTokenAndAdmin, this.deleteInventaryGeneral);
    return router;
    }
}

export default RouterInventaryGeneral;
