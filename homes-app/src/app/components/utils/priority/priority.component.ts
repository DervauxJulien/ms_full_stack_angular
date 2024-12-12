import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterventionService } from 'src/app/services/intervention.service';

@Component({
  selector: 'app-priority',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class PriorityComponent {

 constructor(
  private interventionService: InterventionService
 ){} 
 
 
 selectedTemperature: string = '';



  ngOnInit(): void {
    // const savedTemperature = localStorage.getItem('priority');
    // if (savedTemperature) {
    //   this.selectedTemperature = savedTemperature;
    // }
  }

  selectTemperature(value: string): void {
  this.selectedTemperature = value;
   let getIdIntervention = localStorage.getItem('idIntervention')
   let forUpdateIntervention = {
      "idIntervention" : Number(getIdIntervention),
      "priority" : this.selectedTemperature
    }

    this.interventionService.updatePriority(forUpdateIntervention).subscribe({
      next:(response)=>{
        console.log("ici la response priority" + response);
      }
    })
    localStorage.setItem('priority', value); 
    console.log('priority :', value);
  }



}
