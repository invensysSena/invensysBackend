import { Schema, model } from "mongoose";

import { inventory } from "../interfaces/inventoryInterface";

const InventorySchema = new Schema(
  {
    tokeIdUser: { type: String, require: true },
    name_inventory: { type: String, require: true },
    description: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export default model<inventory>("Inventory", InventorySchema);
