import mysql from "mysql2";
import {
  HOST,
  DBNAME,
  PASSWORD,
  USER,
  PORTDB,
  LIMIT_CONNECION,
} from "../config/config";
import { MysqlError } from "mysql";
export class Conexion {
  public readonly host?: string | any = "localhost";
  private readonly user?: string | any = "root";
  private readonly password?: string | any = "";
  protected readonly database: string | any = "storedv1";
  private readonly charset: string | any = "utf8";
  private readonly port: Number | any = 3306;

  public async connect() {
    try {
      const conenct = await mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database,
        charset: this.charset,
        port: this.port,
      });

      this.veryficarConexion(conenct);

      return conenct;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  public veryficarConexion(conenct: mysql.Connection) {
    // si se cae la conexion se vuelve a conectar
    conenct.on("error", (err: MysqlError) => {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.error("Database connection was closed.");
        this.connect();
      }
      if (err.code === "ER_CON_COUNT_ERROR") {
        console.error("Database has to many connections");
        this.connect();
      }
      if (err.code === "ECONNREFUSED") {
        console.error("Database connection was refused");
        this.connect();
      }
    });
  }
}
export const conexion = new Conexion();
