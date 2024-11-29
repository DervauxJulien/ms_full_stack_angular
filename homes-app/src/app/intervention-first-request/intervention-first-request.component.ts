import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InterventionService } from '../services/intervention.service';

@Component({
  selector: 'app-intervention-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './intervention-first-request.component.html',
  styleUrls: ['./intervention-first-request.component.css']
})
export class InterventionFirstRequestComponent {

  // 29/11/2024 Julien
  // je viens instancier la méthode FormGroup de @angular/forms pour stocker dans applyForm mes champs
  // puis je viens instancier FormControl pour vérifier en précisant le type de champ
  // et j'ajoute un validator pour implémenter ma logique de contrôle.

  applyForm = new FormGroup({
    registration: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private interventionService: InterventionService) {}

  // 29/11/2024 Julien
  // Création de la méthode submitApplication() pour vérifier si mon applyForm est valide
  // SI c'est valide je retourne la data 
  // reste à implémenter save la data

  submitApplication() {

    if (this.applyForm.valid) {
      const formData = this.applyForm.value;

      this.interventionService.submitIntervention(formData).subscribe({
        next: (response) => {
          console.log('Succès:', response); 
          alert('Votre demande a été soumise avec succès.');
        },
        error: (error) => {
          console.error('Erreur:', error); 
          alert('Une erreur est survenue lors de la soumission.');
        },
      });
    } else {
      console.log('Formulaire invalide');
      alert('Veuillez remplir tous les champs requis.');
    }
  }
}
