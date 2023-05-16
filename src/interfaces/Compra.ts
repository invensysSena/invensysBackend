import mongoose from "mongoose";


export interface CompraInterface extends mongoose.Document {

    tokeIdUser: string,
    name: string,
    description: string,
    type: string,
    fecha: string,
}

const CompraSchema = new mongoose.Schema({
    tokeIdUser: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    fecha: { type: String, required: true },

}, { timestamps: true });

export default mongoose.model<CompraInterface>('Compra', CompraSchema);
