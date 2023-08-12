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
   return router.post("/inventory",valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions,this.postInventory);
  }
  public GetInventory() {
   return router.get("/inventory/:id",valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions,this.getInventory);
  }
  public PutInventoryId() {
   return router.put("/inventory/:_id",valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions,this.putInventoryId);
  }
  
  public DeleteInventoryId() {
   return router.delete("/inventory/:_id", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.deleteInventoryId);
  }
  public UploadInsertProduct() {
   return router.post("/subProducts", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.UploadInsertProducts);
  }
  public getSubProducts() {
   return router.get("/subProducts/:id", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.GetSubProducta);
  }
  public postTranslateProducts() {
   return router.post("/translateProducts", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.TranslateProducts);
  }
  public getTranslateProducts() {
   return router.get("/translateProducts/:id",  valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions,this.GetTranslateProducts);
  }
  public UpdateSubProducts() {
   return router.put("/translateSubProducts/:id", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.postTranslateProductsOrigen);
  }
  public UpdateEmailBodega() {
   return router.put("/updateEmailBodega/:id", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.UpdateCorreoBodega);
  }

  public GetAllSubProducts() {
   return router.get("/subProducts", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.SubProductsIdAll);
  }
  public DisminucionUnidades() {
   return router.get("/disminucionUnidades", valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.searchProductUnidadesDisminucon);
  }
}

export default RouterInventory;
