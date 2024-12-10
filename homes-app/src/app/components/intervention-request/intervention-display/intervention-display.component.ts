import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatButtonModule } from '@angular/material/button';
import { InterventionService } from '../../../services/intervention.service';
import { ActivatedRoute, Data, RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Intervention } from '../../../interfaces/intervention-interface';

@Component({
  selector: 'app-intervention-display',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    CdkTableModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
  ],
  templateUrl: './intervention-display.component.html',
  styleUrls: ['./intervention-display.component.css'],
})
export class InterventionDisplayComponent implements AfterViewInit {
  interventionId!: number;
  loading = true;
  interventionData: MatTableDataSource<any> = new MatTableDataSource<any>();
  data!: Intervention[];
  allIntervention: Intervention[] = [];
  showDescription: boolean = false;
  displayedColumns: string[] = [
    'SHOWDETAILS',
    'ID_INTERVENTION',
    'DESCRIPTION',
    'COLLABORATOR',
    'CREATION_DATE',
    'PRIORITY',
    'STATUS',
    'TREATMENT'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  UsersService: any;

  constructor(
    private InterventionService: InterventionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.interventionId = Number(this.route.snapshot.paramMap.get('id')!);
    console.log(this.interventionId);

    if (this.interventionId) {
      this.InterventionService.getInterventionById(this.interventionId).subscribe({
        next: (data) => {
          this.data = [data];
          this.loading = false;
          console.log(`ici la response details`, data);
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

  toggleDescription(): void {
    this.showDescription = !this.showDescription;
    console.log(this.showDescription);
  }
}
