import { Component, inject, output, input, Signal, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { heroNameValidator } from '../../validators/hero-name-validator';
import { CommonModule } from '@angular/common';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent {
  readonly #heroService = inject(HeroService)
  hero = input<Hero>(this.#heroService.defaultHero);
  add = output<Hero>({ alias: 'sendHero' });
  readonly #formBuilder = inject(FormBuilder)
  message = ""
  textButton = computed(() => this.#heroService.isDefaultHero(this.hero()) ? "Create Hero" : "Update Hero")

  heroForm: Signal<FormGroup> = computed(() => this.#formBuilder.group({
    name: [this.hero().name, Validators.required, heroNameValidator],
    image: [this.hero().image, Validators.required],
    alignment: [this.hero().alignment],
    powerstats: this.#formBuilder.group({
      intelligence: [this.hero().powerstats.intelligence, [Validators.required, Validators.min(0), Validators.max(100)]],
      strength: [this.hero().powerstats.strength, [Validators.required, Validators.min(0), Validators.max(100)]],
      speed: [this.hero().powerstats.speed, [Validators.required, Validators.min(0), Validators.max(100)]],
      durability: [this.hero().powerstats.durability, [Validators.required, Validators.min(0), Validators.max(100)]],
      power: [this.hero().powerstats.power, [Validators.required, Validators.min(0), Validators.max(100)]],
      combat: [this.hero().powerstats.combat, [Validators.required, Validators.min(0), Validators.max(100)]],
    })
  }))

  powerstats = ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat'];

  isSubmited = signal(false);
  isPendingSave = computed(() => !this.isSubmited() && this.heroForm().dirty);


  addHero() {
    if (this.heroForm().invalid) {
      this.message = "Please correct the errors in the form."
    }
    else {
      const hero: Hero = {
        id: this.hero().id,
        ...this.heroForm().value,
        powerstats: { ...this.heroForm().value.powerstats }
      }
      this.isSubmited.set(true);
      this.add.emit(hero);
    }
  }

}
