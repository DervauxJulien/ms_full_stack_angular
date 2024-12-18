import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-root',
  template: `
  <main class="">
    <section>
    <router-outlet>
    </router-outlet>
    </section>
  </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [RouterModule,
    
  ],
})
export class AppComponent {
  title = 'homes';
}
