import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InterventionService } from '../services/intervention.service';

@Component({
  selector: 'app-intervention-second-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './intervention-second-request.component.html',
  styleUrls: ['./intervention-second-request.component.css'],
})
export class InterventionSecondRequestComponent {
  applySecondForm = new FormGroup({
    description: new FormControl('', Validators.required),
  });

  constructor(
    private interventionService: InterventionService,
    private router: Router
  ) {}

  submitData() {
    if (this.applySecondForm.valid) {
      const stepOneData = this.interventionService.getData('stepOneData');
      const stepTwoData = this.applySecondForm.value;

      const finalPayload = {
        ...stepOneData,
        ...stepTwoData,
      };

      this.interventionService.submitIntervention(finalPayload).subscribe({
        next: (response) => {
          console.log('Succès:', response);
          alert('Votre demande a été soumise avec succès.');
          const createdInterventionId = response.id;
          this.router.navigate(['/validate', createdInterventionId]);
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
