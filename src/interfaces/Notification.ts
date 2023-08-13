import mongoose from "mongoose";
export interface NotificationInterface extends mongoose.Document {
    tokeIdUser: string,
    title: string,
    description: string,
    responsable: string,
    type: string,
    estado:1
}