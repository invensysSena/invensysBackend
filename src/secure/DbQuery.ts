import dbPg from "../database/postgrestDB";
import Todo from "../class/Notification.Todo";

class QueryData 
{

    public async QueryPost(METHOD:string,shema:string,table:string,datacolumn:any[],dataValues:any[])
    {
        try {
            let METHOD_TYPE = METHOD === "POST" ? "INSERT INTO" : METHOD === "GET" ? "SELECT" : METHOD === "PUT" ? "UPDATE" : METHOD === "DELETE" ? "DELETE" : "SELECT";
            switch (METHOD_TYPE) {
                case "INSERT INTO":
                // inserta los datos en la tabla. data hace referencia a las columnas y data values a los datos
                // de insertar 
                    let queryInsert = `${METHOD_TYPE} ${shema}.${table} (${
                        datacolumn.length > 0 ? datacolumn.map((item:string,index:number) => { return index === 0 ? item : `${item}` }) : ""
                    }) VALUES (${
                        dataValues.length > 0 ? dataValues.map((_item:string,index:number) => { return index === 0 ? `$${index+1}` : `$${index+1}` }) : ""
                    })`;
                    console.log(queryInsert)

                    let resultInsert = await dbPg.getClient().query(queryInsert,dataValues);
                    return resultInsert;
                    break;
                
                case "DELETE":
                    let queryDelete = `DELETE FROM ${shema}.${table} WHERE id = $1`;
                    let resultDelete = await dbPg.getClient().query(queryDelete,datacolumn);
                    return resultDelete;
                    break;
                default:
                    return "ERR_METHOD";
            }  
            
        } catch (error) {
            return error;
        }
    }

    public async queryGet(METHOD: string, shema: string, vistaOrTable: String, datakeys: any[], datavalues: any[], consulta_sql: string[], columns: string[]) {
        try {
            let METHOD_TYPE = METHOD === "GET" ? "SELECT" : "ERROR";
    
            let CONSULTAS_SQL = ['WHERE', 'OR', 'ORDER BY', 'GROUP BY', 'LIMIT', 'OFFSET', 'HAVING', 'JOIN',
                'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'CROSS JOIN', 'NATURAL JOIN', 'ON', 'USING', 'UNION',
                'UNION ALL'];
    
            let CONSULTAS_SQL_TYPE = consulta_sql.length > 0 ? consulta_sql.map((item: any, _index: number) => {
                return CONSULTAS_SQL.includes(item) ? item : ""
            }) : [];
    
            let dataKeysAnd = datakeys.length > 0 ? datakeys.map((item: any, index: number) => {
                return index === 0 ? `(${item} = $${index + 1}` : `${item} = $${index + 1}`
            }) : [];
    
            // Concatenar con AND
            let consulta = dataKeysAnd.length > 0 ? [dataKeysAnd].join(' AND ') + ')' : '';
           
    
            let queryGet = `${METHOD_TYPE} ${columns.length > 0 ? columns.map((item: string, index: number) =>
                index === 0 ? item : `${item}`) : "*"} FROM ${shema}.${vistaOrTable}
                ${CONSULTAS_SQL_TYPE} ${consulta}`
    
            let resultGet = await dbPg.getClient().query(queryGet, datavalues);
            
            return { resultGet, statusText: 200 };
        } catch (error) {
            return { statusText: 400 };
        }
    }

 
    public async QueryUpdate(METHOD:string,shema:string,vistaOrTable:String,datakeys:any[],datavalues:any[],consulta_sql:string[],condition:string[]){

        let METHOD_TYPE =  METHOD === "PUT" ? "UPDATE" : "ERROR"
        
        let dataKeysAnd = datakeys.length > 0 ? datakeys.map((item:any,index:number) => { 
            return index === 0 ? `${item} = $${index+1}` : `${item} = $${index+1}`

         }) : []
         let conditionAnd = condition.length > 0 ? condition.map((item:any,index:number) => {
                return index === 0 ? `${item} = $${dataKeysAnd.length+1}` : `${item} = $${dataKeysAnd.length+1}`
            }) : []

         let queryUpdate = `${METHOD_TYPE} ${shema}.${vistaOrTable} SET ${dataKeysAnd.length > 0 ?
                dataKeysAnd.map((item:any,index:number) => { return index === 0 ? item : `${item}` }) : ""}
                ${consulta_sql.length > 0 ? consulta_sql.map((item:any,index:number) => { return index === 0 ? item : `${item}` }) : ""}
                ${datakeys.length > 0 ? "" : ""} ${condition.length > 0 ? conditionAnd.map((item:any,index:number) => { return index === 0 ? item : `AND ${item}` }) : ""}`
                console.log(queryUpdate)
                let updateData = await dbPg.getClient().query(queryUpdate,datavalues);
        return updateData

    } 
/**
 * Realiza una operación de eliminación (DELETE) en una tabla o vista específica en una base de datos PostgreSQL.
 *
 * @param {string} METHOD - El método de eliminación ("DELETE" en este caso).
 * @param {string} schema - El esquema de la tabla o vista en la base de datos.
 * @param {string} tableOrView - El nombre de la tabla o vista en la base de datos.
 * @param {string[]} dataKeys - Un array de nombres de columnas para construir la cláusula WHERE.
 * @param {any[]} dataValues - Un array de valores para los parámetros de la cláusula WHERE.
 * @returns {Promise<object>} - Una promesa que resuelve en el resultado de la eliminación.
 */
public async QueryDelete(METHOD: string, schema: string, tableOrView: string, dataKeys: string[], dataValues: any[]): Promise<object> {
    try {
        // Determinar el tipo de método (DELETE o ERROR)
        const METHOD_TYPE = METHOD === "DELETE" ? "DELETE FROM" : "ERROR";

        // Construir la consulta DELETE con una cláusula WHERE dinámica
        let queryDelete = `${METHOD_TYPE} ${schema}.${tableOrView}`;
        if (dataKeys.length > 0) {
            // Usar map para generar las condiciones WHERE
            const whereConditions = dataKeys.map((item: string, index: number) => {
                return `${item} = $${index + 1}`;
            });
            queryDelete += ` WHERE ${whereConditions.join(" AND ")}`;
        }

        // Ejecutar la consulta DELETE en la base de datos
        const deleteData = await dbPg.getClient().query(queryDelete, dataValues);

        // Registrar la consulta en la consola (opcional)
        console.log(queryDelete);

        // Devolver el resultado de la eliminación
        return deleteData;
    } catch (error:any) {
        // Manejar errores y devolverlos
        return error;
    }
}





   
}

export const  queryData = new QueryData();

