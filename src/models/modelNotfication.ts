import mongoose from "mongoose";
import { NotificationInterface } from "../interfaces/Notification";

const NotificationSchema = new mongoose.Schema(
  {
    tokeIdUser: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    responsable: { type: String, require: true },
    type: { type: String, require: true },
    estado: { type: Number, require: true, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model<NotificationInterface>(
  "Notification",
  NotificationSchema
);
