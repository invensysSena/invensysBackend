

import { conexion } from "../database/database";
class modelInventoryData  {
    public async postInventoryAcceso(tokeIdUser: string,) {
        try {
            const conn = await conexion.connect();
            conn.query("SELECT correo FROM admin WHERE idUsers = ? ", [tokeIdUser], async (err, rows:any, fields) => {
                if (rows) {
                    
                    return await rows[0].correo;
                }
            }
            )
            
        } catch (error) {
            

        }
    }



}


export default modelInventoryData;