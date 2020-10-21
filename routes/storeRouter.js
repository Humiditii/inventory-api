import { Router } from 'express';
import CheckAuth from '../middlewares/CheckAuth';
import StoreController from '../controllers/StoreController';
import SaleController from '../controllers/SaleController';

const baseRoute = Router();

const storeRoute = Router();

storeRoute.post('/add-product', CheckAuth.verifyAuth, StoreController.addProduct);

storeRoute.get('/products', CheckAuth.verifyAuth, StoreController.getProducts);

storeRoute.patch('/edit-product/:productId', CheckAuth.verifyAuth, StoreController.editProduct);

storeRoute.delete('/delete/:productId', CheckAuth.verifyAuth, StoreController.deleteProduct);

baseRoute.use('/product', storeRoute);

export default baseRoute;