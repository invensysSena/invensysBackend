import { subProducts } from "../interfaces/SubProducts";
import TranslateSubPSchema from "../interfaces/TranslateSubP.Model";
import subProductSchema from "../models/SubProductos.model";
import InventorySchema from "../models/modelInventario";
class TranslateBodega {
  private idAdmin: string | number = "";
  private idDestino: string | number = "";
  private idOrigen: string | number = "";
  private idSubProducto: string | number = "";
  private cantidad: any;
  private userCorreo: string = "";

  public async Initial() {
    return this.postInsertTranslateProduct();
  }
  constructor(
    idAdmin: string | number,
    idDestino: string | number,
    idOrigen: string | number,
    idSubProducto: string | number,
    cantidad: any,
    userCorreo: string
  ) {
    this.idAdmin = idAdmin;
    this.idDestino = idDestino;
    this.idOrigen = idOrigen;
    this.idSubProducto = idSubProducto;
    this.cantidad = cantidad;
    this.userCorreo = userCorreo;
  }

  protected async postInsertTranslateProduct() {
    try {
      const searchInventory = await InventorySchema.findById(this.idOrigen);
      return await this.RestarCantidad(searchInventory);
    } catch (error) {
      return error;
    }
  }
  protected async RestarCantidad(searchInventory: any) {
    try {
      const searchSubProducts = await subProductSchema.findById(
        this.idSubProducto
      );
      if (searchSubProducts) {
        return this.updateUnidades(searchSubProducts, searchInventory);
      }
    } catch (error) {
      return { messaje: "NoProductsBodega" };
    }
  }

  protected async updateUnidades(searchSubProducts: any, searchInventory: any) {
    try {
      const newUnidades = searchSubProducts.unidad - this.cantidad;
      const response = await subProductSchema.findByIdAndUpdate(
        this.idSubProducto,
        {
          unidad: newUnidades,
        },
        { new: true }
      );
      return this.InserTranslateSubP(searchInventory, searchInventory);
    } catch (error) {
      return { messaje: "ErrorUpdateUnidades" };
    }
  }

  protected async InserTranslateSubP(
    searchInventory: any,
    searchSubProducts: any
  ) {
    try {
      const data = {
        idAdmin: this.idAdmin,
        idDestino: this.idDestino,
        idOrigen: this.idOrigen,
        idSubProducto: this.idSubProducto,
        cantidad: parseInt(this.cantidad),
        userCorreo: this.userCorreo,
        origen: searchInventory.name_inventory,
        responsable: searchInventory.responsableInventory,
      };

      const SearchTranslateSubP: any = await TranslateSubPSchema.find({
        idDestino: this.idDestino,
      });

      if (SearchTranslateSubP.length === 0) {
        const response = new TranslateSubPSchema(data);
        const dataResponse = await response.save();
        return { messaje: "InsertTranslateSubP", dataResponse };
      } else {
        for (let i = 0; i < SearchTranslateSubP.length; i++) {
          if (SearchTranslateSubP[i].userCorreo === this.userCorreo) {
            const updateTranslateUnidades =
              await TranslateSubPSchema.findByIdAndUpdate(
                SearchTranslateSubP[i]._id,
                {
                  cantidad:
                    SearchTranslateSubP[i].cantidad + parseInt(this.cantidad),
                },
                { new: true }
              );
            return { messaje: "UpdateTranslateSubP", updateTranslateUnidades };
          } else {
            const response = new TranslateSubPSchema(data);
            const dataResponse = await response.save();
            return { messaje: "InsertTranslateSubP", dataResponse };
          }
        }
      }
    } catch (error) {
      return { messaje: "ErrorInsertTranslateSubP" };
    }
  }

  public async TranslateProduct(id: string, type: string) {
    if (type === "Aceptado") {
      const searchTranslateProduct: any = await TranslateSubPSchema.findById(
        id
      );
      if (searchTranslateProduct) {
        const Searchinventory = await InventorySchema.findById(
          searchTranslateProduct.idDestino
        );
        if (Searchinventory) {
          const searchSubProducts = await subProductSchema.find({
            idInventory: Searchinventory._id,
          });
          if (searchSubProducts.length > 0) {
            const filterSearchSubProducts: any = searchSubProducts.filter(
              (item) => item.name === searchTranslateProduct.userCorreo
            );
            if (filterSearchSubProducts.length > 0) {
              console.log("existe", filterSearchSubProducts[0].name);

              if (
                filterSearchSubProducts[0].name ===
                searchTranslateProduct.userCorreo
              ) {
                console.log(
                  "Los nombres son iguales",
                  filterSearchSubProducts[0].name,
                  searchTranslateProduct.userCorreo
                );
                const updateUnidades = await subProductSchema.findByIdAndUpdate(
                  filterSearchSubProducts[0]._id,
                  {
                    unidad:
                      filterSearchSubProducts[0].unidad +
                      searchTranslateProduct.cantidad,
                  },
                  { new: true }
                );
                const deleteTranslateProduct =
                  await TranslateSubPSchema.findByIdAndDelete(id);
              }
            } else {
              const dataPost = {
                name: searchTranslateProduct.userCorreo,
                priceCompra: 0,
                priceVenta: 0,
                stockMinimo: 0,
                stockMaximo: 0,
                unidad: searchTranslateProduct.cantidad,
                caducidad: 0,
                idInventory: Searchinventory._id,
              };
              const {
                name,
                priceCompra,
                priceVenta,
                stockMinimo,
                stockMaximo,
                unidad,
                caducidad,
                idInventory,
              } = dataPost;
              const subProduct = new subProductSchema({
                name,
                priceCompra,
                priceVenta,
                stockMinimo,
                stockMaximo,
                unidad,
                caducidad,
                idInventory,
              });
              const response = await subProduct.save();
              const deleteTranslateProduct =
                await TranslateSubPSchema.findByIdAndDelete(id);
            }
          }
        }
      } else {
      }
    } else {
      const searchTranslateProduct: any = await TranslateSubPSchema.findById(
        id
      );
      const searchSubProducts: any = await subProductSchema.findById(
        searchTranslateProduct.idSubProducto
      );
      const updateCantidadesSubProducts =
        await subProductSchema.findByIdAndUpdate(
          searchSubProducts._id,
          {
            unidad: searchSubProducts.unidad + searchTranslateProduct.cantidad,
          },
          { new: true }
        );
      await TranslateSubPSchema.findByIdAndDelete(id);
    }
  }
}

export default TranslateBodega;
