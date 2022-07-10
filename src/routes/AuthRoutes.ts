import { Request, Response, Router } from "express";
import AuthController from "../controllers/AuthController";
import { LoginMiddleware, RegisterMiddleware } from "../middlewares/UserMiddleware";
import ProfileValidator from "../middlewares/validators/ProfileValidator";




export default function AuthRouter():Router{
        const authController:AuthController = new AuthController();
        const authRouter:Router = Router();

        authRouter
                .post('/register',
                        [
                                ProfileValidator.M_isEmail('email'),
                                ProfileValidator.M_isCorrectName('name'),
                                ProfileValidator.M_isCorrectPass('pass', 8),
                                RegisterMiddleware,
                        ],
                        (req: Request, res: Response)=> {
                                const newUser = authController.register(req.body);
                                if(newUser) res.status(201).json(newUser);

                                return res.status(501);
                        }
                )
                .post('/login',
                        [
                                ProfileValidator.M_isEmail('email'),
                                ProfileValidator.M_isCorrectPass('pass', 8),
                                LoginMiddleware,
                        ],
                        (req: Request, res: Response)=> {
                                const data = authController.login(req.body);
                                if(data) return res.status(202).json(data);

                                return res.status(501);
                        }
                );

        return authRouter;
}