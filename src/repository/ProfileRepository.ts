import { Repository, UpdateResult } from "typeorm";
import {IProfileDto, IUpdateProfileDto} from "../dto";
import { Profile } from "../entities/ProfileEntity";
import IProfileRepository from "./IProfileRepository";



export default class ProfileRepository implements IProfileRepository{
    private repository: Repository<Profile>;

    constructor(reposytory: Repository<Profile>){
        this.repository = reposytory;
    }

    create(profile: IUpdateProfileDto): Promise<Profile> {
        const newProfile = this.repository.manager.create(Profile, profile);
        return this.repository.save(newProfile);
    }

    findAll(option: IProfileDto, page: number, limit: number): Promise<[Profile[], number]> {
        let skip = limit*(page-1);
        return this.repository.findAndCount({
            where: option,
            order:{
                createdAt: 'ASC'
            },
            skip,
            take: limit,
            select:{
                pass:false,

                id:true,
                email:true,
                name:true,
                surname:true,
                gender:true,
                photo:true,
                createdAt:true,
                updatedAt:true,
            }
        });
    }

    findOne(profile:IProfileDto): Promise<Profile|null> {
        return this.repository.findOne({
            where:{...profile},
        });
    }

    update(id:string, profile:IUpdateProfileDto): Promise<UpdateResult> {
        return this.repository.update({id},{...profile});
    }
}