import {Router } from 'express';
const router:Router = Router()
import ManageProducts from '../controllers/GestionProductos'
import { ValidationTokenAndCreateToken } from "../middlewares/ValidationToken";
const valid = new ValidationTokenAndCreateToken();

class RouterProducts extends ManageProducts{
   
    public Getproducts(){
    router.get('/getProducts/:_id', valid.verifyTokenAndAdmin, this.getProducts );
      return router;    
   }

    public GetproductsId(){
    router.get('/getProductsId/:id', valid.verifyTokenAndAdmin, this.getProductsId);
      return router;
    }
    public GetproductsIdCategory(){
    router.get('/productsCategory/:idCategory', valid.verifyTokenAndAdmin, this.getProductsIdCategory);
      return router;
    }

    public PostProduct(){
    router.post('/createProducts', valid.verifyTokenAndAdmin, this.postProducts);
      return router;
    }

    public PutProducts(){
    router.put('/updateProducts/:id', valid.verifyTokenAndAdmin, this.putProducts);
      return router;
    }

    public DeleteProduct(){
    router.delete('/deleteProducts/:id',this.deleteProducts);
      return router;
    }
}

export default RouterProducts;
