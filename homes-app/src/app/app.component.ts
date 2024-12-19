import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./components/utils/header/header.component";


@Component({
  standalone: true,
  selector: 'app-root',
  template: `
  <main class="">
  <app-header></app-header>
    <section>
    <router-outlet>
    </router-outlet>
    </section>
  </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, HeaderComponent],
})
export class AppComponent {
  title = 'homes';
}
