import { autoInjectable } from "tsyringe";
import { Router, Request, Response } from "express";
import { HeroService } from "../services/hero.service";
import { HeroDTO } from "../interfaces/hero.dto";
import { HeroUpdateDTO } from "../interfaces/heroUpdate.dto";


@autoInjectable()
export class HeroController {
    public router = Router();

    constructor(private heroService: HeroService) {
        this.#setRoutes();
    }

    #setRoutes() {
        this.router.route('/').get(this.#findAll);
        this.router.route('/').post(this.#add);
        this.router.route('/:id').get(this.#findOne);
        this.router.route('/:id').put(this.#update);
        this.router.route('/:id').patch(this.#update);
        this.router.route('/:id').delete(this.#delete);
    }

    #findAll = async (req: Request, res: Response) => {
        try {
            const pages = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const heroes = await this.heroService.findAll(pages, limit);
            res.status(200).json(heroes);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to fetch heroes" });
        }
    }

    #findOne = async (req: Request, res: Response) => {
        const idParam = req.params.id;
        const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");
        const hero = await this.heroService.findOne(id);
        res.status(200).json(hero);
    }

    #add = async (req: Request, res: Response) => {
        const hero = new HeroDTO().fromJSON(req.body).toJSON();
        const addHeroResult = await this.heroService.add(hero);
        res.status(200).json(addHeroResult);
    }

    #delete = async (req: Request, res: Response) => {

        try {
            const idParam = req.params.id;
            const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");
            const deleteHeroResult = await this.heroService.delete(id);
            res.status(200).json(deleteHeroResult);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to delete hero" });
        }
    }

    #update = async (req: Request, res: Response) => {
        const hero = new HeroUpdateDTO().fromJSON(req.body).toJSON();
        const idParam = req.params.id;
        const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");

        try {
            const updateHeroResult = await this.heroService.update(id, hero);
            res.status(200).json(updateHeroResult);
        }
        catch (error) {
            res.status(404).json({ error: "Hero not found" });
        }

    }


}