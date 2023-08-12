import mysql from "mysql2";
import { MysqlError } from "mysql";
export class Conexion {
  
  public readonly host?: string | any = process.env.DB_HOST || "localhost";
  private readonly user?: string | any = process.env.DB_USER || "root";
  private readonly password?: string | any = process.env.DB_PASSWORD || "";
  protected readonly database: string | any = process.env.DB_NAME || "invensys";
  private readonly charset: string | any = process.env.DB_CHARSET || "utf8";
  private readonly port: Number | any = process.env.DB_PORT || 3306;
  public async connect() {
    try {
      const conenct = await mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database,
        charset: this.charset,
        port: this.port,
        multipleStatements: true,
      });

      await this.veryficarConexion(conenct);

      return conenct;
    } catch (error) {
      return error;
    }
  }
  public async veryficarConexion(conenct: mysql.Connection) {
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
        console.error("Database connection was refused",err);
      }
    });
  }
}

export const conexion = new Conexion();
