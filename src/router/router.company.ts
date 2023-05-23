import {Router} from 'express';
import ManageCompany from '../controllers/GestionCompany';

const router: Router = Router();

class RouterCompany extends ManageCompany {
    public PostCompany(){
        router.post('/company', this.postCompany)
        return router;
    }

    public GetCompany(){
        router.get('/company', this.getCompany)
        return router;
    }

    public UpdateCompany(){
        router.put('/company/:id', this.updateCompany)
        return router;
    }

    public DeleteCompany(){
        router.delete('/company/:id', this.deleteCompany)
        return router;
    }
}

export default RouterCompany;