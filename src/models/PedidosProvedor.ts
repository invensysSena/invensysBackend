import mongoose from "mongoose";
import { IPedidoProvider } from "../interfaces/IpedidosProvedor";   

const PedidoProvider = new mongoose.Schema(
  {
    nr: { type: Number, required: true },
    fecha: { type: String, required: true },
    cantidadProductos: { type: Number, required: true },
    totalComprap: { type: Number, required: true },
  },
  { timestamps: true }
);
export default mongoose.model<IPedidoProvider>("PedidoProvider", PedidoProvider);