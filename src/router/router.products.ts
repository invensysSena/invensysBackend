import { Router } from "express";
const router: Router = Router();
import ManageProducts from "../controllers/GestionProductos";
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";
const isAllowed = new AllowedModules();
const valid = new ValidationTokenAndCreateToken();

class RouterProducts extends ManageProducts {
  public Getproducts() {
   return router.get("/getProducts/:_id",valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions,this.getProducts);
  }
  public GetproductsId() {
    return router.get("/getProductsId/:id",valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions,
    this.getProductsId);
  }
  public GetproductsIdCategory() {
    return router.get("/productsCategory/:idCategory",valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions,
    this.getProductsIdCategory);
  }
  public PostProduct() {
    return router.post("/createProducts",valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions,this.postProducts);
  }
  public PutProducts() {
    return router.put("/updateProducts/:id",valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions,this.putProducts);
  }
  public DeleteProduct() {
    return router.delete("/deleteProducts/:id",valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions,
    this.deleteProducts);
  }
}

export default RouterProducts;
