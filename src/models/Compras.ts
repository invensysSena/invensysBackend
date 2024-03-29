import mongoose, { Schema} from "mongoose";
import { ComprasInterface } from "../interfaces/Compras.Salidas";
const ComprasSchema = new Schema(
  {
    tokeIdUser: { type: String, require: true },
    idCompra: { type: String, require: true },
    idBodega: { type: String, require: true },
    idSubProduct: { type: String, require: true },
    nameProduct: { type: String, require: true },
    price: { type: Number, require: true },
    unidades: { type: Number, require: true },
    total: { type: Number, require: true },
    fecha: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ComprasInterface>("Compras", ComprasSchema);
