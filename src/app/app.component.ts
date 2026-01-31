import { Component } from '@angular/core';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { LoaderComponent } from "./lib/loader-service/loader.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet, LoaderComponent],
  template: `
  <app-loader />
  <div class="flex flex-col min-h-screen w-full">
    <app-header />

    <main class="flex flex-col items-center w-full flex-grow px-4">
        <router-outlet />
    </main>

    <app-footer />
  </div>`
})
export class AppComponent {
  title = 'angular-renaissance-workshop';
}
