import { Router } from "express";
import ManagePedidos from "../controllers/GestionPedidos";
const router: Router = Router();
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";
const isAllowed = new AllowedModules();
const valid = new ValidationTokenAndCreateToken();
class RouterPedidos extends ManagePedidos {
    public PostPedidos() {
       return router.post('/pedidos',valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.postPedidos);
    }
    public GetPedidos() {
       return router.get('/pedidos',valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.getPedidos);
    }
    public GetPedidosId() {
       return router.get('/pedidos/:id',valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.getPedidosId);
    }
    public PutPedidos() {
       return router.put('/pedidos/:id',valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.putPedidos);
    }
    public DeletePedidos() {
       return router.delete('/pedidos/:id',valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.deletePedidos);
    }
}

export default RouterPedidos;
