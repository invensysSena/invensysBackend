import InventorySchema from "../models/modelInventario";
import subProductSchema from "../models/SubProductos.model";
import ProviderSchema from "../models/modelProviders";
import PedidosPendientesSchema from "../models/modelPedidosPendientes";
import { IPendientes } from "../interfaces/PedidosPendientes";
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
  data: any;

  public async setProperties(
    idTokenAdmin: string,
    idBodega: string,
    idProvedor: string,
    idSubproducto: string,
    company: string,
    unidades: number | any,
    tipo: string,
    fecha: string,
    totalCompra: number  | any,
    name: string,
    precioCompra: number  | any,
    precioVenta: number  | any,
    estado: string,
    caducidad: string,
    data: any
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
    data;

    //const classIntance = new PedidosValiadation();

   for(
      let i = 0;
      i < data.length;
      i++
    ){
      this.idBodega = idBodega[i]
      this.idProvedor = idProvedor[i]
      this.idSubproducto = idSubproducto[i]
      this.company = company[i]
      this.unidades = unidades[i]
      this.tipo = tipo[i]
      this.fecha = fecha[i]
      this.totalCompra = totalCompra[i]
      this.name = name[i]
      this.precioCompra = precioCompra[i]
      this.precioVenta = precioVenta[i]
      this.estado = estado[i]
      this.caducidad = caducidad[i]


    }
     


  }

  protected async GetValidateBodega() {
    try {
      const bodega = await InventorySchema.find({ _id: this.idBodega });

      if (!bodega) return { message: "Bodega no existe" };
      else return this.ValidateProvedor(this.idProvedor);
    } catch (error) {
      return error;
    }
  }

  protected async ValidateProvedor(idProvedor: string) {
    try {
      const provedor = await ProviderSchema.find({ _id: idProvedor });

      if (!provedor) return { message: "Provedor no existe" };
      else return this.ValidateProducto(this.idSubproducto);
    } catch (error) {
      return error;
    }
  }

  protected async ValidateProducto(idPsubProduct: string) {
    try {
      const subProducts = await subProductSchema.findById(idPsubProduct);

      if (subProducts) {
        return await this.CreatePedido([]);
      } else {
        {
          message: "Producto no existe";
        }
      }
    } catch (error) {
      return await this.CreatePedido([]);
    }
  }

  async CreatePedido(
    pedidos: PedidosValiadation[],
    idTokenAdmin?: string | unknown
  ) {
    pedidos.forEach(async (order) => {
      try { 
             const { idSubproducto, idProvedor, idBodega, ...props } = order;

          const newOrder = new PedidosSchema({
        ...props,
        idTokenAdmin,
        id_bodega: idBodega,
        id_subProducto: idSubproducto,
        id_provedor: idProvedor,
      });
      await newOrder.save();
     // await this.CreateSubPendiente();
      } catch (error) {
        return error
      }
    
    });
   
  }

  createOrder = (data: any) => {
    return {
      idTokenAdmin: data.idTokenAdmin,
      id_subProducto: data.idSubproducto,
      id_provedor: data.idProvedor,
      id_bodega: data.idBodega,
      company: data.company,
      unidades: data.unidades,
      tipo: data.tipo,
      fecha: data.fecha,
      totalCompra: data.totalCompra,
    };
  };

  protected async CreateSubPendiente() {
    try {
      const pedidosPendientes: IPendientes = new PedidosPendientesSchema({
        name: this.name,
        precioCompra: this.precioCompra,
        precioVenta: this.precioVenta,
        tipo: this.tipo,
        estado: this.estado,
        unidades: this.unidades,
        caducidad: this.caducidad,
        idBodega: this.idBodega,
      });

      const resPedidosPendientes = await pedidosPendientes.save();
      console.log("resPedidosPendientes", resPedidosPendientes);
    } catch (error) {
      console.log("error", error);
    }
  }
}

export default PedidosValiadation;
