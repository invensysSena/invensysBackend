import { Router } from "express";
import MaganeIGeneral from "../controllers/GestionInventaryGeneral";

const router: Router = Router();

class RouterInventaryGeneral extends MaganeIGeneral {
  public PostInventaryGeneral() {
    router.post("/inventGeneral", this.postInventaryGeneral);
  
    return router;
  }

    public GetInventaryGeneral() {
    router.get("/inventGeneral/:id", this.getInventaryGeneral);
    return router;
    }

    public PutInventaryGeneral() {
    router.put("/inventGeneral/:id", this.putInventaryGeneral);
    return router;
    }

    public DeleteInventaryGeneral() {
    router.delete("/inventGeneral/:id", this.deleteInventaryGeneral);
    return router;
    }
}

export default RouterInventaryGeneral;
