import {Schema, model} from 'mongoose';

const PedidosPendientesSchema = new Schema({
    id_producto: {type: String, required: true},
    id_provedor: {type: String, required: true},
    id_inventario: {type: String, required: true},
    company : {type: String, required: true},
    cantidad: {type: Number, required: true},
    fecha: {type: Date, default: Date.now},
    totalCompra: {type: Number, required: true},

})

export default model('PedidosPendientes', PedidosPendientesSchema);