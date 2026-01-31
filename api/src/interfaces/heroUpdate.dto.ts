import { Hero, PowerStats, alignments } from "./hero.interface";

export class HeroUpdateDTO {

    #id: number;
    #name: string;
    #image: string;
    #alignment: alignments;
    #powerstats: PowerStats;


    fromJSON(hero: any) {
        this.#id = hero?.id;
        this.#name = hero?.name;
        this.#alignment = hero?.alignment;
        this.#image = hero?.image;
        this.#powerstats = hero?.powerstats;
        return this;
    }
    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            image: this.#image,
            alignment: this.#alignment,
            powerstats: this.#powerstats,
        }
    }
}


