import { Client,DatabaseError } from 'pg';
import settings from "../data/settings.json";
let app_settings = settings[0].CONECTION_PG
class PostgresConnection {
    private client: Client; 

    constructor(){
        this.client = new Client({
            user: app_settings.user,
            host: app_settings.host,
            database: app_settings.database,
            password: app_settings.password,
            port: app_settings.port, // Puerto por defecto de PostgreSQL
        
        })
    }
    async connect(){
        try {

           await  this.client.connect();
            console.log("Conectado a la base de datos de postgres")
        } catch (error:any) {
            console.error('Error al conectar a PostgreSQL:', error.message);
        }
    }
    async disConnect(){
        try {
            this.client.end()
             console.error('Conexion cerrada' );
        } catch (error) {
            console.error('Error al cerrar la conexión:', error);
        }
    }
     getClient():Client{
        return this.client
    }
}
const dbPg = new PostgresConnection();


export default dbPg;