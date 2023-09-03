import { Router } from "express";
import InventoryProduct from "../controllers/GestionInventory";
import { AllowedModules } from "../middlewares/isAlloweedModule";
import passport from "passport";

const router: Router = Router();
const isAllowed = new AllowedModules();

let AuthPassport = passport.authenticate("jwt",{session: false,});
class RouterInventory extends InventoryProduct {
  public PostInventory() {
   return router.post("/inventory",AuthPassport,isAllowed.isAllowedPermissions,this.postInventory);
  }
  public GetInventory() {
   return router.get("/inventory/:id",AuthPassport,isAllowed.isAllowedPermissions,this.getInventory);
  }
  public PutInventoryId() {
   return router.put("/inventory/:_id",AuthPassport,isAllowed.isAllowedPermissions,this.putInventoryId);
  }
  
  public DeleteInventoryId() {
   return router.delete("/inventory/:_id", AuthPassport, isAllowed.isAllowedPermissions, this.deleteInventoryId);
  }
  public UploadInsertProduct() {
   return router.post("/subProducts", AuthPassport, isAllowed.isAllowedPermissions, this.UploadInsertProducts);
  }
  public getSubProducts() {
   return router.get("/subProducts/:id", AuthPassport, isAllowed.isAllowedPermissions, this.GetSubProducta);
  }
  public postTranslateProducts() {
   return router.post("/translateProducts", AuthPassport, isAllowed.isAllowedPermissions, this.TranslateProducts);
  }
  public getTranslateProducts() {
   return router.get("/translateProducts/:id",  AuthPassport, isAllowed.isAllowedPermissions,this.GetTranslateProducts);
  }
  public UpdateSubProducts() {
   return router.put("/translateSubProducts/:id", AuthPassport, isAllowed.isAllowedPermissions, this.postTranslateProductsOrigen);
  }
  public UpdateEmailBodega() {
   return router.put("/updateEmailBodega/:id", passport.authenticate("jwt",{session: false,}), isAllowed.isAllowedPermissions, this.UpdateCorreoBodega);
  }

  public GetAllSubProducts() {
   return router.get("/subProducts", passport.authenticate("jwt",{session: false,}), isAllowed.isAllowedPermissions, this.SubProductsIdAll);
  }
  public DisminucionUnidades() {
   return router.get("/disminucionUnidades", passport.authenticate("jwt",{session: false,}), isAllowed.isAllowedPermissions, this.searchProductUnidadesDisminucon);
  }
}

export default RouterInventory;
