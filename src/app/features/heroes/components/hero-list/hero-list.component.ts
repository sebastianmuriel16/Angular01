import { Component, input, inject, DestroyRef, signal, computed, ResourceStatus } from '@angular/core';
import { HeroItemComponent } from "../hero-item/hero-item.component";
import { Hero } from '../../interfaces/hero.interface';
import { HeroPowerstatsChange } from '../../interfaces/hero-powerstats-change';
import { HeroService } from '../../services/hero.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { rxResource } from '@angular/core/rxjs-interop';
import { NEVER } from 'rxjs';

@Component({
  selector: 'app-hero-list',
  imports: [HeroItemComponent],
  template: `
  <div class="grid gap-10 grid-cols-3 max-w-6xl mx-auto w-full">
    @for(hero of heroes(); track hero.id){
    <app-hero-item [hero]="hero" (powerStatsChange)="savePowerstats($event)" (removeHero)="removeHero($event)"/>
    }@empty {
    <h1>There are Heroes</h1>
    }
    </div>
`
})
export class HeroListComponent {

  heroes = input.required<Hero[]>();
  readonly #heroService = inject(HeroService);
  // readonly #destroyRef = inject(DestroyRef);

  #heroToRemoveSignal = signal<Hero>(this.#heroService.defaultHero);
  #heroToUpdateSignal = signal<HeroPowerstatsChange>({
    hero: this.#heroService.defaultHero,
    powerstats: 'intelligence',
    value: 0
  })

  #heroToRemoveResource = rxResource({
    request: () => this.#heroToRemoveSignal(),
    loader: ({ request: hero }) => this.#heroService.isDefaultHero(hero) ? NEVER : this.#heroService.remove(hero.id),
  })

  #heroToUpdateResource = rxResource({
    request: () => this.#heroToUpdateSignal(),
    loader: ({ request: { hero, powerstats, value } }) => this.#heroService.isDefaultHero(hero) ? NEVER : this.#heroService.updatePowerstat(hero, powerstats, value),
    equal: (hero1, hero2) => hero1.id === hero2.id
  })

  isHeroToRemoveResourceComplete = computed(() => !this.#heroService.isDefaultHero(this.#heroToRemoveSignal()) && this.#heroToRemoveResource.status() === ResourceStatus.Resolved)
  isHeroToUpdateResourceComplete = computed(() => this.#heroToUpdateSignal().value !== 0 && this.#heroToUpdateResource.status() === ResourceStatus.Resolved)

  savePowerstats({ hero, powerstats, value }: HeroPowerstatsChange) {
    this.#heroToUpdateSignal.set({ hero, powerstats, value });

    // this.#heroService.updatePowerstat(hero, powerstats, value)
    //   .pipe(takeUntilDestroyed(this.#destroyRef))
    //   .subscribe({
    //     next: () => console.log('Powerstats updated'),
    //     error: (error) => console.error('Error updating powerstats', error),
    //     complete: () => console.log('Powerstats update completed')
    //   });
  }

  removeHero(hero: Hero) {
    this.#heroToRemoveSignal.set(hero);
    // this.#heroService.remove(hero.id)
    //   .pipe(takeUntilDestroyed(this.#destroyRef))
    //   .subscribe({
    //     next: () => console.log('Hero removed'),
    //     error: (error) => console.error('Error removing hero', error),
    //     complete: () => console.log('Hero removal completed')
    //   });
  }

}
