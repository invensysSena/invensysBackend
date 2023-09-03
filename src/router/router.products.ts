import { Router } from "express";
const router: Router = Router();
import ManageProducts from "../controllers/GestionProductos";
import { AllowedModules } from "../middlewares/isAlloweedModule";
import passport from "passport";
const isAllowed = new AllowedModules();
let AuthPassport = passport.authenticate("jwt",{session: false,});
class RouterProducts extends ManageProducts {
  public Getproducts() {
   return router.get("/getProducts/:_id",AuthPassport,isAllowed.isAllowedPermissions,this.getProducts);
  }
  public GetproductsId() {
    return router.get("/getProductsId/:id",AuthPassport,isAllowed.isAllowedPermissions,
    this.getProductsId);
  }
  public GetproductsIdCategory() {
    return router.get("/productsCategory/:idCategory",AuthPassport,isAllowed.isAllowedPermissions,
    this.getProductsIdCategory);
  }
  public PostProduct() {
    return router.post("/createProducts",AuthPassport,isAllowed.isAllowedPermissions,this.postProducts);
  }
  public PutProducts() {
    return router.put("/updateProducts/:id",AuthPassport,isAllowed.isAllowedPermissions,this.putProducts);
  }
  public DeleteProduct() {
    return router.delete("/deleteProducts/:id",AuthPassport,isAllowed.isAllowedPermissions,
    this.deleteProducts);
  }
}

export default RouterProducts;
