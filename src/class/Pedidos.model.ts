import InventorySchema from "../models/modelInventario";
import subProductSchema from "../models/SubProductos.model";
import ProviderSchema from "../models/modelProviders";
import PedidosPendientesSchema from "../models/modelPedidosPendientes";
import { IPendientes} from '../interfaces/PedidosPendientes';
import PedidosSchema from "../models/modelPedidos";
import { IPedidos } from "../interfaces/pedidos";

class PedidosValiadation { 
  private idTokenAdmin: string = "";
  private idBodega: string = "";
  private idProvedor: string = "";
  private idSubproducto: string = "";
  private company: string = "";
  private unidades: number = 0; 
  private tipo: string = ""; // ? pendiente o completado  
  private fecha: string = "";
  private totalCompra: number = 0;
  private name: string = "";
  private precioCompra: number = 0;
  private precioVenta: number = 0;
  private estado: string = "";
  private caducidad: string = "";

  public async setProperties(  
    idTokenAdmin: string,
    idBodega: string,
    idProvedor: string,
    idSubproducto: string,
    company: string,
    unidades: number, 
    tipo: string,  
    fecha: string,
    totalCompra: number,
    name: string,
    precioCompra: number,
    precioVenta: number,
    estado: string,
    caducidad: string
  ) {
    this.idTokenAdmin = idTokenAdmin;
    this.idBodega = idBodega;
    this.idProvedor = idProvedor;
    this.idSubproducto = idSubproducto;
    this.company = company;
    this.unidades = unidades; 
    this.tipo = tipo;
    this.fecha = fecha;
    this.totalCompra = totalCompra;
    this.name = name;
    this.precioCompra = precioCompra;
    this.precioVenta = precioVenta;
    this.estado = estado;
    this.caducidad = caducidad;
 
    return await this.GetValidateBodega();
  }

  protected async GetValidateBodega() {
    try {
      const bodega = await InventorySchema.findById(this.idBodega);

      if (!bodega) return { message: "Bodega no existe" };
      else return this.ValidateProvedor(this.idProvedor);
    } catch (error) {
      return error;
    }
  }

  protected async ValidateProvedor(idProvedor: string) {
    try {
      const provedor = await ProviderSchema.findById(idProvedor);

      if (!provedor) return { message: "Provedor no existe" };
      else return this.ValidateProducto(this.idSubproducto);
    } catch (error) {
      return error;
    }
  }
 
  protected async ValidateProducto(idPsubProduct: string) {
    try {
         const subProducts = await subProductSchema.findById(idPsubProduct);
      if (subProducts){
       return await this.CreatePedido();
      } 
      else {
      // { message: "Producto no existe" };
        
      }; 
      
     
    } catch (error) {
      
      return await this.CreatePedido();
    }
  }
  
  protected async CreatePedido() {
 console.log("entrooooo");
    try {
      const pedido: IPedidos = new PedidosSchema({
        idTokenAdmin:this.idTokenAdmin,
        id_subProducto: this.idSubproducto,
        id_provedor: this.idProvedor,
        id_bodega: this.idBodega,
        company: this.company,
        unidades: this.unidades,
        tipo: this.tipo,
        fecha:this.fecha, 
        totalCompra:this.totalCompra

      });

      const pedidoCreated = await pedido.save(); 
      await this.CreateSubPendiente();
    } catch (error) {
      console.log("error", error);
    }
  }

  protected async CreateSubPendiente() {

   
    
    
    try {
      
       const pedidosPendientes : IPendientes =  new PedidosPendientesSchema({
        name:this.name,
        precioCompra:this.precioCompra,
        precioVenta:this.precioVenta,
        tipo:this.tipo,
        estado:this.estado,
        unidades:this.unidades,
        caducidad: this.caducidad,
        idBodega: this.idBodega,
       })

       const resPedidosPendientes = await pedidosPendientes.save();
        console.log("resPedidosPendientes", resPedidosPendientes);
    } catch (error) {
      console.log("error", error);
      
    }
  }

  
}

export default PedidosValiadation;
