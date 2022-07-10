import { DataSource } from "typeorm";
import { getDataSourceKeyOption, storageConfig } from "../config/ormconfig";

export default new DataSource (getDataSourceKeyOption(storageConfig.MYSQL1).option);