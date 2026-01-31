import { Observable } from 'rxjs';
import { Hero, PowerStat } from '../interfaces/hero.interface';

export abstract class HeroServiceAbstract {
    protected readonly API_ENDPOINT = 'http://localhost:9000/heroes';


    readonly NullHero: Hero = {
        id: Math.floor(Math.random() * 1000) + 10000,
        name: 'Not found',
        image: 'https://images.squarespace-cdn.com/content/v1/58c35f74d1758e424ee76710/1534368411595-MLHA8R1D0HGIBJRGZ9CJ/e54d4dd803c0cc0888acbc6ce2d02bbd.jpg?format=1000w',
        powerstats: {
            intelligence: 0,
            strength: 0,
            speed: 0,
            durability: 0,
            power: 0,
            combat: 0
        },
        alignment: 'bad'
    }

    readonly defaultHero: Hero = {
        id: Math.floor(Math.random() * 1000) + 10000,
        name: 'joker',
        image: 'https://images.squarespace-cdn.com/content/v1/58c35f74d1758e424ee76710/1534368411595-MLHA8R1D0HGIBJRGZ9CJ/e54d4dd803c0cc0888acbc6ce2d02bbd.jpg?format=1000w',
        powerstats: {
            intelligence: 44,
            strength: 54,
            speed: 45,
            durability: 43,
            power: 55,
            combat: 36
        },
        alignment: 'bad'
    }

    isDefaultHero(hero: Hero): boolean {
        return hero.id === this.defaultHero.id
    }

    isNullHero(hero: Hero): boolean {
        return hero.id === this.NullHero.id
    }

    abstract loadHeroes(): Observable<{ heroes: Hero[]; total: number }>;
    abstract add(hero: Hero): Observable<Hero>;
    abstract update(heroToUpdate: Hero): Observable<Hero>;
    abstract remove(id: number): Observable<void>;
    abstract findOne(id: number): Observable<Hero>;
    abstract updatePowerstat(
        hero: Hero,
        powerstat: PowerStat,
        value: number
    ): Observable<Hero>;
    abstract findAll(params?: { page: number, limit: number }): Observable<{ heroes: Hero[]; total: number }>

}