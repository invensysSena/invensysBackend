import ManagePedidos from "../controllers/GestionPedidos";
import { IPedidos } from "../interfaces/pedidos";




class PedidosValiadation extends ManagePedidos {

      public ValidateInventario (
        idBodega: string,
        idProvedor: string,
        token: string,
        idSubproducto: string,
        tipo : string,
        unidades: number,
        precioCompra: number,
        precioVenta: number,
        estado: string,
      ){
        try {
            if(!idBodega){
                return {
                    ok: false,
                    message: 'No existe el id de la bodega'
                }
            }
            if(!idProvedor){
                return {
                    ok: false,
                    message: 'No existe el id del provedor'
                }
            }
            if(!token){
                return {
                    ok: false,
                    message: 'No existe el token'
                }
            }
            if(!idSubproducto){
                return {
                    ok: false,
                    message: 'No existe el id del subproducto'
                }
            }
            if(!tipo){
                return {
                    ok: false,
                    message: 'No existe el tipo'
                }
            }
            if(!unidades){
                return {
                    ok: false,
                    message: 'No existe las unidades'
                }
            }
            if(!precioCompra){
                return {
                    ok: false,
                    message: 'No existe el precio de compra'
                }
            }
            if(!precioVenta){
                return {
                    ok: false,
                    message: 'No existe el precio de venta'
                }
            }
            if(!estado){
                return {
                    ok: false,
                    message: 'No existe el estado'
                }
            }
        } catch (error) {
            return error;
        }
      }

    public async  ValidateBodega (
        idBodega: string,
        idSubproducto: string,
        idProducto: string,
        idProvedor: string,
        cantidad: number
        ){
            try {
                
            } catch (error) {
                return error;
            }
        }

    private ValidateProvedor (){}

    private ValidateProducto (){}

  
}

export default PedidosValiadation;