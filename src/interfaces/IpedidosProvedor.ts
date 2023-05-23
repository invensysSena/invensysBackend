
import mongoose from "mongoose";

export interface IPedidoProvider extends mongoose.Document {
    tokenIDAdmin: string;
    NR: number;
    name: string;
    fecha: string;
    cantidadProductos: number;
    totalComprap: number;
    
}
