import mongoose from "mongoose";

export interface IPendientes extends mongoose.Document {
  name: string;
  precioCompra: string;
  pricioVenta: number;
  stockMinimo: number;
  stockMaximo: number;
  unidades: number;
  tipo: string;
  estado: string;
  caducidad: string;
  idBodega: string;
}