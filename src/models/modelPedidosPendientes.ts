import {Schema, model} from 'mongoose';
import { IPendientes} from '../interfaces/PedidosPendientes';

const PedidosPendientesSchema = new Schema({
    name: { type: String, required: true },
    precioCompra: {
      type: String,
      required: true,
    },
    precioVenta: {
      type: Number,
      required: true,
    },
    unidades: {
      type: Number,
      required: true,
    },
    tipo:{
        type: String,
        required: true,
    },
    estado:{
        type: String,
        required: true,
        
    },
    idBodega: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  })

export default model<IPendientes>('PedidosPendientes', PedidosPendientesSchema);