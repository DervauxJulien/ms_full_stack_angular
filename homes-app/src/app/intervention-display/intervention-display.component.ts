import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterventionService } from '../services/intervention.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-intervention-display',
  standalone: true,
  imports: [CommonModule, MatTableModule, CdkTableModule, MatButtonModule],
  templateUrl: './intervention-display.component.html',
  styleUrls: ['./intervention-display.component.css'],
})
export class InterventionDisplayComponent {
  interventionId!: string;
  loading = true;
  interventionData: any[] = [];
  displayedColumns: string[] = ['test', 'ID_INTERVENTION', 'DESCRIPTION', 'CREATION_DATE', 'STATUS'];
  expandedElement: any | null = null;

  constructor(
    private interventionService: InterventionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.interventionId = this.route.snapshot.paramMap.get('id')!;

    if (this.interventionId) {
      this.interventionService.getInterventionById(this.interventionId).subscribe({
        next: (data) => {
          this.interventionData = [data]; 
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

  toggleDescription(element: any): void {
    this.expandedElement = this.expandedElement === element ? null : element;
    console.log(this.expandedElement);
  }
  
}
