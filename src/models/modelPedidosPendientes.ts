import {Schema, model} from 'mongoose';
import { IPendientes} from '../interfaces/PedidosPendientes';

const PedidosPendientesSchema = new Schema({
    name: { type: String, required: true },
    priceCompra: {
      type: String,
      required: true,
    },
    priceVenta: {
      type: Number,
      required: true,
    },
    unidad: {
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
    idInventory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  })

export default model<IPendientes>('PedidosPendientes', PedidosPendientesSchema);