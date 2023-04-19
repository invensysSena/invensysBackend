import { Router } from "express";
import ManagePedidos from "../controllers/GestionPedidos";
const router: Router = Router();

class RouterPedidos extends ManagePedidos {

    public PostPedidos() {
        router.post('/pedidos', this.postPedidos);
        return router;
    }

    public GetPedidos() {
        router.get('/pedidos', this.getPedidos);
        return router;
    }

    public GetPedidosId() {
        router.get('/pedidos/:id', this.getPedidosId);
        return router;
    }

    public PutPedidos() {
        router.put('/pedidos/:id', this.putPedidos);
        return router;
    }

    public DeletePedidos() {
        router.delete('/pedidos/:id', this.deletePedidos);
        return router;
    }

}

export default RouterPedidos;
