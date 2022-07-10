import { UpdateResult } from "typeorm";
import {IProfileDto, ICreateUserDto, IUpdateProfileDto} from "../dto";
import IProfileRepository from "../repository/IProfileRepository";


export class ProfileService {
    private profileRepository: IProfileRepository;
    constructor(profileRepository: IProfileRepository){
        this.profileRepository = profileRepository;
    }

    create(profile:ICreateUserDto): Promise<IProfileDto>{
        return this.profileRepository.create(profile)
        .then(p=> {
            const result: IProfileDto = {...p};
            delete result.pass;
            return result;
        }) 
    }


    findAll(profileOption:IProfileDto, option:{page:number, limit:number}):Promise<[IProfileDto[], number]>{

        return this.profileRepository.findAll(profileOption, option.page, option.limit)
        .then(result=> result);
    }

    findOne(profile:IProfileDto):Promise<IProfileDto|null>{
        return this.profileRepository.findOne(profile).then(user=>{
            return {...user};
        });
    }

    update(id:string, profile:IUpdateProfileDto):Promise<UpdateResult>{
        let oldProfile:any;

        return this.profileRepository.update(id, {...profile})
        .then( async result=>{
            if(result?.affected == 1){
                oldProfile = await this.profileRepository.findOne({id})
                .then(res => res)
                .catch(e=>{});
                const newProfile = {...oldProfile, ...profile};
                delete newProfile.pass;
                return newProfile;
            }else{
                oldProfile = await this.profileRepository.findOne({id})
                .then(res => res)
                .catch(e=>{});
                delete oldProfile.pass;
                return oldProfile;
            }

        }).catch(_e=>{});
    }
}