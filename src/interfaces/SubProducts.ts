import mongoose from "mongoose";

export interface subProducts extends mongoose.Document {
  tokenIdUser: string;
  name: string;
  priceCompra: number;
  priceVenta: number;
  stockMinimo: number;
  stockMaximo: number;
  unidad: number;
  caducidad: string;
  idInventory: string;
}
