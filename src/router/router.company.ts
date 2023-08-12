import {Router} from 'express';
import ManageCompany from '../controllers/GestionCompany';
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";

const router: Router = Router();
const valid = new ValidationTokenAndCreateToken();
const isAllowed = new AllowedModules();

class RouterCompany extends ManageCompany {
    public PostCompany(){
        return router.post('/company',valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.postCompany)
    }
    public GetCompany(){
        return router.get('/company',valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.getCompany)
    }
    public UpdateCompany(){
        return router.put('/company/:id',valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.updateCompany)
    }
    public DeleteCompany(){
        return router.delete("/company/:id",valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions,this.deleteCompany);
    }
}

export default RouterCompany;