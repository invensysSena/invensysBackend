import InventorySchema from "../models/modelInventario";
import subProductSchema from "../models/SubProductos.model";
import ProviderSchema from "../models/modelProviders";
import PedidosPendientesSchema from "../models/modelPedidosPendientes";
import PedidosSchema from "../models/modelPedidos";
import { IPedidos } from "../interfaces/pedidos";

class PedidosValiadation {
  private idBodega: string = "";
  private idProvedor: string = "";
  private idSubproducto: string = "";
  private company: string = "";
  private unidades: number = 0; 
  private tipo: string = ""; // ? pendiente o completado  
  private fecha: string = "";
  private totalCompra: number = 0;
  private precioCompra: number = 0;
  private precioVenta: number = 0;
  private estado: string = "";

 
  private idTokenAdmin: string = "";

  public async setProperties(
    idBodega: string,
    idProvedor: string,
    idSubproducto: string,
    company: string,
    unidades: number, 
    tipo: string,  
    fecha: string,
    totalCompra: number,
    precioCompra: number,
    precioVenta: number,
    estado: string,
  
    idTokenAdmin: string
  ) {
    this.idBodega = idBodega;
    this.idProvedor = idProvedor;
    this.idSubproducto = idSubproducto;
    this.company = company;
    this.unidades = unidades; 
    this.tipo = tipo;
    this.fecha = fecha;
    this.totalCompra = totalCompra;
    this.precioCompra = precioCompra;
    this.precioVenta = precioVenta;
    this.estado = estado;
    this.idTokenAdmin = idTokenAdmin;
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
       return await this.CreateSubProduct();
      } 
      else {
      // { message: "Producto no existe" };
        
      }; 
    } catch (error) {
      console.log("----------",error); 
      return await this.CreateSubProduct();
    }
  }
  
  protected async CreateSubProduct() {
    console.log("CreateSubProduct");
 
   
    try {
      const pedido: IPedidos = new PedidosSchema({
        //this.idTokenAdmin,
        // id_subProducto: this.idSubproducto,
        // id_provedor: this.idProvedor,
        // id_bodega: this.idBodega,
        // company: this.company,
        // unidades: this.unidades,
        // tipo: this.tipo,
        // fecha: this.fecha,
        // totalCompra: this.precioCompra * this.unidades,

        idTokenAdmin:this.idTokenAdmin, //"5f9f1b0b0b9b9c0b0c0b0b0b",
        id_subProducto: this.idSubproducto,//"64408204142c2c5aa3fdd36bl",
        id_provedor: this.idProvedor,// "643ae964a55fbcb20eab99c3",
        id_bodega: this.idBodega,//"643ffee7d11f5e0c17c06ebd",
        company: this.company,//"don leche",
        unidades: this.unidades,// 10,
        tipo: this.tipo,
        fecha:this.fecha, //"2020-11-02",
        totalCompra:this.totalCompra// 500,

      });

      const pedidoCreated = await pedido.save();
      console.log("pedidoCreated", pedidoCreated);
    } catch (error) {}
  }

  protected async UpdateSubProduct(subProduct: string) {}
}

export default PedidosValiadation;
