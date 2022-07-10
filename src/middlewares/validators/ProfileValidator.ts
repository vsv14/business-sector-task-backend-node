import { Request, Response } from "express";
import {IProfileDto} from "../../dto";


export default abstract class ProfileValidator {

    public static validate(profile:IProfileDto):any{
        const msg = {
            errorEmail: this.EmailValidate(profile.email),
            errorPass: this.PassValidate(profile.pass, 8),
            errorName: this.NameValidate(profile.name),
            errorSurname: this.NameValidate(profile.surname),
            errorGender: this.GenderValidate(profile.gender),
        };

        return msg;
    }

    public static EmailValidate(email:string|undefined):string|undefined{
        const regexp = new RegExp('\^((\\w+)+(@)([a-zA-Z]+).(com|ru))\$');

        if(!email){
            return undefined;
        }

        if(email.length>=12 && !regexp.test(email)){
            return '[ERROR] Syntax email';
        }

        return undefined;
    }

    public static NameValidate(name:string|undefined):string|undefined{
        const regexp = new RegExp('\^([a-z]+|([a-z]+ [a-z]+)|([a-z]+ [a-z]+ [a-z]+))\$', 'i');

        if(!name){
            return undefined;
        }
        const f = regexp.test(name);

        if(name.length>0 && !f){
            return '[ERROR] Unavailable chars property: ';
        }

        return undefined;
    }

    public static PassValidate(pass:string|undefined, min:number):string|undefined{

        if(!pass){
            return undefined;
        }

        if(!(pass.length>=min)){
            return '[ERROR] Password size: min 8';
        }

        return undefined;
    }

    public static GenderValidate(gender:string|undefined):string|undefined{
        const regexp = new RegExp('^(man|woman)$');

        if(!gender){
            return undefined;
        }

        if(gender.length>0 && !regexp.test(gender)){
            return '[ERROR] unavailable word';
        }

        return undefined;
    }


    public static M_isEmail(prop:string){
        return (req:Request, res:Response, next:any)=>{
            const result = this.EmailValidate(req.body[prop]);
            if(!result){
                next();
            }else{
                return res.json({msg: result});
            }
        }
    }

    public static M_isCorrectName(prop:string){
        return (req:Request, res:Response, next:any)=>{
            const result = this.NameValidate(req.body[prop]);
            if(!result){
                next();
            }else{
                return res.json({msg: result + prop});
            }
        }
    }

    public static M_isCorrectPass(prop:string, min:number = 8){
        return (req:Request, res:Response, next:any)=>{
            const result = this.PassValidate(req.body[prop], min);
            if(!result){
                next();
            }else{
                return res.json({msg: result});
            }
        }
    }
}