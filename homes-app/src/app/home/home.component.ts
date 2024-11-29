import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <form action="">
        <input type="text" name="" id="" placeholder="Filter by city" #filter>
      </form>
    </section>
    <section class="results">
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(){}
}
