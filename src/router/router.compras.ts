import {Router} from 'express';
import ManageCompras from '../controllers/GestionCompras';

const router = Router();

class RoutersCompras extends ManageCompras {

    public PostCompras(){
        router.post('/postCompras', this.postCompras);
        return router;
    }

    public GetCompras() {
        router.get('/getCompras', this.getCompras);
        return router;
    }

    public GetComprasById() {
        router.get('/getCompras/:id', this.getComprasById);
        return router;
    }

    public PutCompras() {
        router.put('/putCompras/:id', this.putCompras);
        return router;
    }

    public DeleteCompras() {
        router.delete('/deleteCompras/:id', this.deleteCompras);
        return router;
    }
}

export default RoutersCompras;