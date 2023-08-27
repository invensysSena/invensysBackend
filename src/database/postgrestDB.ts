import { Client,DatabaseError } from 'pg';
class PostgresConnection {
    private client: Client; 

    constructor(){
        this.client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'Daniel1008',
            port: 5432, // Puerto por defecto de PostgreSQL
        
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