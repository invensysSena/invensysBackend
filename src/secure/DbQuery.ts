import dbPg from "../database/postgrestDB";
import Todo from "../class/Notification.Todo";

class QueryData 
{

    public async QueryPost(METHOD:string,shema:string,table:string,data:any[],dataValues:any[])
    {
        try {
            let METHOD_TYPE = METHOD === "POST" ? "INSERT INTO" : METHOD === "GET" ? "SELECT" : METHOD === "PUT" ? "UPDATE" : METHOD === "DELETE" ? "DELETE" : "SELECT";
            switch (METHOD_TYPE) {
                case "INSERT INTO":
                // inserta los datos en la tabla. data hace referencia a las columnas y data values a los datos
                // de insertar 
                    let queryInsert = `${METHOD_TYPE} ${shema}.${table} (${
                        data.length > 0 ? data.map((item:string,index:number) => { return index === 0 ? item : `${item}` }) : ""
                    }) VALUES (${
                        dataValues.length > 0 ? dataValues.map((_item:string,index:number) => { return index === 0 ? `$${index+1}` : `$${index+1}` }) : ""
                    })`;

                    let resultInsert = await dbPg.getClient().query(queryInsert,dataValues);
                    return resultInsert;
                    break;
                
                case "DELETE":
                    let queryDelete = `DELETE FROM ${shema}.${table} WHERE id = $1`;
                    let resultDelete = await dbPg.getClient().query(queryDelete,data);
                    return resultDelete;
                    break;
                default:
                    return "ERR_METHOD";
            }  
            
        } catch (error) {
            return error;
        }
    }

    public async queryGet(METHOD:string,shema:string,vistaOrTable:String,datakeys:any[],datavalues:any[],consulta_sql:string[],columns:string[]){
        
        try {
            let METHOD_TYPE = METHOD === "GET" ? "SELECT" : "ERROR"

            let CONSULTAS_SQL = ['WHERE','AND','OR','ORDER BY','GROUP BY','LIMIT','OFFSET','HAVING','JOIN',
            'INNER JOIN','LEFT JOIN','RIGHT JOIN','FULL JOIN','CROSS JOIN','NATURAL JOIN','ON','USING','UNION',
            'UNION ALL']
    
            let CONSULTAS_SQL_TYPE = consulta_sql.length > 0 ? consulta_sql.map((item:any,_index:number) => { return CONSULTAS_SQL.includes(item) ? item : "" }) : []
            // console.log(CONSULTAS_SQL_TYPE)
            let dataKeysAnd = datakeys.length > 0 ? datakeys.map((item:any,index:number) => { 
                return index === 0 ? `${item} = $${index+1}` : `${item} = $${index+1}`
    
             }) : []
             let queryGet = `${METHOD_TYPE} ${columns.length > 0 ? columns.map((item:string,index:number) =>
                  index === 0 ? item : `${item}` ) : "*"} FROM ${shema}.${vistaOrTable}
                  ${CONSULTAS_SQL_TYPE.length > 0 ? CONSULTAS_SQL_TYPE.map((item:string,index:number) => { return index === 0 ? item : `${item}` }) : ""}
                  ${datakeys.length > 0 ? "" : ""} ${dataKeysAnd.length > 0 ? 
                  dataKeysAnd.map((item:any,index:number) => { return index === 0 ? item : `AND ${item}` }) : ""}`
                //   console.log(queryGet)  
            let resultGet = await dbPg.getClient().query(queryGet,datavalues);
                return {resultGet,statusText:200};
        } catch (error) {

                return {error,statusText:400};
        }
}


 
    public async QueryUpdate(METHOD:string,shema:string,vistaOrTable:String,datakeys:any[],datavalues:any[],consulta_sql:string[],condition:string[],id:string){

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
                let updateData = await dbPg.getClient().query(queryUpdate,datavalues);
        return updateData

    } 

}

export const  queryData = new QueryData();

