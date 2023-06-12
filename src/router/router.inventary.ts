import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import InventoryProduct from "../controllers/GestionInventory";
const router: Router = Router();
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
const valid = new ValidationTokenAndCreateToken();
class RouterInventory extends InventoryProduct {
  public PostInventory() {
    router.post("/inventory", valid.verifyTokenAndAdmin, this.postInventory);
    return router;
  }

  public GetInventory() {
    router.get("/inventory/:id", valid.verifyTokenAndAdmin, this.getInventory);
    return router;
  }

  public PutInventoryId() {
    router.put("/inventory/:_id", valid.verifyTokenAndAdmin, this.putInventoryId);
    return router;
  }
  
  public DeleteInventoryId() {
    router.delete("/inventory/:_id", valid.verifyTokenAndAdmin, this.deleteInventoryId);
    return router;
  }
  public UploadInsertProduct() {
    router.post("/subProducts", valid.verifyTokenAndAdmin, this.UploadInsertProducts);
    return router;
  }
  public getSubProducts() {
    router.get("/subProducts/:id", valid.verifyTokenAndAdmin, this.GetSubProducta);
    return router;
  }

  public postTranslateProducts() {
    router.post("/translateProducts", valid.verifyTokenAndAdmin, this.TranslateProducts);
    return router;
  }
  public getTranslateProducts() {
    router.get("/translateProducts/:id",  valid.verifyTokenAndAdmin,this.GetTranslateProducts);
    return router;
  }
  public UpdateSubProducts() {
    router.put("/translateSubProducts/:id", valid.verifyTokenAndAdmin, this.postTranslateProductsOrigen);
    return router;
  }
  public UpdateEmailBodega() {
    router.put("/updateEmailBodega/:id", valid.verifyTokenAndAdmin, this.UpdateCorreoBodega);
    return router;
  }

  public GetAllSubProducts() {
    router.get("/subProducts", valid.verifyTokenAndAdmin, this.SubProductsIdAll);
    return router;
  }
  public DisminucionUnidades() {
    router.get("/disminucionUnidades", valid.verifyTokenAndAdmin, this.searchProductUnidadesDisminucon);
    return router;
  }
}

export default RouterInventory;
