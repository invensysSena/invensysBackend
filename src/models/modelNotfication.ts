import mongoose from "mongoose";
import { NotificationInterface } from "../interfaces/Notification";

const NotificationSchema = new mongoose.Schema({
    tokeIdUser: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    type: { type: String, require: true },
}
    , {  timestamps: true
    })

export default mongoose.model<NotificationInterface>(
  "Notification",
  NotificationSchema
);