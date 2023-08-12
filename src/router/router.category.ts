import { Router } from "express";
import Categorys from "../controllers/GestionCategory";
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";

const router: Router = Router();
const isAllowed = new AllowedModules();
const valid = new ValidationTokenAndCreateToken();

class RouterCategory extends Categorys {
  public CreateCategory() {
    return router.post("/category",valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions,this.createCategory);
  }
  public GetCategory() {
    return router.get("/category/:id",valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions,this.getCategory);
  }
  public GetCategoryId() {
    return router.get("/category/:_id",valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions,this.getCategoryId);
  }
  public PutCategory() {
    return router.put("/category/:_id",valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions,this.putCategory);
  }
  public DeleteCategory() {
    return router.delete("/category/:_id",valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions,this.deleteCategory);
  }
}

export default RouterCategory;
