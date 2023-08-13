import InventaryGeneral from "../models/InventaryGeneral";
import { conexion } from "../database/database";
import Todo from "./Notification.Todo";
import { IinventoryG } from '../interfaces/IinventaryGeneral';

InventaryGeneral;

class GerneralInventary {
  private idTokenAdmin: string = "";
  private typeUser: string = "";
  private data: any;

  public async setProperties(idTokenAdmin: string, typeUser: any, data: any) {
    this.idTokenAdmin = idTokenAdmin;
    this.typeUser = typeUser;
    this.data = data;
    return await this.createInventaryGeneral(data);
  }
  protected async createInventaryGeneral(data: any) {
    const conn:any = await conexion.connect();
    const { name_inventory, description, idBodega } = data;

    if (this.typeUser === "superAdmin") {
      conn.query(
        "SELECT correo FROM admin WHERE idUsers = ? ",
        [this.idTokenAdmin],
        async (_err:any, rows: any, _fields:any) => {
          if (rows) {
            const inventory: IinventoryG = new InventaryGeneral({
              tokenIdUser: this.idTokenAdmin,
              name_inventory, 
              idBodega,
              description,
              estadoInventory: "activo",
              responsableInventory: rows[0].correo,
              type: "Administrador",
            });
            const response = await inventory.save();
            await new Todo().createNotificationClass(
              "Se creo un nuevo inventario",
              "example@gmail.com",
              name_inventory,
              "inventory",
              this.idTokenAdmin
            );
          }
        }
      );
    }
  }
}

export default GerneralInventary;
