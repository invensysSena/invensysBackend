import { Schema, model } from "mongoose";

const ComprasSchema = new Schema({
    id_user_token: { type: String, required: true },
    id_product: { type: String, required: true },
    company: { type: String, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    date: { type: Date, required: true },

},{
    timestamps: true,
});

export default model("Compras", ComprasSchema);
