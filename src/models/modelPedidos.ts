import {Schema, model} from 'mongoose';
import {IPedidos} from '../interfaces/pedidos';

const PedidosSchema = new Schema({
    tokeIdUser: {type: String, required: true},
    id_subProducto: {type: String, required: true},
    id_provedor: {type: String, required: true},
    id_bodega: {type: String, required: true,},
    company : {type: String, required: true},
    unidades: {type: Number, required: true},
    tipo: {type: String, },
    fecha: {type: String},
    totalCompra: {type: Number, required: true},
    idPedidoProvider: {type: String, required: true},
},{
    timestamps: true,
}); 

export default model<IPedidos>('Pedidos', PedidosSchema);