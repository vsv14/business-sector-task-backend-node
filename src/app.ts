import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import getRoutes from './routes';
import AppDataSource from './datasource/AppDataSource';
import { getDataSourceKeyOption, storageConfig } from './config/ormconfig';
import Services from './services';
import path from 'path';
import { makeFolders } from './utilities/MakeFolders';
import swaggerUi from "swagger-ui-express";


dotenv.config();
const PORT = parseInt(process.env.PORT as string, 10) || 3000;

async function bootstrap() {

    try{
        await AppDataSource.createConnection(getDataSourceKeyOption(storageConfig.MYSQL1));
        Services.init();

        makeFolders('static/images');

        const serverApi = express();
        serverApi.use(express.json());
        // serverApi.use('/', express.static(path.resolve(__dirname, '../static/images')));

        serverApi.use(express.static("static"));
        serverApi.use(
            "/api/docs",
            swaggerUi.serve,
            swaggerUi.setup(undefined, {
              swaggerOptions: {
                url: "/swagger.json",
              },
            })
          );

        serverApi.use('/api', getRoutes());
        serverApi.listen( PORT, 'localhost', ():void=> console.log(`App listening PORT: ${PORT}`));

    }catch(err){
        console.error('Server shutdown');
        throw err;
    }
}

bootstrap();