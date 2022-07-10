import jwt from 'jsonwebtoken';
import { configJWT } from '../config/configjwt';
import {ILoginUserDto, IProfileDto} from "../dto";

export function GenerateAccessToken (payload:ILoginUserDto):string{
    return jwt.sign(
        {
            type: configJWT.tokens.access.type,
            ...payload,
        },
        configJWT.secret,
        {
            expiresIn:configJWT.tokens.access.expiresIn,
        }
    );
}


export function TokenIsValid(token:string):IProfileDto|undefined{
    try {
        const verify:IProfileDto = jwt.verify(token, configJWT.secret) as {};
        if(typeof verify == 'object'){
            return {
                id: verify.id,
                email: verify.email
            };
        }
    } catch (e) {
        return undefined
    }
}