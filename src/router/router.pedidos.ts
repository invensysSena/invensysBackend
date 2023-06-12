import { Router } from "express";
import ManagePedidos from "../controllers/GestionPedidos";
const router: Router = Router();
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
const valid = new ValidationTokenAndCreateToken();
class RouterPedidos extends ManagePedidos {

    public PostPedidos() {
        router.post('/pedidos',valid.verifyTokenAndAdmin, this.postPedidos);
        return router;
    }

    public GetPedidos() {
        router.get('/pedidos',valid.verifyTokenAndAdmin, this.getPedidos);
        return router;
    }

    public GetPedidosId() {
        router.get('/pedidos/:id',valid.verifyTokenAndAdmin, this.getPedidosId);
        return router;
    }

    public PutPedidos() {
        router.put('/pedidos/:id',valid.verifyTokenAndAdmin, this.putPedidos);
        return router;
    }

    public DeletePedidos() {
        router.delete('/pedidos/:id',valid.verifyTokenAndAdmin, this.deletePedidos);
        return router;
    }

}

export default RouterPedidos;
