import { Request, Response } from "express";
import {IProfileDto} from "../dto";
import UploadConfig from "./validators/ImageValidator";

export function UpdateProfileMiddleware(photoField:string, profileField:string){
        return (req:Request, res: Response, next:any)=>{
            const userID = req.body.userID;
            const multerSingle = UploadConfig.single(photoField);
            multerSingle(req, res, ()=>{
                let profile:IProfileDto = {};
                const dataProfile = req.body[profileField];
                if( dataProfile !== undefined){

                    if(typeof dataProfile == 'string'){
                        if(/^(data\:json\;base64\,)/.test(dataProfile)){
                            const decodedRequestBodyString = Buffer.from(dataProfile?.split(',')[1], "base64");
                            profile = JSON.parse(decodedRequestBodyString.toString());

                        }else if (/^({)/.test(dataProfile)){
                            profile = JSON.parse(req.body.profile);
                        }
                    }
                }


                const photo = (req.file?.filename != undefined)?req.file?.filename: null;

                if(photo !== null){
                    profile.photo = photo
                }

                req.body = {
                    userID,
                    ...profile
                };
                next();
            });
        }
}