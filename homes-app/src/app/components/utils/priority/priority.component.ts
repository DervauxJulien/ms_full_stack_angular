import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-priority',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class PriorityComponent {
  selectedTemperature: string = '';

  ngOnInit(): void {
    const savedTemperature = localStorage.getItem('priority');
    if (savedTemperature) {
      this.selectedTemperature = savedTemperature;
    }
  }

  selectTemperature(value: string): void {
    this.selectedTemperature = value;
    localStorage.setItem('priority', value); 
    console.log('priority :', value);
  }

}
