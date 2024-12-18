import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Intervention } from 'src/app/interfaces/intervention-interface';
import { InterventionService } from 'src/app/services/intervention.service';
import { ModalComponent } from '../../utils/modal/modal.component';
import { PriorityComponent } from '../../utils/priority/priority.component';
import { $ } from 'protractor';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterModule,
    ModalComponent,
    PriorityComponent
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})


export class TableComponent implements OnInit, AfterViewInit {
  interventionData = new MatTableDataSource<Intervention>(); 
  data!: Intervention[];
  loading = true;
  showDescription = false;
  idIntervention! : number
  colorPriority! : string
  selectedTemperature: string = '';
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

  length!:number;
  pageSize = 10;
  pageIndex = 0;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private interventionService: InterventionService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    const idUser = Number(localStorage.getItem('idUser')); 
    console.log('id user table ' + idUser);

    if (!idUser) {
      console.error('idUser introuvable dans localStorage.');
      this.loading = false;
      return;
    }
    this.usersService.getCurrentInterventionByUser(idUser).subscribe({
      next: (response: [Intervention[], number ]) => { 
        console.log('Réponse de l\'API :', response);
        
        
        this.data = response[0];
        console.log('Tableau d\'interventions extrait :', this.data);
  
        const startIndex = this.pageSize*this.pageIndex;
        this.interventionData.data = this.data.slice(startIndex, startIndex + this.pageSize);
        this.loading = false;
        this.length = response[0].length;
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

  setIdIntervention(data : any){
    this.idIntervention = data
    localStorage.setItem('idIntervention' , data)
    console.log('table ' + this.idIntervention);
  }

  setColorPriority(data : string){
    this.colorPriority = data
  }

  // Gérer le changement de page
  onPageChanged(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log('Page changée:', this.pageIndex, 'Taille de page:', this.pageSize);
    this.loadData();
  }

  // Méthode pour charger les données selon la pagination
  loadData(): void {
    const startIndex = this.pageSize*this.pageIndex;
    this.interventionData.data = this.data.slice(startIndex, startIndex + this.pageSize);
    this.length = this.data.length;
  }

}
