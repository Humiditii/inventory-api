import {Router} from 'express';
import AuthController from '../controllers/AuthController';

const authRoute = Router();
const baseRoute = Router();

authRoute.post('/signup', AuthController.Signup);

authRoute.post('/signin', AuthController.signin);

baseRoute.use('/auth', authRoute);



export default baseRoute;