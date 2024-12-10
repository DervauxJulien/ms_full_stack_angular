// import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// import { CommonModule } from '@angular/common';  
// import { MatTableModule, MatTableDataSource } from '@angular/material/table';  
// import { CdkTableModule } from '@angular/cdk/table';  
// import { MatButtonModule } from '@angular/material/button';  
// import { InterventionService } from '../../../services/intervention.service';
// import { ActivatedRoute, Data, RouterModule } from '@angular/router';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { UsersService } from '../../../services/users.service';
// import { Intervention } from '../../../interfaces/intervention-interface';
// import { User } from 'src/app/interfaces/user-interface';
// import { forkJoin } from 'rxjs';

// @Component({
//   selector: 'app-table',
//   standalone: true,
//   imports: [CommonModule,
//     MatTableModule,
//     CdkTableModule, 
//     MatButtonModule, 
//     RouterModule, 
//     MatPaginatorModule, 
//   ],
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.css']
// })
// export class TableComponent {
//   userId!: number;
//   loading = true;
//   interventionData: MatTableDataSource<any> = new MatTableDataSource<any>();
//   dataIntervention: any[] = [];
//   users!: User;
//   allIntervention: Intervention[] = [];
//   showDescription: boolean = false;
//   displayedColumns: string[] = [
//     'SHOWDETAILS',
//     'ID_INTERVENTION',
//     'DESCRIPTION',
//     'COLLABORATOR',
//     'CREATION_DATE',
//     'PRIORITY',
//     'STATUS',
//     'TREATMENT'
//   ];

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   UsersService: any;

//   constructor(
//     private route: ActivatedRoute,
//     private interventionService: InterventionService,
//     private userService: UsersService
//   ) { }

//   ngOnInit() {
//     this.userId = Number(this.route.snapshot.paramMap.get('id')!);
//     if (this.userId) {
//       this.fetchUserAndInterventions(this.userId);
//     } else {
//       console.error('Aucun ID utilisateur fourni.');
//       this.loading = false;
//     }
//   }
  
//   fetchUserAndInterventions(userId: number) {
//     forkJoin({
//       // user: this.userService.getUserById(userId),
//       interventions: this.interventionService.getAllInterventions(),
//     }).subscribe({
//       next: ({ user, interventions }) => {
//         this.users = user;
//         this.allIntervention = interventions.filter(intervention => intervention.idUser === userId);
  
//         this.interventionData.data = this.allIntervention.map(intervention => ({
//           ...intervention,
//           userName: `${user.lastname} ${user.firstname}`,
//         }));
  
//         console.log('Utilisateur et interventions récupérés :', this.users, this.allIntervention);
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Erreur lors de la récupération des données :', error);
//         this.loading = false;
//       },
//     });
//   }
  

//   ngAfterViewInit() {
//     this.interventionData.paginator = this.paginator;
//   }

//   toggleDescription(): void {
//     this.showDescription = !this.showDescription;
//     console.log(this.showDescription);
//   }
// }
