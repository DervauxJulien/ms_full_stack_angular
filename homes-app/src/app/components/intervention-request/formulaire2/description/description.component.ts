import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InterventionService } from 'src/app/services/intervention.service';
import { Intervention } from 'src/app/interfaces/intervention-interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {
  interventionForm = new FormGroup({
    description: new FormControl('', Validators.required),
  });

  constructor(
    private interventionService: InterventionService,
    private usersService: UsersService,
    private router: Router
  ) {}

  submitIntervention() {
    if (this.interventionForm.valid) {
      const userId = this.usersService.getData('currentUserId');
      console.log(userId);
      if (!userId) {
        alert('Utilisateur non défini');
        this.router.navigate(['/connection']); 
        return;
      }

      const interventionData = {
        ...this.interventionForm.value,
        idUser: userId, 
        idLocation : 2
      } as Partial<Intervention>;

      console.log(interventionData);

      this.interventionService.submitIntervention(interventionData).subscribe({
        next: (response) => {
          console.log('Intervention soumise :', response);
          alert('Intervention créée avec succès.');
          this.router.navigate([`/validate/${userId}`]); 
        },
        error: (error) => {
          console.error('Erreur lors de la soumission de l\'intervention :', error);
          alert('Une erreur est survenue. Veuillez réessayer.');
        },
      });
    } else {
      console.log('Formulaire invalide');
      alert('Veuillez remplir tous les champs requis.');
    }
  }
}
