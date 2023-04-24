import mongoose from "mongoose";

export interface ITranslateSubP extends mongoose.Document {
  idAdmin: string | number;
  idDestino: string | number;
  idOrigen: string | number;
  idSubProducto: string | number;
  cantidad: number;
  userCorreo: string;
  origen: string;
  responsable: string;
  estado: string;
}

const TranslateSubPSchema = new mongoose.Schema({
  idAdmin: { type: String, required: true },
  idDestino: { type: String, required: true },
  idOrigen: { type: String, required: true },
  idSubProducto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  userCorreo: { type: String, required: true },
  origen: { type: String, required: true },
  responsable: { type: String, required: true },
  estado: {
    enum: ["Pendiente", "Aceptado", "Rechazado"],
    type: String,
    default: "Pendiente",
  },
},

  {
    timestamps: true,
    versionKey: false,
  }
  
);

export default mongoose.model<ITranslateSubP>(
  "TranslateSubP",
  TranslateSubPSchema
);
