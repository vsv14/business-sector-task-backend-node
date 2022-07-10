import { storageConfig } from "../config/ormconfig";
import appDataSource from "../datasource/AppDataSource";
import { Profile } from "../entities/ProfileEntity";
import ProfileRepository from "../repository/ProfileRepository";
import { ProfileService } from "./ProfileService";


class AppServices{
    public connectionCount:number;
    public profileService: ProfileService;

    public async init() {
        const dataSource = appDataSource.getDataSourceConnection(storageConfig.MYSQL1);

        const repository = dataSource!.getRepository(Profile);
        this.profileService = new ProfileService(new ProfileRepository(repository));
    }
}

const Services = new AppServices();

export default Services;