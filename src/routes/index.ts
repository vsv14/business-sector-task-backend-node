import { Router } from 'express';
import AuthRouter from './AuthRoutes';
import ProfileRouter from './ProfileRoutes';



export default function getRoutes():Router{
    const routes:Router = Router();
    routes.use('/user', AuthRouter());
    routes.use('/profiles', ProfileRouter());
    return routes;

}
