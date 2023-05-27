import subProductSchema from "../models/SubProductos.model";
import PedidosPendientesSchema from "../models/modelPedidosPendientes";
import PedidosSchema from "../models/modelPedidos";
import ComprasSchema from "../models/Compras"
import { v4 as uuidv4 } from 'uuid';
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
    
    const v1options:any = {
      node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
      clockseq: 0x1234,
      msecs: new Date().getTime(),
      nsecs: 5678,
    };
   const TotalCompra =  data.map((i:any) => i.totalCompra).reduce((a:number, b:number) => a + b)
    const newCompraModel = new ComprasFvModule({
      tokeIdUser:this.idTokenAdmin,
      numFactura:uuidv4(v1options), 
      fecha: moment().format('l'),
      cantidadProducts:data.length,
      total:TotalCompra,
      responsable:"Daniel",
      
    })

    const response = await newCompraModel.save()
    const {_id} = response
    
    return await this.postCompra(data,_id);
    

  }

  protected async postCompra(data:any,id:number){
    if(data.length > 1){
      
      for(let i = 0; i < data.length; i++){
      const pedidosCreate = new ComprasSchema({
        tokeIdUser: this.idTokenAdmin,
        idCompra: id,
        id_bodega: data[i].idBodega,
        idSubProduct: data[i].idSubproducto,
        nameProduct: data[i].name,
        unidades: data[i].unidades,
        total: data[i].totalCompra,
        fecha: moment().format('l'),
      });
      await pedidosCreate.save()
      
      
        const exitsSubProduct:any = await subProductSchema.findById(data[i].idSubproducto);
        const newUnidades = exitsSubProduct.unidad - data[i].unidades; 
        if (!exitsSubProduct) {
          throw new Error("SUBPRODUCT_NOT_FOUND");
        }else{
          const updateUnidades = await subProductSchema.findByIdAndUpdate(
            {_id:data[i].idSubproducto},
            {
              unidad: newUnidades,
            }, 
            { new: true}
           );
            
        }
      }

    }else{
      
      
      
      
    const [{idSubproducto, unidades
      , idBodega,  name,  totalCompra}] = data
    const comprasCreate = new ComprasSchema({
      tokeIdUser: this.idTokenAdmin,
      idCompra: id,
      idBodega: idBodega,
      idSubProduct: idSubproducto,
      nameProduct: name,
      unidades: unidades,
      total: totalCompra,
      fecha: moment().format('l'),
    });
    const res = await comprasCreate.save();
   
    
    const exitsSubProduct:any = await subProductSchema.findById(idSubproducto);
    const newUnidades = exitsSubProduct.unidad - unidades;
    if (!exitsSubProduct) {
      throw new Error("SUBPRODUCT_NOT_FOUND");
    }else{
      const updateUnidades = await subProductSchema.findByIdAndUpdate(
        {_id:idSubproducto},
        {
          unidad: newUnidades,
        }, 
        { new: true}
       );
       
    }
    }

  } 
  
  
  
}
  
export default comprasModelClass;
