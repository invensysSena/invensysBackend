import NotificationSchema from "../models/modelNotfication";
import { NotificationInterface } from "../interfaces/Notification";

class Todo extends NotificationSchema {
  public async createNotificationClass(
    title: string,
    description: string,
    type: string,
    token: string
  ) {
    try {
      const newNotification: NotificationInterface =
        await new NotificationSchema({
          tokeIdUser: token,
          title,
          description,
          type,
        });
      return await newNotification.save();
    } catch (error) {
      return error;
    }
  }
  public async getNotificationClass(id: string) {
    try {
      return await NotificationSchema.find({ tokeIdUser: id });
    } catch (error) {
      return error;
    }
  }
  public async deleteNotificationClass(_id: string) {
    try {
      return await NotificationSchema.findByIdAndDelete(_id);
    } catch (error) {
      return error;
    }
  }

  public deleteEstado = async (idToken: string) => {
    try {
      return await NotificationSchema.updateMany(
        { tokeIdUser: idToken },
        { estado: 0 }
      );
    } catch (error) {
      return error;
    }
  };
}
export default Todo;
