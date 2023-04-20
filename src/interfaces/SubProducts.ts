import mongoose from "mongoose";

export interface subProducts extends mongoose.Document {
  name: string;
  priceCompra: string;
  priceVenta: number;
  stockMinimo: number;
  stockMaximo: number;
  unidad: number;
  caducidad: string;
  idInventory: string;
}