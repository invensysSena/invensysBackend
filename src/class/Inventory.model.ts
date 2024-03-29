import { conexion } from "../database/database";
class modelInventoryData {
  public async postInventoryAcceso(tokeIdUser: string) {
    try {
      const conn: any = await conexion.connect();
      conn.query(
        "SELECT correo FROM admin WHERE idUsers = ? ",
        [tokeIdUser],
        async (_err: any, rows: any, _fields: any) => {
          if (rows) {
            return await rows[0].correo;
          }
        }
      );
    } catch (error) {}
  }
}

export default modelInventoryData;
