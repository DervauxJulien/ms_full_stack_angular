import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InterventionService } from 'src/app/services/intervention.service';
import { Intervention } from 'src/app/interfaces/intervention-interface';

@Component({
  selector: 'app-validate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent {

  userId!: number; 
  idIntervention!: number;

  constructor(
    private InterventionService: InterventionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id')!);

    this.idIntervention = Number(localStorage.getItem('idIntervention'));
    
    if (this.userId) {
      this.InterventionService.getInterventionById(this.idIntervention).subscribe({
        next: (data) => {

          // this.loading = false;


          console.log(`ici la response details`, data);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des données:', error);
          // this.loading = false;
        },
      });
    } else {
      console.error('Aucun ID fourni pour récupérer les données.');
      // this.loading = false;
    }
  }

}

