import { autoInjectable } from "tsyringe";
import { heroes } from "../heroes-db-lite";
import { Hero } from "../interfaces/hero.interface";

@autoInjectable()
export class HeroService {
    #fakeID = 10000;
    #heroes: Hero[] = heroes;

    findAll(page: number, limit: number): { heroes: Hero[], total: number } {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedHeroes = this.#heroes.slice(startIndex, endIndex);
        const total = this.#heroes.length;
        return { heroes: paginatedHeroes, total };
    }

    findOne(id: number): Hero {
        return this.#heroes.find(hero => hero.id === id) || {} as Hero;
    }

    add(hero: Hero): Hero {
        this.#fakeID++;
        const newHero: Hero = { ...hero, id: this.#fakeID };
        this.#heroes = [newHero, ...this.#heroes];
        return newHero;
    }

    delete(id: number): void {
        const hero = this.#find(id);

        if (this.#isNull(hero)) {
            throw new Error('Hero not found');
        }
        this.#heroes = this.#heroes.filter(hero => hero.id !== id);
    }

    update(id: number, updatedHero: Partial<Hero>): Hero | undefined {
        const hero = this.#find(id);

        if (this.#isNull(hero)) {
            throw new Error('Hero not found');
        }

        let updateHeroResult: Hero | undefined;

        this.#heroes = this.#heroes.map(hero => {
            if (hero.id === id) {
                updateHeroResult = {
                    id: hero.id,
                    name: updatedHero.name ?? hero.name,
                    image: updatedHero.image ?? hero.image,
                    alignment: updatedHero.alignment ?? hero.alignment,
                    powerstats: {
                        intelligence: updatedHero.powerstats?.intelligence ?? hero.powerstats.intelligence,
                        strength: updatedHero.powerstats?.strength ?? hero.powerstats.strength,
                        speed: updatedHero.powerstats?.speed ?? hero.powerstats.speed,
                        durability: updatedHero.powerstats?.durability ?? hero.powerstats.durability,
                        power: updatedHero.powerstats?.power ?? hero.powerstats.power,
                        combat: updatedHero.powerstats?.combat ?? hero.powerstats.combat,
                    }
                };
                return updateHeroResult
            }
            else {
                return hero
            }

        }
        )
        return updateHeroResult

    }



    #find(id: number): Hero {
        return this.#heroes.find(hero => hero.id === id) || {} as Hero;
    }

    #isNull(hero: Hero): boolean {
        return Object.keys(hero).length === 0;
    }



}