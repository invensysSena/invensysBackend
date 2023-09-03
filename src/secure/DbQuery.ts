import dbPg from "../database/postgrestDB";
import Todo from "../class/Notification.Todo";
import { Logger } from "../utils/Logger";
class QueryData 
{

    /**
 * Ejecuta una consulta INSERT INTO en la base de datos.
 * @param  METHOD - El método, que debe ser "POST" para INSERT INTO.
 * @param schema - El esquema de la base de datos.
 * @param table - La tabla en la que se insertarán los datos.
 * @param dataColumns - Un array de nombres de columnas en la tabla.
 * @param dataValues - Un array de valores que se insertarán en las columnas.
 * @returns Un objeto que contiene el resultado de la consulta.
 */
 public async QueryPost(METHOD: string, schema: string, table: string, dataColumns: string[], dataValues: any[]) {
    try {
      // Verificar si el método es "POST" para INSERT INTO
      if (METHOD !== "POST") {
        throw new Error("Método no válido. Debe ser 'POST' para INSERT INTO.");
      }
  
      // Crear la consulta INSERT INTO
        const queryInsert = `INSERT INTO ${schema}.${table} (${dataColumns.join(', ')}) VALUES (${
             dataValues.map((_, index) => `$${index + 1}`).join(', ') // Crear marcadores de posición ($1, $2, etc.) para los valores
            })`;
        Logger.info({ message: queryInsert });
  
        // Ejecutar la consulta y obtener el resultado
        const resultInsert = await dbPg.getClient().query(queryInsert, dataValues);
  
        Logger.info({ message: JSON.stringify(resultInsert.oid) });
  
            return resultInsert;
    } catch (error) {
      Logger.error({ message: error}); // Registrar errores en el registro
      throw error; // Relanzar el error para que pueda ser manejado en el nivel superior
    }
  }

    public async queryGet(METHOD: string, shema: string, vistaOrTable: string, datakeys: any, datavalues: any, consulta_sql: any, columns: any) {
        try {
            // Determina el tipo de método (GET o error)
            let METHOD_TYPE = METHOD === "GET" ? "SELECT" : "ERROR";
    
            // Define las palabras clave SQL permitidas
            let CONSULTAS_SQL = ['WHERE', 'OR', 'ORDER BY', 'GROUP BY', 'LIMIT', 'OFFSET', 'HAVING', 'JOIN',
                'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'CROSS JOIN', 'NATURAL JOIN', 'ON', 'USING', 'UNION',
                'UNION ALL'];
    
            // Filtra las palabras clave SQL de la consulta proporcionada
            let CONSULTAS_SQL_TYPE = consulta_sql.length > 0 ? consulta_sql.map((item: any, _index: number) => {
                return CONSULTAS_SQL.includes(item) ? item : ""
            }) : [];
    
            // Construye la parte de la consulta que se aplica a las cláusulas WHERE
            let dataKeysAnd = datakeys.length > 0 ? datakeys.map((item: any, index: number) => {
              return index === 0 ? `(${item} = $${index + 1}` : ` AND ${item} = $${index + 1}`
            }) : [];
            
            // Concatena las condiciones con "AND"
            let consulta = dataKeysAnd.length > 0 ? dataKeysAnd.join('') + ')' : '';
      
    
            // Construye la consulta completa
            let queryGet = `${METHOD_TYPE} ${columns.length > 0 ? columns.map((item: string, index: number) =>
                index === 0 ? item : `${item}`) : "*"} FROM ${shema}.${vistaOrTable} ${CONSULTAS_SQL_TYPE} ${consulta}`;
    
            // Registra la consulta en el registro de eventos (logger)
            Logger.info({ message: queryGet });
    
            // Ejecuta la consulta en la base de datos y espera el resultado
            let resultGet = await dbPg.getClient().query(queryGet, datavalues);
    
            // Registra el resultado en el registro de eventos (logger)
            Logger.info({ message: JSON.stringify(resultGet.oid) });
    
            // Devuelve el resultado y un estado HTTP 200 si es exitoso
           if (resultGet.rows.length !== 0) {
                return { statusText: 200, resultGet };
            } else {
                // En caso contrario, devuelve un estado HTTP 304
                return { statusText: 304 };
            }
            
        } catch (error) {
          Logger.error({ message: error}); // Registra errores en el registro de eventos (logger)
            // En caso de error, devuelve un estado HTTP 400
            return { statusText: 400 };
        }
    }

 
   /**
 * Ejecuta una operación de actualización (UPDATE) o retorna un error si el método no es válido.
 *
 * @param {string} METHOD - Método de actualización (por ejemplo, "PUT" para UPDATE).
 * @param {string} shema - Esquema de la base de datos.
 * @param {string} vistaOrTable - Vista o tabla de la base de datos a actualizar.
 * @param {Array} datakeys - Arreglo de nombres de columnas a actualizar.
 * @param {Array} datavalues - Arreglo de valores correspondientes a las columnas a actualizar.
 * @param {Array} consulta_sql - Arreglo de consultas SQL adicionales.
 * @param {Array} condition - Arreglo de condiciones para la cláusula WHERE.
 * @returns {Promise} - Una promesa que resuelve con los resultados de la actualización.
 */
public async QueryUpdate(METHOD: string, shema: string, vistaOrTable: string, datakeys: any[], datavalues: any[], consulta_sql: string[], condition: string[]): Promise<any> {
    // Verifica si el método es válido (solo "PUT" se permite, de lo contrario, retorna un error)
    let METHOD_TYPE = METHOD === "PUT" ? "UPDATE" : "ERROR";
  
    // Construye la parte SET de la consulta UPDATE
    let dataKeysAnd = datakeys.length > 0 ? datakeys.map((item: any, index: number) => {
      return index === 0 ? `${item} = $${index + 1}` : `${item} = $${index + 1}`;
    }) : [];
  
    // Construye la parte WHERE de la consulta UPDATE
    let conditionAnd = condition.length > 0 ? condition.map((item: any, index: number) => {
      return index === 0 ? `${item} = $${dataKeysAnd.length + 1}` : `${item} = $${dataKeysAnd.length + 1}`;
    }) : [];
  
    // Construye la consulta UPDATE completa
    let queryUpdate = `${METHOD_TYPE} ${shema}.${vistaOrTable} SET ${
      dataKeysAnd.length > 0 ? dataKeysAnd.join(', ') : ""
    } ${
      consulta_sql.length > 0 ? consulta_sql.join(' ') : ""
    } ${
      condition.length > 0 ? `WHERE ${conditionAnd.join(' AND ')}` : ""
    }`;
  
    // Registra la consulta en el registro de eventos
    Logger.info({ message: queryUpdate });
  
    try {
      // Ejecuta la consulta UPDATE y devuelve los resultados
      let updateData = await dbPg.getClient().query(queryUpdate, datavalues);
      Logger.info({ message: JSON.stringify(updateData) });
      return updateData;
    } catch (error) {
      // Maneja cualquier error que ocurra durante la ejecución de la consulta
      Logger.error({ message: error });
      throw error;
    }
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
            Logger.info({message:queryDelete})
        }

        // Ejecutar la consulta DELETE en la base de datos
         const deleteData:any = await dbPg.getClient().query(queryDelete, dataValues);
                Logger.info({message:JSON.stringify(deleteData.old)})
        // Registrar la consulta en la consola (opcional)
        // Devolver el resultado de la eliminación
            return deleteData;
    } catch (error:any) {
        // Manejar errores y devolverlos
        Logger.error({message:error})
        return error;
    }
}





   
}

export const  queryData = new QueryData();

