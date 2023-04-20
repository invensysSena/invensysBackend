import { Document } from 'mongoose';

export interface IPedidos extends Document{
    idTokenAdmin: string;
    id_subProducto: string;
    id_provedor: string;
    id_bodega: string;
    company : string;
    cantidad: number;  
    tipo: string;
    fecha: Date;
    totalCompra: number;
} 