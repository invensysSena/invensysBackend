import { Router } from "express";
import ManagePedidos from "../controllers/GestionPedidos";
const router: Router = Router();
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
import { AllowedModules } from "../middlewares/isAlloweedModule";
import passport from "passport";
const isAllowed = new AllowedModules();
const valid = new ValidationTokenAndCreateToken();
let AuthPassport = passport.authenticate("jwt",{session: false,});

class RouterPedidos extends ManagePedidos {
    public PostPedidos() {
       return router.post('/pedidos',AuthPassport, isAllowed.isAllowedPermissions, this.postPedidos);
    }
    public GetPedidos() {
       return router.get('/pedidos',AuthPassport, isAllowed.isAllowedPermissions, this.getPedidos);
    }
    public GetPedidosId() {
       return router.get('/pedidos/:id',AuthPassport, isAllowed.isAllowedPermissions, this.getPedidosId);
    }
    public PutPedidos() {
       return router.put('/pedidos/:id',AuthPassport, isAllowed.isAllowedPermissions, this.putPedidos);
    }
    public DeletePedidos() {
       return router.delete('/pedidos/:id',AuthPassport, isAllowed.isAllowedPermissions, this.deletePedidos);
    }
}

export default RouterPedidos;
