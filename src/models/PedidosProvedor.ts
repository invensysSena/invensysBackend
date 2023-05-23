import mongoose from "mongoose";
import { IPedidoProvider } from "../interfaces/IpedidosProvedor";   

const PedidoProvider = new mongoose.Schema(
  {
<<<<<<< HEAD
    NR: { type: Number, required: true },
=======
    tokenIDAdmin: { type: String, required: true },
    NR: { type: Number, required: true },
    name: { type: String, required: true },
>>>>>>> 83556aaa92fcd62f8a74bba17698c50250dc3784
    fecha: { type: String, required: true },
    cantidadProductos: { type: Number, required: true },
    totalComprap: { type: Number, required: true },
    
  },
  { timestamps: true }
);
export default mongoose.model<IPedidoProvider>("PedidoProvider", PedidoProvider);