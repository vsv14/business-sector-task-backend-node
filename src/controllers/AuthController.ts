import { Body, Post, Route, Tags } from 'tsoa';
import {IProfileDto, ICreateUserDto, ILoginUserDto, IResultLoginDto} from '../dto';
import { GenerateAccessToken } from '../utilities/GenerateToken';


@Tags('User')
@Route('user')
export default class AuthController{

    @Post('/register')
    register(@Body() profile:ICreateUserDto|any):IProfileDto{
        const userDto:IProfileDto = {...profile};
        delete userDto.pass;
        if(userDto.id){
            return userDto;
        }
        return {};
    }

    @Post('/login')
    login(@Body() profile:IProfileDto):IResultLoginDto{
        try{
            const token = GenerateAccessToken({id: profile.id, email: profile.email});
            const data = {
                token,
                ...profile
            }
            return data;
        }catch(e){
            return {};
        }

    }
}