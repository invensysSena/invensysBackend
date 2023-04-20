import InventorySchema from "../models/modelInventario";
import subProductSchema from "../models/SubProductos.model";
import ProviderSchema from "../models/modelProviders";
import PedidosPendientesSchema from "../models/modelPedidosPendientes";
import PedidosSchema from "../models/modelPedidos";
import { IPedidos } from "../interfaces/pedidos";






class PedidosValiadation  {

      private idBodega: string = "";
      private idProvedor: string = "";
      private idSubproducto: string = "" ;
      private tipo: string = ""; // ? pendinte o completado
      private unidades: number = 0;
      private precioCompra: number = 0;
      private precioVenta: number = 0;
      private estado: string = "";
      private company: string = "";
      private fecha: string = "";
      private totalCompra: number = 0;
      private idTokenAdmin: string = "";

      public async setProperties(
        idBodega: string,
        idProvedor: string,
        idSubproducto: string,
        tipo: string,
        unidades: number,
        precioCompra: number,
        precioVenta: number,
        estado: string,
        company: string,
        fecha: string,
        totalCompra: number,
        idTokenAdmin: string
        
      ) {
        this.idBodega = idBodega;
        this.idProvedor = idProvedor;
        this.idSubproducto = idSubproducto;
        this.tipo = tipo;
        this.unidades = unidades;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.estado = estado;
        this.company = company;
        this.fecha = fecha;
        this.totalCompra = totalCompra;
        this.idTokenAdmin = idTokenAdmin;                                             
        return await this.GetValidateBodega();
      }

      protected async GetValidateBodega ()
      {
        
        
        try {
          const bodega = await InventorySchema.findById(this.idBodega);
          
          if(!bodega) return {message: "Bodega no existe"}
          else return this.ValidateProvedor(this.idProvedor);

        } catch (error) {
            return error;
        }
      }

    protected async ValidateProvedor (idProvedor : string){
    
      
        try {
            const provedor = await ProviderSchema.findById(idProvedor);
            
            if(!provedor) return {message: "Provedor no existe"}
            else return this.ValidateProducto(this.idSubproducto);
            
        } catch (error) {
            return error;
        }
    }

    protected async ValidateProducto (subProduct : string){
      
      try {
        const subProducts = await subProductSchema.findById(subProduct);
        if(!subProducts) {this.CreateSubProduct( )}
        else return this.CreateSubProduct();
      } catch (error) {
          console.log(error);
      }
    }

    protected async CreateSubProduct (){
      console.log("CreateSubProduct");
      
      try {
        const pedido : IPedidos = new PedidosSchema({
        idTokenAdmin: this.idTokenAdmin,
        id_subProducto: this.idSubproducto,
        id_provedor: this.idProvedor,
        id_bodega: this.idBodega,
        company: this.company,
        unidades: this.unidades,
        tipo: this.tipo,
        fecha: this.fecha,
        totalCompra: this.precioCompra*this.unidades,

        });

       const pedidoCreated = await pedido.save();
       console.log("pedidoCreated",pedidoCreated);
       
        return pedidoCreated;
        
      } catch (error) {
        
      }
    }
 
    protected async UpdateSubProduct (subProduct : string){}

  
}

export default PedidosValiadation;