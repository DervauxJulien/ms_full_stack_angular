import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  constructor() {}

  // 29/11/2024 Julien
  // Création de la méthode submitApplication() pour vérifier si mon applyForm est valide
  // SI c'est valide je retourne la data 
  // reste à implémenter save la data

  submitApplication() {

    if (this.applyForm.valid) {
      const { registration, firstName, lastName, email } = this.applyForm.value;

      console.log('Form data:', { registration, firstName, lastName, email });
    } else {
      console.log('Formulaire invalide. Veuillez corriger les erreurs.');
    }
  }
}
