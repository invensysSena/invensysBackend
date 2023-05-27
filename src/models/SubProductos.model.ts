import { subProducts } from "../interfaces/SubProducts";
import { Schema, model } from "mongoose";

const subProductSchema = new Schema(
  {
    tokenIdUser: { type: String, required: true },
    name: { type: String, required: true },
    priceCompra: {
      type: Number,
      required: true,
    },
    priceVenta: {
      type: Number,
      required: true,
    },
    stockMinimo: {
      type: Number,
      required: true,
    },
    stockMaximo: {
      type: Number,
      required: true,
    },
    unidad: {
      type: Number,
      required: true,
    },
    caducidad: {
      type: String,
      required: true,
    },
    idInventory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<subProducts>("SubProduct", subProductSchema);
