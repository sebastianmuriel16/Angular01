import { Component, inject, DestroyRef } from '@angular/core';
import { HeroListComponent } from '../../components/hero-list/hero-list.component';
import { HeroService } from '../../services/hero.service';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { rxResource } from "@angular/core/rxjs-interop";


@Component({
  selector: 'app-home',
  imports: [HeroListComponent],
  template: `
  @if (heroes()) {
    <app-hero-list [heroes]="heroes()"></app-hero-list>
  }`,

})
export class HomeComponent {
  readonly #heroService = inject(HeroService);
  // readonly #destroyRef = inject(DestroyRef);
  heroes = this.#heroService.heroes;

  heroesResource = rxResource({
    loader: () => this.#heroService.loadHeroes()
  })


  // constructor() {
  //   this.#heroService
  //     .loadHeroes()
  //     .pipe(takeUntilDestroyed(this.#destroyRef))
  //     .subscribe();
  // }
}
