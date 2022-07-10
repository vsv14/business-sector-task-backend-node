import { UpdateResult } from "typeorm";
import {IProfileDto} from "../dto";
import { Profile } from "../entities/ProfileEntity";

export default interface IProfileRepository {

    create(profileDto:IProfileDto):Promise<Profile>;
    findAll(option: IProfileDto, page:number, limit:number):Promise<[Profile[], number]>;
    findOne(profileDto:IProfileDto):Promise<Profile|null>;
    update(id:string, profileDto:IProfileDto):Promise<UpdateResult>;
}