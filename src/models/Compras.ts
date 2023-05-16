import { Schema, model } from "mongoose";
import { Compras } from "../interfaces/Compras.Salidas";

const ComprasSchema = new Schema(
  {
    tokeIdUser: { type: String, require: true },
    name: { type: String, require: true },
    description: { type: String, require: true },
    type: { type: String, require: true },
    fecha: { type: String, require: true },
  },
  { timestamps: true }
);
