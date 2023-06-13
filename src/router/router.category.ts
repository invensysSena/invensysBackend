import { Router } from "express";
const router: Router = Router();
import Categorys from "../controllers/GestionCategory";

import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";

import { AllowedModules } from "../middlewares/isAlloweedModule";

const isAllowed = new AllowedModules();

const valid = new ValidationTokenAndCreateToken();
class RouterCategory extends Categorys {
  public CreateCategory() {
    router.post(
      "/category",
      valid.verifyTokenAndAdmin,
      isAllowed.isAllowedPermissions,
      this.createCategory
    );
    return router;
  }

  public GetCategory() {
    router.get(
      "/category/:id",
      valid.verifyTokenAndAdmin,
      isAllowed.isAllowedPermissions,
      this.getCategory
    );
    return router;
  }

  public GetCategoryId() {
    router.get(
      "/category/:_id",
      valid.verifyTokenAndAdmin,
      isAllowed.isAllowedPermissions,
      this.getCategoryId
    );
    return router;
  }

  public PutCategory() {
    router.put(
      "/category/:_id",
      valid.verifyTokenAndAdmin,
      isAllowed.isAllowedPermissions,
      this.putCategory
    );
    return router;
  }

  public DeleteCategory() {
    router.delete(
      "/category/:_id",
      valid.verifyTokenAndAdmin,
      isAllowed.isAllowedPermissions,
      this.deleteCategory
    );
    return router;
  }

  public GetCategoryProducts() {
    router.get(
      "/category/products/:id",
      valid.verifyTokenAndAdmin,
      isAllowed.isAllowedPermissions,
      this.getCategoryProducts
    );
    return router;
  }
}

export default RouterCategory;
