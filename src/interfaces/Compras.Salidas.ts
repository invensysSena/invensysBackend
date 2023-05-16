import mongoose from "mongoose";


export interface Compras extends mongoose.Document {

    tokeIdUser: string,
    name: string,
    description: string,
    type: string,
    price: number,
    priceBuy: number,
    cantidad: number,
    total: number,
    fecha: string,
    estado: string,
    nameInventory: string,
    nameCategory: string,
    nameUser: string,
    nameProduct: string,
    nameSalida: string,
}

   
