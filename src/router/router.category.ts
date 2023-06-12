import { Router } from "express";
const router: Router = Router();
import Categorys from "../controllers/GestionCategory";

import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
const valid = new ValidationTokenAndCreateToken();
class RouterCategory extends Categorys {
  public CreateCategory() {
    router.post("/category", valid.verifyTokenAndAdmin, this.createCategory);
    return router;
  }

  public GetCategory() {
    router.get("/category/:id", valid.verifyTokenAndAdmin, this.getCategory);
    return router;
  }

  public GetCategoryId() {
    router.get("/category/:_id", valid.verifyTokenAndAdmin, this.getCategoryId);
    return router;
  }

  public PutCategory() {
    router.put("/category/:_id", valid.verifyTokenAndAdmin, this.putCategory);
    return router;
  }

  public DeleteCategory() {
    router.delete(
      "/category/:_id",
      valid.verifyTokenAndAdmin,
      this.deleteCategory
    );
    return router;
  }

  public GetCategoryProducts() {
    router.get("/category/products/:id", this.getCategoryProducts);
    return router;
  }
}

export default RouterCategory;
