import {Router} from 'express';
import AllModules from '../controllers/GestionInicio';
import { AllowedModules } from "../middlewares/isAlloweedModule";
import passport from 'passport';
const isAllowed = new AllowedModules();
const router:Router = Router()
let AuthPassport = passport.authenticate("jwt",{session: false,});
class RouterInicio extends AllModules{
    public GetModules (){
       return router.get("/modules",AuthPassport,isAllowed.isAllowedPermissions,this.getModules);
    }
}

export default RouterInicio;