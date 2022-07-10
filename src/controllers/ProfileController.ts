import { IUpdateProfileDto, IProfilesDto } from './../dto/index';
import { Get, Put, Body, Route, Tags, Query } from "tsoa";
import { UpdateResult } from "typeorm";
import {IProfileDto} from "../dto";
import { ProfileService } from "../services/ProfileService";

@Tags('Profiles')
@Route('profiles')
export default class ProfileController {
    profileService:ProfileService;

    constructor(profileService: ProfileService){
        this.profileService = profileService;
    }

    @Get('/')
    getProfiles(@Query() option: any):Promise<IProfilesDto|void>{
        const {page, limit} = option;
        
        delete option.page;
        delete option.limit;

        return this.profileService.findAll(option, {page, limit}).then(result=>{
            return {total: result[1], profiles: result[0]};
        }).catch(e=>{});
    }

    @Get('/{id}')
    getProfile(@Query() option: any): Promise<IProfileDto|void>{
        return this.profileService.findOne({...option})
        .then(result=>{
            delete result?.pass;
            return result||{};
        }).catch(e=>{});
    }

    @Put('/{id}')
    updateProfile(@Query('id')id:string, @Body() profileDto:IUpdateProfileDto|any):Promise<UpdateResult>{
        // const userID = profileDto.userID;
        delete profileDto.userID;
        
        delete profileDto?.id;
        delete profileDto?.pass;
        delete profileDto?.createdAt;
        delete profileDto?.updatedAt;

        return this.profileService.update(id, {...profileDto})
    }
}


