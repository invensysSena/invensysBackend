import {Router} from 'express';
import ManageCompany from '../controllers/GestionCompany';

const router: Router = Router();
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
const valid = new ValidationTokenAndCreateToken();
class RouterCompany extends ManageCompany {
    public PostCompany(){
        router.post('/company',valid.verifyTokenAndAdmin, this.postCompany)
        return router;
    }

    public GetCompany(){
        router.get('/company',valid.verifyTokenAndAdmin, this.getCompany)
        return router;
    }

    public UpdateCompany(){
        router.put('/company/:id',valid.verifyTokenAndAdmin, this.updateCompany)
        return router;
    }

    public DeleteCompany(){
        router.delete('/company/:id',valid.verifyTokenAndAdmin, this.deleteCompany)
        return router;
    }
}

export default RouterCompany;