import subProductSchema from "../models/SubProductos.model";
import PedidosPendientesSchema from "../models/modelPedidosPendientes";
import PedidosSchema from "../models/modelPedidos";
import ComprasSchema from "../models/Compras"
// ? new comprasSchema
import ComprasFvModule from "../interfaces/Compras.Salidas"

import moment from "moment-with-locales-es6";

moment.locale("es")

class comprasModelClass {
  private idTokenAdmin: string = "";
  data: any;

  public async setProperties(data: any, idTokenAdmin: string) {
    this.data = data;
    this.idTokenAdmin = idTokenAdmin;
    
    return await this.validateData(data); 

    
  }
  public async validateData(data: any) {
    const newCompraModel = new ComprasFvModule({
      tokeIdUser:this.idTokenAdmin,
      numFactura:1,
      fecha: moment().format('l'),
      cantidadProducts:4,
      total:3,
      responsable:"Daniel",
      
    })

    const response = await newCompraModel.save()
    console.log(response);
    

  }
  
  
}
  
export default comprasModelClass;
