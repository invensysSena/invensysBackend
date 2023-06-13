import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import InventoryProduct from "../controllers/GestionInventory";
const router: Router = Router();
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";
const valid = new ValidationTokenAndCreateToken();
const isAllowed = new AllowedModules();
class RouterInventory extends InventoryProduct {
  public PostInventory() {
    router.post(
      "/inventory",
      valid.verifyTokenAndAdmin,
      isAllowed.isAllowedPermissions,
      this.postInventory
    );
    return router;
  }

  public GetInventory() {
    router.get(
      "/inventory/:id",
      valid.verifyTokenAndAdmin,
      isAllowed.isAllowedPermissions,
      this.getInventory
    );
    return router;
  }

  public PutInventoryId() {
    router.put(
      "/inventory/:_id",
      valid.verifyTokenAndAdmin,
      isAllowed.isAllowedPermissions,
      this.putInventoryId
    );
    return router;
  }
  
  public DeleteInventoryId() {
    router.delete("/inventory/:_id", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.deleteInventoryId);
    return router;
  }
  public UploadInsertProduct() {
    router.post("/subProducts", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.UploadInsertProducts);
    return router;
  }
  public getSubProducts() {
    router.get("/subProducts/:id", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.GetSubProducta);
    return router;
  }

  public postTranslateProducts() {
    router.post("/translateProducts", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.TranslateProducts);
    return router;
  }
  public getTranslateProducts() {
    router.get("/translateProducts/:id",  valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions,this.GetTranslateProducts);
    return router;
  }
  public UpdateSubProducts() {
    router.put("/translateSubProducts/:id", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.postTranslateProductsOrigen);
    return router;
  }
  public UpdateEmailBodega() {
    router.put("/updateEmailBodega/:id", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.UpdateCorreoBodega);
    return router;
  }

  public GetAllSubProducts() {
    router.get("/subProducts", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.SubProductsIdAll);
    return router;
  }
  public DisminucionUnidades() {
    router.get("/disminucionUnidades", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.searchProductUnidadesDisminucon);
    return router;
  }
}

export default RouterInventory;
