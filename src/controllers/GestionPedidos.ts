import { Request, Response, NextFunction } from 'express';
import SchemaPedidos from '../models/pedidos';

abstract class ManagePedidos {

  public async postPedidos(req: Request, res: Response, next: NextFunction): Promise<Response | Request | any> {
    try {

      const { id_producto, id_provedor, id_inventario, company, cantidad, fecha, totalCompra } = req.body;
     
      //const inventario = await SchemaPedidos.findOne({ id_inventario: id_inventario });
      if (id_inventario === id_inventario) { // aqui faltan los subProductos
        const newPedidos = new SchemaPedidos({
          id_producto,
          id_provedor,
          id_inventario,
          company,
          cantidad,
          fecha,
          totalCompra
        });
        const pedidosSaved = await newPedidos.save();
        return res.status(201).json({ message: 'PEDIDOS_CREATED', pedidosSaved });
      } else {
        return res.status(400).json({ message: 'BAD_REQUEST' });
      }
    } catch (error) {

      return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', error })

    }
  }

  public async getPedidos(req: Request, res: Response, next: NextFunction): Promise<Response | Request | any> {
    try {
      const pedidos = await SchemaPedidos.find();
      return res.status(200).json({ message: 'PEDIDOS_FOUND', pedidos });
    } catch (error) {
      return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', error })
    }
  }

  public async getPedidosId(req: Request, res: Response, next: NextFunction): Promise<Response | Request | any> {
    try {
      const { id } = req.params;
      const pedidos = await SchemaPedidos.findById(id);
      return res.status(200).json({ message: 'PEDIDOS_FOUND', pedidos });
    } catch (error) {
      return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', error })
    }
  }

  public async putPedidos(req: Request, res: Response, next: NextFunction): Promise<Response | Request | any> {
    try {
      const { id } = req.params;
      const { id_producto, id_provedor, id_inventario, company, cantidad, fecha } = req.body;
      const pedidos = await SchemaPedidos.findByIdAndUpdate(id, {
        id_producto,
        id_provedor,
        id_inventario,
        company,
        cantidad,
        fecha
      }, { new: true });
      return res.status(200).json({ message: 'PEDIDOS_UPDATED', pedidos });
    } catch (error) {
      return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', error })
    }
  }

  public async deletePedidos(req: Request, res: Response, next: NextFunction): Promise<Response | Request | any> {
    try {
      const { id } = req.params;
      const pedidos = await SchemaPedidos.findByIdAndDelete(id);
      return res.status(200).json({ message: 'PEDIDOS_DELETED', pedidos });
    } catch (error) {
      return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', error })
    }
  }

}

export default ManagePedidos;