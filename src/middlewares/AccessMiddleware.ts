import { Request, Response } from "express";
import { TokenIsValid } from "../utilities/GenerateToken";

export function AccessMiddleware(req:Request, res:Response, next:any){
    try{
        let token:string|undefined = req.headers.authorization?.split(' ')[1];

        // Test Token 100 days

        
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzIiwiaWQiOiJiNWNhNzI3OC0zYzI0LTRkNjctODkxNy01ZjQ2NjZhOWJiMDQiLCJlbWFpbCI6ImVtYWlsXzEyMEBnbWFpbC5ydSIsImlhdCI6MTY1NzM5NTQ4NSwiZXhwIjoxNjY2MDM1NDg1fQ.6F1XjNhq7PSd1OII4OzLOZPNYdApV3suuOUMPaCaOI0';
        // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
        
        if(token==undefined){
            return res.status(403).json({msg:'Access token missing'});
        }

        const payload = TokenIsValid(token!);
        if(payload == undefined){
            return res.status(403).json({msg:'Access token deprecated'});
        }
        req.body.userID = payload.id;

        next();
    }catch(e){

    }
}