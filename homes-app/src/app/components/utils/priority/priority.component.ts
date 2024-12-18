import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterventionService } from 'src/app/services/intervention.service';
import { Intervention } from 'src/app/interfaces/intervention-interface';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-priority',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class PriorityComponent {
  @Input() element: any;

  constructor(
    private interventionService: InterventionService,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) { }


  selectedTemperature: string = '';
  loading = true;
  data!: Intervention[];


  ngOnInit(): void {
    this.selectedTemperature = this.element.priority;
    const idUser = Number(localStorage.getItem('idUser'));
    console.log('id user table ' + idUser);
    if (!idUser) {
      console.error('idUser introuvable dans localStorage.');
      this.loading = false;
      return;
    }
    // console.log('ici la props : ' + this.element.priority);
  }

  selectTemperature(value: string): void {
    this.selectedTemperature = value;
    let getIdIntervention = localStorage.getItem('idIntervention')
    let forUpdateIntervention = {
      "idIntervention": Number(getIdIntervention),
      "priority": this.selectedTemperature
      
    }
    this.interventionService.updatePriority(forUpdateIntervention).subscribe({
      next: (response) => {
        console.log("ici la response priority" + response);
      }
    })
    localStorage.setItem('priority', value);
    // console.log('ici la props : ' + this.element.priority);
  }
}
