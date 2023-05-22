import {Router} from 'express';
import ManageCompany from '../controllers/GestionCompany';

const router: Router = Router();

class RouterCompany extends ManageCompany {
    public postCompany(){
        router.post('/company', this.postCompany)
        return router;
    }

    public getCompany(){
        router.get('/company', this.getCompany)
        return router;
    }

    public updateCompany(){
        router.put('/company/:id', this.updateCompany)
        return router;
    }

    public deleteCompany(){
        router.delete('/company/:id', this.deleteCompany)
        return router;
    }
}

export default RouterCompany;