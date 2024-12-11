import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Intervention } from 'src/app/interfaces/intervention-interface';
import { InterventionService } from 'src/app/services/intervention.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  interventionData = new MatTableDataSource<Intervention>(); 
  data!: Intervention[];
  loading = true;
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
    private usersService: UsersService,
    private route: ActivatedRoute,
    private interventionService: InterventionService
  ) {}

  ngOnInit(): void {
    const idUser = Number(localStorage.getItem('idUser')); 
    console.log('id user table ' + idUser);
    if (!idUser) {
      console.error('idUser introuvable dans localStorage.');
      this.loading = false;
      return;
    }

    this.usersService.getCurrentInterventionByUser(idUser).subscribe({
      next: (data: Intervention[]) => {
        console.log('Données utilisateur récupérées :', data);
        this.data = data; 
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
        this.loading = false;
      },
    });
  }

  ngAfterViewInit(): void {
    this.interventionData.paginator = this.paginator;
  }

  toggleDescription(): void {
    this.showDescription = !this.showDescription;
    console.log('Description affichée:', this.showDescription);
  }
}
