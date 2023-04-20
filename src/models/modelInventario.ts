import { Schema, model } from "mongoose";

import { inventory } from "../interfaces/inventoryInterface";

const InventorySchema = new Schema(
  {
    tokeIdUser: { type: String, require: true },
    name_inventory: { type: String, require: true },
    description: { type: String, require: true },
    estadoInventory: {type: String},
    responsableInventory:{type:String}
  },
  {
    timestamps: true,
  }
);

export default model<inventory>("Inventory", InventorySchema);
