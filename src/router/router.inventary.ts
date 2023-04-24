import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import InventoryProduct from "../controllers/GestionInventory";
const router: Router = Router();

class RouterInventory extends InventoryProduct {
  public PostInventory() {
    router.post("/inventory", this.postInventory);
    return router;
  }

  public GetInventory() {
    router.get("/inventory/:id", this.getInventory);
    return router;
  }

  public PutInventoryId() {
    router.put("/inventory/:_id", this.putInventoryId);
    return router;
  }
  // public PostInventory(){
  //     router.post('/inventory',this.postInventory)
  //     return router;

  public DeleteInventoryId() {
    router.delete("/inventory/:_id", this.deleteInventoryId);
    return router;
  }
  public UploadInsertProduct() {
    router.post("/subProducts", this.UploadInsertProducts);
    return router;
  }
  public getSubProducts() {
    router.get("/subProducts/:id", this.GetSubProducta);
    return router;
  }

  public postTranslateProducts() {
    router.post("/translateProducts", this.TranslateProducts);
    return router;
  }
  public getTranslateProducts() {
    router.get("/translateProducts/:id", this.GetTranslateProducts);
    return router;
  }
  public UpdateSubProducts() {
    router.put("/translateSubProducts/:id", this.postTranslateProductsOrigen);
    return router;
  }
}

export default RouterInventory;
