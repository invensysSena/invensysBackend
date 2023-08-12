import {Router} from 'express';
import AllModules from '../controllers/GestionInicio';
import { AllowedModules } from "../middlewares/isAlloweedModule";
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";

const valid = new ValidationTokenAndCreateToken();
const isAllowed = new AllowedModules();
const router:Router = Router()

class RouterInicio extends AllModules{
    public GetModules (){
       return router.get("/modules/:id",valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions,this.getModules);
    }
}

export default RouterInicio;