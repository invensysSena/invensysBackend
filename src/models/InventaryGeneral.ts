import { Schema, model } from "mongoose";
import { IinventoryG } from '../interfaces/IinventaryGeneral';

const inventaryGeneralSchema = new Schema(
  {
    tokeIdUser: { type: String, require: true },
    name_inventory: { type: String, require: true },
    idBodega: { type: String, require: true },
    description: { type: String, require: true },
    estadoInventory: { type: String },
    responsableInventory: { type: String },
    type: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model<IinventoryG>("InventaryGeneral", inventaryGeneralSchema);
