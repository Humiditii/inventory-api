import {Router} from 'express';
import CheckAuth from '../middlewares/CheckAuth';
import SaleController from '../controllers/SaleController';

const saleRoute = Router();

const baseRoute = Router();

saleRoute.post('/new-sale', CheckAuth.verifyAuth, SaleController.sell);

saleRoute.get('/sales/:from/:to', CheckAuth.verifyAuth, SaleController.viewSales);

saleRoute.get('/product-list', CheckAuth.verifyAuth, SaleController.getProductList);

baseRoute.use('/sale', saleRoute)

export default baseRoute

