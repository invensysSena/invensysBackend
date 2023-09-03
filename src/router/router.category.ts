import { Router } from "express";
import Categorys from "../controllers/GestionCategory";
import { AllowedModules } from "../middlewares/isAlloweedModule";
import passport from "passport";

const router: Router = Router();

const isAllowed = new AllowedModules();
let AuthPassport = passport.authenticate("jwt",{session: false,});
class RouterCategory extends Categorys {
  public CreateCategory() {
    return router.post("/category", passport.authenticate("jwt",{
      session: false,

    }), isAllowed.isAllowedPermissions,this.createCategory);
  }
  public GetCategory() {
    return router.get("/category/:id",AuthPassport,isAllowed.isAllowedPermissions,this.getCategory);
  }
  public GetCategoryId() {
    return router.get("/category/:_id",AuthPassport,isAllowed.isAllowedPermissions,this.getCategoryId);
  }
  public PutCategory() {
    return router.put("/category/:_id",AuthPassport,isAllowed.isAllowedPermissions,this.putCategory);
  }
  public DeleteCategory() {
    return router.delete("/category/:_id",AuthPassport,isAllowed.isAllowedPermissions,passport.authenticate("jwt"),this.deleteCategory);
  }
}

export default RouterCategory;
