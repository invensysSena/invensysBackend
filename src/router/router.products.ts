import { Router } from "express";
const router: Router = Router();
import ManageProducts from "../controllers/GestionProductos";
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";
const isAllowed = new AllowedModules();
const valid = new ValidationTokenAndCreateToken();

class RouterProducts extends ManageProducts {
  public Getproducts() {
    router.get(
      "/getProducts/:_id",
      valid.verifyTokenAndAdmin,
      isAllowed.isAllowedPermissions,
      this.getProducts
    );
    return router;
  }

  public GetproductsId() {
    router.get(
      "/getProductsId/:id",
      valid.verifyTokenAndAdmin,
      isAllowed.isAllowedPermissions,
      this.getProductsId
    );
    return router;
  }
  public GetproductsIdCategory() {
    router.get(
      "/productsCategory/:idCategory",
      valid.verifyTokenAndAdmin,
      isAllowed.isAllowedPermissions,
      this.getProductsIdCategory
    );
    return router;
  }

  public PostProduct() {
    router.post(
      "/createProducts",
      valid.verifyTokenAndAdmin,
      isAllowed.isAllowedPermissions,
      this.postProducts
    );
    return router;
  }

  public PutProducts() {
    router.put(
      "/updateProducts/:id",
      valid.verifyTokenAndAdmin,
      isAllowed.isAllowedPermissions,
      this.putProducts
    );
    return router;
  }

  public DeleteProduct() {
    router.delete(
      "/deleteProducts/:id",
      valid.verifyTokenAndAdmin,
      isAllowed.isAllowedPermissions,
      this.deleteProducts
    );
    return router;
  }
}

export default RouterProducts;
