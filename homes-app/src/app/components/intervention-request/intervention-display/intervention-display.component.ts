import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { MatTableModule, MatTableDataSource } from '@angular/material/table';  
import { CdkTableModule } from '@angular/cdk/table';  
import { MatButtonModule } from '@angular/material/button';  
import { InterventionService } from '../../../services/intervention.service';
import { ActivatedRoute, Data, RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HeaderComponent } from '../../header/header.component';
import { Intervention } from './intervention-interface';
import { UsersService } from '../../../services/users.service';

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
    HeaderComponent,
  ],
  templateUrl: './intervention-display.component.html',
  styleUrls: ['./intervention-display.component.css'],
})
export class InterventionDisplayComponent implements AfterViewInit {
  interventionId!: string;
  loading = true;
  interventionData: MatTableDataSource<any> = new MatTableDataSource<any>();
  dataIntervention: Intervention[] = [];
  users: any[]=[];
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
    private route: ActivatedRoute,
    private interventionService: InterventionService,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.interventionId = this.route.snapshot.paramMap.get('id')!;

    if (this.interventionId) {
      this.interventionService.getInterventionById(this.interventionId).subscribe
      ({
        next: (data) => {
          this.interventionData.data = [data];
          this.dataIntervention = [data];
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

    this.interventionService.getAllInterventions().subscribe({
      next: (data) => {
        this.allIntervention = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de toutes les données:', error);
        this.loading = false;
      },
    })

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = [data]
        console.log(this.users);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données:', error);
        this.loading = false;
      },
    })
  }

  ngAfterViewInit() {
    this.interventionData.paginator = this.paginator;
  }



  toggleDescription(): void {
    this.showDescription = !this.showDescription;
    console.log(this.showDescription);
  }
}
