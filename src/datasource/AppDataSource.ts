import { DataSource } from "typeorm";
import { KeyOption } from "../config/ormconfig";


class AppDataSource{

    private sources: Map<string,DataSource>;

    constructor(){
        this.sources = new Map<string, DataSource>();
    }

    public async createConnection(keyOption:KeyOption){
        const {key, option} = keyOption;
        const dataSource = new DataSource(option);
        console.log(`start connection: ${key}`);
        await dataSource.initialize()
        .then(() => {
            this.sources.set(key, dataSource);
            console.log(`[STATUS: CONNECTED] Data Source:${key} has been initialized!`)
        })
        .catch((err) => {
            console.error(`[ERROR] during Data Source initialization:${key}`)
                throw Error(err);
        })
    }

    public getDataSourceConnection(key:string):DataSource|undefined{
        return this.sources.get(key);
    }
}

const appDataSource = new AppDataSource();
export default appDataSource;