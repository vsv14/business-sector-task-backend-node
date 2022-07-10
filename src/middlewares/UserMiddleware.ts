import { Request, Response } from "express";
import Services from "../services";
import bcrypt from 'bcrypt'




const salt = 11;



export function RegisterMiddleware(req:Request, res:Response, next:any){
    req.body.pass = bcrypt.hashSync(req.body.pass, salt);

    Services.profileService.create(req.body).then( profileDto => {
        req.body = {...profileDto};
        next();
    }).catch(e => {
        const {sqlMessage}  = e;
        if(sqlMessage){
            let sqlM:string = sqlMessage.toString();
            let msg = '';
            try{
                msg = sqlM?.split(' ').reduce((acc, value, ind, arr): string => {
                    if (ind == 2) arr.splice(1);
                    return acc + ' ' + value;
                }, 'ERROR:');
            }catch(e){

            }

            return res.status(400).json({msg});
        }else{
            return res.status(503).json('Service Unavailable');
        }
    });
}

export function LoginMiddleware(req:Request, res:Response, next:any){
    Services.profileService.findOne({email:req.body?.email})
    .then(result =>{
        if(result == null){
            return res.status(404).json({msg:'Wrong email or password'});
        }

        bcrypt.compare(req.body.pass, result.pass!).then(f=>{
            if(f){
                req.body = {...result};
                next();
            }else{
                return res.status(404).json({msg:'Wrong email or password'});
            }
        }).catch(e=>{
            throw new Error('Error hash pass');
        })
    })
    .catch(e=>{
        const {sqlMessage}  = e;
        if(!sqlMessage){
        return res.status(503).json('Service Unavailable');
        }else{
            return res.status(503).json(sqlMessage);
        }
    });
}