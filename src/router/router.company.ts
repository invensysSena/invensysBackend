import {Router} from 'express';
import ManageCompany from '../controllers/GestionCompany';

const router: Router = Router();
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";
const valid = new ValidationTokenAndCreateToken();
const isAllowed = new AllowedModules();
class RouterCompany extends ManageCompany {
    public PostCompany(){
        router.post('/company',valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.postCompany)
        return router;
    }

    public GetCompany(){
        router.get('/company',valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.getCompany)
        return router;
    }

    public UpdateCompany(){
        router.put('/company/:id',valid.verifyTokenAndAdmin,isAllowed.isAllowedPermissions, this.updateCompany)
        return router;
    }

    public DeleteCompany(){
        router.delete(
          "/company/:id",
          valid.verifyTokenAndAdmin,
          isAllowed.isAllowedPermissions,
          this.deleteCompany
        );
        return router;
    }
}

export default RouterCompany;