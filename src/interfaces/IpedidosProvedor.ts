
import mongoose from "mongoose";

export interface IPedidoProvider extends mongoose.Document {
    nr: number;
    fecha: string;
    cantidadProductos: number;
    totalComprap: number;
    
}
