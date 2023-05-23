import subProductSchema from "../models/SubProductos.model";
import PedidosPendientesSchema from "../models/modelPedidosPendientes";
import PedidosSchema from "../models/modelPedidos";
import PedidoProvider from "../models/PedidosProvedor";
import { v4 as uuidv4 } from "uuid";

class PedidosValiadation {
  private idTokenAdmin: string = "";
  data: any;

  public async setProperties(data: any, idTokenAdmin: string) {
    this.data = data;
    this.idTokenAdmin = idTokenAdmin;
    return await this.validateData(data);
  }

  private async validateData(data: any) {
    
    const uuidAuth: any  = {
      node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
      clockseq: 0x1234,
      msecs: new Date().getTime(),
      nsecs: 5678,
    };
    
    const [{fecha, name}] = data
    const TotalComprap = data.map((i: any) => i.totalCompra).reduce((a:number, b:number) => a + b);
    const newPedidoProvider = new PedidoProvider({
      idTokenAdmin: this.idTokenAdmin,
      NR: uuidv4(uuidAuth),
      name: name,
      fecha: fecha,
      cantidadProductos: data.length,
      totalComprap: TotalComprap,
    });

    const response = await newPedidoProvider.save();

    const { _id } = response;


    if (data.length > 1) {
      for (let i = 0; i < data.length; i++) {
        const pedidosCreate = new PedidosSchema({
          idTokenAdmin: this.idTokenAdmin,
          id_subProducto: data[i].idSubproducto,
          id_provedor: data[i].idProvedor,
          id_bodega: data[i].idBodega,
          company: data[i].company,
          unidades: data[i].unidades,
          tipo: data[i].tipo,
          fecha: data[i].fecha,
          totalCompra: data[i].totalCompra,
          idPedidoProvider: _id,
        });
        await pedidosCreate.save();

        const exitsSubProduct: any = await subProductSchema.findById(
          data[i].idSubproducto
        );
        const newUnidades = exitsSubProduct.unidad + data[i].unidades;
        if (!exitsSubProduct) {
          throw new Error("SUBPRODUCT_NOT_FOUND");
        } else {
          const updateUnidades = await subProductSchema.findByIdAndUpdate(
            { _id: data[i].idSubproducto },
            {
              unidad: newUnidades,
            },
            { new: true }
          );
        }
      }
    } else {
      const [
        {
          idSubproducto,
          unidades,
          idProvedor,
          idBodega,
          company,
          tipo,
          fecha,
          totalCompra,
        },
      ] = data;
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
        idPedidoProvider: _id,
      });
      await pedidosCreate.save();
      const exitsSubProduct: any = await subProductSchema.findById(
        idSubproducto
      );
      const newUnidades = exitsSubProduct.unidad + unidades;
      if (!exitsSubProduct) {
        throw new Error("SUBPRODUCT_NOT_FOUND");
      } else {
        const updateUnidades = await subProductSchema.findByIdAndUpdate(
          { _id: idSubproducto },
          {
            unidad: newUnidades,
          },
          { new: true }
        );
        console.log(updateUnidades);
      }
    }
  }
}

export default PedidosValiadation;
