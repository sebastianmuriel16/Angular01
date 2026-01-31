import { autoInjectable } from "tsyringe";
import { Router, Request, Response } from "express";
import { UserService } from "../services/user.service";

@autoInjectable()
export class UserController {
    public router = Router();

    constructor(private userService: UserService) {
        this.#setRoutes();
    }

    #setRoutes() {
        this.router.route('/login').post(this.#login);
        this.router.route('/register').post(this.#register);
    }

    #login = async (req: Request, res: Response) => {
        try {
            const response = await this.userService.login(req.body);
            res.send(response);
        }
        catch {
            return res.status(400).json({ message: "Error: username/password incorrect" });
        }
    }

    #register = async (req: Request, res: Response) => {
        try {
            await this.userService.register(req.body);
            return res.status(200).json({ message: "User registered successfully" });

        }
        catch (error) {
            return res.status(400).json({ message: "Error username already exists" });
        }
    }

}