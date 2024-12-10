import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UsersService } from 'src/app/services/users.service';
import { Intervention } from 'src/app/interfaces/intervention-interface';
import { InterventionService } from 'src/app/services/intervention.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    CdkTableModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  interventionData: MatTableDataSource<any> = new MatTableDataSource<any>();
  data!: Intervention[]; 
  loading = false;
  showDescription = false;

  displayedColumns: string[] = [
    'SHOWDETAILS',
    'ID_INTERVENTION',
    'DESCRIPTION',
    'COLLABORATOR',
    'CREATION_DATE',
    'PRIORITY',
    'STATUS',
    'TREATMENT',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private InterventionService: InterventionService,
    private usersService: UsersService, 
    private route: ActivatedRoute,
    
  ) {}

  ngOnInit(): void {
    
    const userData = this.usersService.getData('currentUserData'); 
    if (userData) {
      console.log('Données récupérées avec succès:', userData);
      this.data = userData; 
      this.loading = false;
    } else {
      console.error('Aucune donnée trouvée pour "currentUserData".');
      this.loading = false;
    }
  }

  ngAfterViewInit() {
    this.interventionData.paginator = this.paginator; 
  }

  toggleDescription(): void {
    this.showDescription = !this.showDescription; 
    console.log('Description affichée:', this.showDescription);
  }
}
