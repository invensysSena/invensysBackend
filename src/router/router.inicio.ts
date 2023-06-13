import {Router} from 'express';
import AllModules from '../controllers/GestionInicio';

const router:Router = Router()
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";
const valid = new ValidationTokenAndCreateToken();
const isAllowed = new AllowedModules();
class RouterInicio extends AllModules{
    public GetModules (){
        router.get(
          "/modules/:id",
          valid.verifyTokenAndAdmin,
          isAllowed.isAllowedPermissions,
          this.getModules
        );
        return router;
    }
}

export default RouterInicio;