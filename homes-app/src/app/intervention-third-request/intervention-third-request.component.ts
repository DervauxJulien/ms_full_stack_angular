import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterventionService } from '../services/intervention.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-intervention-third-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intervention-third-request.component.html',
  styleUrls: ['./intervention-third-request.component.css']
})
export class InterventionThirdRequestComponent implements OnInit {

  interventionId!: string; 
  interventionData: any = null; 
  loading = true; 

  constructor(
    private interventionService: InterventionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.interventionId = this.route.snapshot.paramMap.get('id')!;

    if (this.interventionId) {
      this.interventionService.getInterventionById(this.interventionId).subscribe({
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
