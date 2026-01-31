import { Component, inject, computed, DestroyRef, input, numberAttribute, signal, effect, ResourceStatus, viewChild } from '@angular/core';
import { HeroFormComponent } from "../../components/hero-form/hero-form.component";
import { Hero } from '../../interfaces/hero.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { HeroItemNotFoundComponent } from '../../components/hero-item-not-found/hero-item-not-found.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { rxResource } from '@angular/core/rxjs-interop';
import { NEVER } from 'rxjs';
import { HEROES_PAGES } from '../../heroes.routes';



@Component({
  selector: 'app-hero-update',
  imports: [HeroFormComponent, HeroItemNotFoundComponent],
  template: `
  @if(this.isValidHero()){
      <div class="flex flex-col items-center bg-[rgb(94,104,255)]">
    <h3 class="text-2xl font-bold text-white">Update an Hero!</h3>
  <app-hero-form #heroForm [hero]="hero()" (sendHero)="updateHero($event)"/>
  </div>
  }
  @else {
    <app-hero-item-not-found/>
  }

`
})
export class HeroUpdateComponent {
  readonly #heroService = inject(HeroService)
  readonly #router = inject(Router)
  readonly heroFormComponent = viewChild.required<HeroFormComponent>('heroForm');
  // readonly #activatedRoute = inject(ActivatedRoute)
  // readonly #destroyRef = inject(DestroyRef)
  // hero: Hero = this.#activatedRoute.snapshot.data['hero']
  // isValidHero = computed(() => !this.#heroService.isNullHero(this.hero))

  readonly id = input(0, { transform: numberAttribute })
  readonly #heroResource = rxResource({
    request: () => this.id(),
    loader: () => this.#heroService.findOne(this.id()),
  })

  readonly hero = computed(() => this.#heroResource.value() ?? this.#heroService.NullHero)
  readonly isValidHero = computed(() => !this.#heroService.isNullHero(this.hero()))

  readonly heroSignal = signal<Hero>(this.#heroService.defaultHero)

  readonly #heroToUpdateResource = rxResource({
    request: () => this.heroSignal(),
    loader: ({ request: hero }) => this.#heroService.isDefaultHero(hero) ? NEVER : this.#heroService.update(hero),
    equal: (hero1, hero2) => hero1.id === hero2.id,
  })

  isLoading = this.#heroToUpdateResource.isLoading
  error = this.#heroToUpdateResource.error
  isHeroToUpdateResourceComplete = computed(() => this.#heroToUpdateResource.status() === ResourceStatus.Resolved)

  navigateEffect = effect(() => {
    if (!this.#heroService.isDefaultHero(this.heroSignal()) && this.isHeroToUpdateResourceComplete()) {
      this.#router.navigate([HEROES_PAGES.HERO, HEROES_PAGES.HOME]);
    }
  })

  errorEffect = effect(() => {
    if (this.error()) {
      console.error('Error updating hero', this.error());
    }
  })

  updateHero(hero: any) {
    this.heroSignal.set(hero);

    // this.#heroService.update(hero)
    //   .pipe(takeUntilDestroyed(this.#destroyRef))
    //   .subscribe({
    //     next: (hero) => console.log('Hero updated', hero),
    //     error: (error) => console.error('Error updating hero', error),
    //     complete: () => console.log('Hero update completed')
    //   });
    // this.#router.navigate(['/home'])
  }

  canDeactivate() {
    const component = this.heroFormComponent();
    if (component.isPendingSave()) {
      const value = confirm('You have unsaved changes. Do you really want to leave?');
      return value;
    }
    return true;
  }

}
