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

  interventionId!: number; 
  interventionData!: Intervention; 
  loading = true; 

  constructor(
    private InterventionService: InterventionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.interventionId = Number(this.route.snapshot.paramMap.get('id')!);
    console.log(this.interventionId);

    if (this.interventionId) {
      this.InterventionService.getInterventionById(this.interventionId).subscribe({
        next: (data) => {
          this.interventionData = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des données:', error);
          this.loading = false;
        },
      });
    } else {
      console.error('Aucun ID fourni pour récupérer les données.');
      this.loading = false;
    }
  }

}

