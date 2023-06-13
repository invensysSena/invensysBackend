import { Router } from "express";
import ManagePedidos from "../controllers/GestionPedidos";
const router: Router = Router();
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";
const isAllowed = new AllowedModules();
const valid = new ValidationTokenAndCreateToken();
class RouterPedidos extends ManagePedidos {

    public PostPedidos() {
        router.post('/pedidos',valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.postPedidos);
        return router;
    }

    public GetPedidos() {
        router.get('/pedidos',valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.getPedidos);
        return router;
    }

    public GetPedidosId() {
        router.get('/pedidos/:id',valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.getPedidosId);
        return router;
    }

    public PutPedidos() {
        router.put('/pedidos/:id',valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.putPedidos);
        return router;
    }

    public DeletePedidos() {
        router.delete('/pedidos/:id',valid.verifyTokenAndAdmin, isAllowed.isAllowedPermissions, this.deletePedidos);
        return router;
    }

}

export default RouterPedidos;
