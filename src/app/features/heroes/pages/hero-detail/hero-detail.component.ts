import { Component, input, numberAttribute, inject, computed, OnChanges, signal, effect, DestroyRef } from '@angular/core';
import { HeroItemComponent } from "../../components/hero-item/hero-item.component";
import { HeroService } from "../../services/hero.service";
import { Hero } from "../../interfaces/hero.interface";
import { HeroItemNotFoundComponent } from "../../components/hero-item-not-found/hero-item-not-found.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { rxResource } from "@angular/core/rxjs-interop";

// import { Observable, of } from "rxjs";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  imports: [HeroItemComponent, HeroItemNotFoundComponent],
  template: `
  @if(hero()) {
    <app-hero-item [hero]="hero()"/>
  }
  @else {
    <app-hero-item-not-found />
  }
  `
})
export class HeroDetailComponent {
  id = input(0, { transform: numberAttribute })
  readonly #heroService = inject(HeroService)
  // hero$: Observable<Hero> = of();
  // hero = signal<Hero>(this.#heroService.NullHero)
  // hero = computed<Hero>(() => this.#heroService.findOne(this.id()))
  // isValidHero = computed(() => !this.#heroService.isNullHero(this.hero()))
  readonly #heroResource = rxResource({
    request: () => this.id(),
    loader: () => this.#heroService.findOne(this.id())
  })
  hero = computed(() => this.#heroResource.value() ?? this.#heroService.NullHero)

  // constructor(private destroyRef: DestroyRef) {
  //   effect(() => {
  //     this.#heroService
  //       .findOne(this.id())
  //       .pipe(takeUntilDestroyed(destroyRef))
  //       .subscribe(_hero => this.hero.set(_hero));
  //   })
  // }

  // ngOnChanges(): void {
  //   this.hero = this.#heroService.findOne(this.id())
  // }

}
