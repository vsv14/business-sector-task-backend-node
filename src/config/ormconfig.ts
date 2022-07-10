import { DataSourceOptions } from "typeorm"
import { isProduction } from "../utilities/IsProdaction";


export interface KeyOption {
    key: string;
    option: DataSourceOptions;
}

interface Option {
    [key: string]: DataSourceOptions;
}

export enum  storageConfig {
    MYSQL1='MYSQL1',
}

const storage: Option = {
    MYSQL1: {
        type: "mysql",
        host: process.env.MYSQL_1_HOST,
        port: parseInt(process.env.MYSQL_1_PORT!, 10),
        username: process.env.MYSQL_1_USERNAME,
        password: process.env.MYSQL_1_PASS,
        database: process.env.MYSQL_1_DATABASE,
        synchronize: true,
        logging: false,
         entities: [
            isProduction()?"dist/entities/**/*Entity.js":"src/entities/**/*Entity.ts",
            
        ],
        migrations: [
            "dist/migrations/**/*.js"
        ],
    },
};

export function getDataSourceKeyOption(key:string):KeyOption{
    return {
        key,
        option: storage[key]
    }
}