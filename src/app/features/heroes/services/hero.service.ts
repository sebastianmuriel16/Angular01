import { Injectable, computed, inject, signal } from '@angular/core';
import { Hero, PowerStat } from '../interfaces/hero.interface';
import { HeroServiceAbstract } from './hero.service.abstract';
import { BehaviorSubject, Observable, catchError, throwError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService extends HeroServiceAbstract {

  // readonly #heroesSubject = new BehaviorSubject<Hero[]>([]);
  // readonly heroes$ = this.#heroesSubject.asObservable();

  readonly #heroesSignal = signal<Hero[]>([]);
  readonly heroes = computed(() => this.#heroesSignal());


  readonly #httpClient = inject(HttpClient)

  loadHeroes(): Observable<{ heroes: Hero[]; total: number; }> {
    return this.#httpClient.get<{ heroes: Hero[]; total: number; }>(
      this.API_ENDPOINT
    ).pipe(
      tap(result => this.#heroesSignal.set(result.heroes)),
      catchError((error) => {
        console.error(error);
        return throwError(() => error);
      }
      )
    )
  }


  add(hero: Hero) {
    return this.#httpClient.post<Hero>(this.API_ENDPOINT, hero)
      .pipe(
        tap(newHero =>
          // const currentHeroes = this.#heroesSubject.getValue();
          // this.#heroesSubject.next([...currentHeroes, newHero]);
          this.#heroesSignal.update((currentHeroes) => [...currentHeroes, newHero])
        ),
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }
        )
      )

  }

  updatePowerstat(hero: Hero, powerstat: PowerStat, value: number): Observable<Hero> {
    const updatedHero = {
      ...hero,
      powerstats: {
        ...hero.powerstats,
        [powerstat]: hero.powerstats[powerstat] + value
      }
    }
    return this.update(updatedHero)
  }

  update(heroToUpdate: Hero): Observable<Hero> {
    return this.#httpClient.put<Hero>(`${this.API_ENDPOINT}/${heroToUpdate.id}`, heroToUpdate)
      .pipe(
        tap((updateHero) =>
          // const currentHeroes = this.#heroesSubject.getValue();
          // const updatedHeroes = currentHeroes.map((hero) =>
          //   hero.id === updateHero.id ? updateHero : hero
          // );
          // this.#heroesSubject.next(updatedHeroes);

          this.#heroesSignal.update((currentHeroes) => currentHeroes.map((hero) =>
            hero.id === updateHero.id ? updateHero : hero))

        ),
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        })
      )
  }

  remove(id: number): Observable<void> {
    return this.#httpClient.delete<void>(`${this.API_ENDPOINT}/${id}`)
      .pipe(
        tap(() => {
          // const updatedHeroes = this.#heroesSubject.getValue()
          //   .filter((hero) => hero.id !== id);
          // this.#heroesSubject.next(updatedHeroes);
          this.#heroesSignal.update((currentHeroes) => currentHeroes.filter((hero) => hero.id !== id))

        }),
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        })
      )
  }

  findAll(): Observable<{ heroes: Hero[]; total: number }> {

    return this.#httpClient.get<{ heroes: Hero[]; total: number }>(this.API_ENDPOINT)
      .pipe(
        tap(result =>
          // this.#heroesSubject.next(result.heroes)
          this.#heroesSignal.set(result.heroes)
        ),
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        })
      )

  }

  findOne(id: number): Observable<Hero> {
    return this.#httpClient.get<Hero>(`${this.API_ENDPOINT}/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => error);
      })
    )
  }





}
