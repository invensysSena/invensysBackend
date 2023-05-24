import mongoose from "mongoose";

export interface IinventoryG extends mongoose.Document {
  tokenIdUser: string;
  name_inventory: string;
  idBodega: string;
  description: string;
  estadoInventory: string;
  responsableInventory: string;
  type: string;
}
