import {Router} from 'express';
import AllModules from '../controllers/GestionInicio';

const router:Router = Router()
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
const valid = new ValidationTokenAndCreateToken();
class RouterInicio extends AllModules{
    public GetModules (){
        router.get('/modules/:id', valid.verifyTokenAndAdmin,this.getModules)
        return router;
    }
}

export default RouterInicio;