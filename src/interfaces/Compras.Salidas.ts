import mongoose, { Schema, model } from "mongoose";


export interface ComprasInterface extends mongoose.Document {

    tokeIdUser: string,
    idCompra: string,
    idBodega: string,
    idSubProduct:string,
    nameProduct: string,
    price: number,
    unidades: number,
    total: number,
    fecha: string,
    
}


export interface ComprasNF extends mongoose.Document {

    tokeIdUser:string,
    numFactura:number,
    fecha: string
    cantidadProducts:number,
    total:number,
    responsable:string,
}
const ComprasFvModule = new Schema({
    tokeIdUser:{type:String,require:true},
    numFactura:1,
    fecha:{type:String,require:true},
    cantidadProducts:{type:Number,require:true},
    total:{type:Number,require:true},
    responsable:{type:String,require:true}
  })
  
   
export default mongoose.model<ComprasNF>(
    "ComprasNf",
    ComprasFvModule
  )
  
