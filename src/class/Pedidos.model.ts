import InventorySchema from "../models/modelInventario";
import subProductSchema from "../models/SubProductos.model";
import ProviderSchema from "../models/modelProviders";
import PedidosPendientesSchema from "../models/modelPedidosPendientes";
import PedidosSchema from "../models/modelPedidos";
import { IPedidos } from "../interfaces/pedidos";

class PedidosValiadation {
  private idTokenAdmin: string = "";
  data: any;

  public async setProperties(data: any, idTokenAdmin: string) {
    this.data = data;
    this.idTokenAdmin = idTokenAdmin;

    
  
      return await this.validateData(data);
    
  }
  private async validateData(data: any) {
    console.log(data);
    
    
    if(data.length > 1){
      
      for(let i = 0; i < data.length; i++){
        //console.log(data.length, "data");

      const pedidosCreate = new PedidosSchema({
        idTokenAdmin: this.idTokenAdmin,
        id_subProducto: data[i].idSubproducto,
        id_provedor: data[i].idProvedor,
        id_bodega: data[i].idBodega,
        company: data[i].company,
        unidades: data[i].unidades,
        tipo: data[i].tipo,
        fecha: data[i].fecha,
        totalCompra: data[i].totalCompra
      });
      await pedidosCreate.save();
        const exitsSubProduct:any = await subProductSchema.findById(data[i].idSubproducto);
        const newUnidades = exitsSubProduct.unidad + data[i].unidades; 
        if (!exitsSubProduct) {
          throw new Error("SUBPRODUCT_NOT_FOUND");
        }else{
          // const updateUnidades = await subProductSchema.findByIdAndUpdate(
          //   {_id:data[i].idSubproducto},
          //   {
          //     unidad: newUnidades,
          //   }, 
          //   { new: true}
          //  );
            // console.log(updateUnidades); 
        }
      }

    }else{
      
    const [{idSubproducto, unidades,
      idProvedor, idBodega, company, tipo, fecha, totalCompra}] = data
    const pedidosCreate = new PedidosSchema({
      idTokenAdmin: this.idTokenAdmin,
      id_subProducto: idSubproducto,
      id_provedor: idProvedor,
      id_bodega: idBodega,
      company: company,
      unidades: unidades,
      tipo: tipo,
      fecha: fecha,
      totalCompra: totalCompra,
    });
    await pedidosCreate.save();
    const exitsSubProduct:any = await subProductSchema.findById(idSubproducto);
    const newUnidades = exitsSubProduct.unidad + unidades;
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
         console.log(updateUnidades); 
    }
    }
  }
}
  
export default PedidosValiadation;
