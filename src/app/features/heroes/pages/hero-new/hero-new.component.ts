import { Component, inject, DestroyRef, signal, ResourceStatus, computed, effect } from '@angular/core';
import { HeroFormComponent } from '../../components/hero-form/hero-form.component';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NEVER } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { HEROES_PAGES } from '../../heroes.routes';

@Component({
  selector: 'app-hero-new',
  imports: [HeroFormComponent],
  template: ` 
  <div class="flex flex-col items-center bg-[cadetblue]">
    <h3 class="text-2xl font-bold text-white">Create a New Hero</h3>
  <app-hero-form (sendHero)="addHero($event)"/>
  </div>`
})
export class HeroNewComponent {
  readonly #heroService = inject(HeroService);
  readonly #router = inject(Router);
  // readonly #destroyRef = inject(DestroyRef);

  heroSignal = signal<Hero>(this.#heroService.defaultHero)
  readonly #heroResource = rxResource({
    request: () => this.heroSignal(),
    loader: ({ request: hero }) => this.#heroService.isDefaultHero(hero) ? NEVER : this.#heroService.add(hero),
    equal: (hero1, hero2) => hero1.id === hero2.id
  })

  isLoading = this.#heroResource.isLoading;
  error = this.#heroResource.error;
  isHeroResourceComplete = computed(() => this.#heroResource.status() === ResourceStatus.Resolved);

  errorEffect = effect(() => {
    if (this.error()) {
      console.error('Error creating hero', this.error());
    }
  })

  navigateEffect = effect(() => {
    if (!this.#heroService.isDefaultHero(this.heroSignal()) && this.isHeroResourceComplete()) {
      this.#router.navigate([HEROES_PAGES.HERO, HEROES_PAGES.HOME]);
    }
  })


  addHero(_hero: Hero) {
    const hero: Hero = {
      ..._hero,
      id: Math.floor(Math.random() * 10000) + 1,
    }

    this.heroSignal.set(hero);

    // this.#heroService.add(hero)
    //   .pipe(takeUntilDestroyed(this.#destroyRef))
    //   .subscribe({
    //     next: (hero) => console.log('Hero created', hero),
    //     error: (error) => console.error('Error creating hero', error),
    //     complete: () => console.log('Hero creation completed')
    //   })
    // this.#router.navigate(['/home']);

  }
}
