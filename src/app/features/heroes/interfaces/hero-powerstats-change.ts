import { Hero, PowerStat } from "./hero.interface";

export interface HeroPowerstatsChange {
    hero: Hero;
    powerstats: PowerStat;
    value: number;
}