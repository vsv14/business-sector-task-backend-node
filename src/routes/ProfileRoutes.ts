import { Request, Response, Router } from "express";
import ProfileController from "../controllers/ProfileController";
import { AccessMiddleware } from "../middlewares/AccessMiddleware";
import { UpdateProfileMiddleware } from "../middlewares/UpdateProfileMiddleware";
import ProfileValidator from "../middlewares/validators/ProfileValidator";
import Services from "../services";


export default function ProfileRouter():Router{
        const profileController = new ProfileController(Services.profileService);
        const profileRouter:Router = Router();


        profileRouter
                .use('/', AccessMiddleware)
                .get('/',async (req: Request, res: Response)=> {
                        if(!req.query.page) return res.redirect('?page=1');

                        let page:string|number = (req.query.page as string)||'1';
                        let limit: string|number = (req.query.limit as string)||'10';
                        try{
                                page = parseInt(page as string, 10);
                                limit = parseInt(limit as string, 10);
                        }catch(e){}
                        
                        const result = await profileController.getProfiles({...req.params, page, limit});
                        if(result) return res.status(200).json(result);

                        return res.status(501);

                })
                .get('/:id', async (req: Request, res: Response)=> {
                        const result = await profileController.getProfile(req.params);

                        if(result) return res.status(200).json(result);
                        if(result == null) return res.status(204).json({msg:'profile not found'});

                        return res.status(501);
                })
                .put('/:id',
                        [ 
                                UpdateProfileMiddleware('photo', "profile"),
                                ProfileValidator.M_isEmail('email'),
                                ProfileValidator.M_isCorrectName('name'),
                                ProfileValidator.M_isCorrectName('surname'),
                        ],
                        async (req: Request, res: Response)=> {
                                if(Object.keys(req.body).length===0){
                                        return res.status(204).json({msg:'empty fields, set values'});
                                }
                                
                                const result = await profileController.updateProfile(req.params.id ,req.body);
                                return res.status(200).json(result);
                        }
                );

        return profileRouter;
}