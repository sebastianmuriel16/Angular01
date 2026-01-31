import { Component, computed, input, output } from '@angular/core';
import { Hero, PowerStat } from '../../interfaces/hero.interface';
import { HeroPowerstatsChange } from '../../interfaces/hero-powerstats-change';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { HEROES_PAGES } from '../../heroes.routes';

@Component({
  selector: 'app-hero-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-item.component.html',
  styleUrl: './hero-item.component.scss'
})
export class HeroItemComponent {
  hero = input.required<Hero>();
  powerStatsChange = output<HeroPowerstatsChange>();
  removeHero = output<Hero>();

  isHeroOrVillain = computed(() => this.hero().alignment === 'bad');

  navigation = computed(() => ({
    update: [HEROES_PAGES.HERO, HEROES_PAGES.UPDATE, this.hero().id],
    details: [HEROES_PAGES.HERO, HEROES_PAGES.DETAILS, this.hero().id],
    back: [HEROES_PAGES.HERO]
  }));

  decrementPowerStat(powerStat: PowerStat): void {
    this.powerStatsChange.emit({
      hero: this.hero(),
      powerstats: powerStat,
      value: -1
    });
  }

  incrementPowerStat(powerStat: PowerStat): void {
    this.powerStatsChange.emit({
      hero: this.hero(),
      powerstats: powerStat,
      value: 1
    })
  }
  remove(hero: Hero) {
    this.removeHero.emit(hero);
  }
}
