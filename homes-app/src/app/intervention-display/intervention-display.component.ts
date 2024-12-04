import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';  // Déjà importé
import { MatTableModule, MatTableDataSource } from '@angular/material/table';  // Nécessaire pour mat-table
import { CdkTableModule } from '@angular/cdk/table';  // Nécessaire pour CdkColumnDef
import { MatButtonModule } from '@angular/material/button';  // Pour les boutons
import { InterventionService } from '../services/intervention.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-intervention-display',
  standalone: true,
  imports: [CommonModule, MatTableModule, CdkTableModule, MatButtonModule, RouterModule, MatPaginatorModule],
  templateUrl: './intervention-display.component.html',
  styleUrls: ['./intervention-display.component.css'],
})
export class InterventionDisplayComponent implements AfterViewInit {
  interventionId!: string;
  loading = true;
  interventionData: MatTableDataSource<any> = new MatTableDataSource<any>(); 
  displayedColumns: string[] = [
    'TEST', 
    'ID_INTERVENTION', 
    'DESCRIPTION', 
    'CREATION_DATE', 
    'STATUS'
  ];
  expandedElement: any | null;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private interventionService: InterventionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.interventionId = this.route.snapshot.paramMap.get('id')!;

    if (this.interventionId) {
      this.interventionService.getInterventionById(this.interventionId).subscribe({
        next: (data) => {
          this.interventionData.data = [data];  // Mise à jour correcte des données
          this.loading = false;
          console.log(this.interventionData);
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

  ngAfterViewInit() {
    this.interventionData.paginator = this.paginator; 
  }

  toggleDescription(element: any): void {
    this.expandedElement = this.expandedElement === element ? null : element;
    console.log(this.expandedElement);
  }
}
