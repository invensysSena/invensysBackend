import mongoose from "mongoose";

export interface IinventoryG extends mongoose.Document {
  tokeIdUser: string;
  name_inventory: string;
  idBodega: string;
  description: string;
  estadoInventory: string;
  responsableInventory: string;
  type: string;
}
