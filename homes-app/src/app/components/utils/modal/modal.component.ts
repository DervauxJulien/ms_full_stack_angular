import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { PriorityComponent } from '../priority/priority.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InterventionService } from 'src/app/services/intervention.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { Intervention } from 'src/app/interfaces/intervention-interface';
// import { Location } from 'src/app/interfaces/location-interface';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, NgClass, PriorityComponent, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {
  constructor(
    private interventionService: InterventionService,
    private usersService: UsersService,
    private router: Router
  ) { }

  locations!: any[];
  isModalOpen = false;

  interventionForm = new FormGroup({
    description: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required)
  });

  openModal() {
    this.isModalOpen = true;
    document.body.classList.add('overflow-hidden');
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.classList.remove('overflow-hidden');
  }

  ngOnInit() {
    this.interventionService.getLocations().subscribe({
      next: (response) => {
        this.locations = response; 
        console.log('Villes récupérées :', this.locations);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des villes :', error);
      },
    });
  }
  
  submitIntervention() {
    if (this.interventionForm.valid) {
      const userId = localStorage.getItem('idUser');
      const priority = localStorage.getItem('priority')
      if (!userId) {
        alert('Utilisateur non défini');
        this.router.navigate(['/connection']);
        return;
      }
      const interventionData = {
        description: this.interventionForm.value.description,
        location: this.interventionForm.value.location,
        idUser: Number(userId),
        priority: priority
      } as Partial<Intervention>;

      this.interventionService.submitIntervention(interventionData).subscribe({
        next: (response) => {
          console.log('Intervention soumise :', response);
          alert('Intervention créée avec succès.');
          // this.router.navigate([`/validate/${userId}`]);
        },
        error: (error) => {
          console.error('Erreur lors de la soumission de l\'intervention :', error);
          alert('Une erreur est survenue. Veuillez réessayer.');
        },
      });
    }
  }
}


