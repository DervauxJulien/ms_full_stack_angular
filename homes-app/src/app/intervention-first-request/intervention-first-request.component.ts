import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InterventionService } from '../services/intervention.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-intervention-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './intervention-first-request.component.html',
  styleUrls: ['./intervention-first-request.component.css'],
})
export class InterventionFirstRequestComponent {
  applyFirstForm = new FormGroup({
    registration: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    CREATION_DATE: new FormControl(format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx")),
    STATUS: new FormControl('pending'),
  });

  constructor(
    private interventionService: InterventionService,
    private router: Router,
  ) {}

  submitApplication() {
    if (this.applyFirstForm.valid) {

      const formData = this.applyFirstForm.value;

      // 02/12/2024 Julien
      // pour utiliser l'API je dois utiliser ma method checkUser dans service
      // pour mes test je débride ca

      // this.interventionService.checkUser(formData).subscribe({
      //  next: (response) => {
      //    if (response) {
      //      this.interventionService.setData('stepOneData', formData);
      //      this.router.navigate(['/description']);
      //    } else {
      //      alert("Utilisateur non reconnu. Veuillez vérifier vos informations.");
      //    }
    //     },
    //     error: (error) => {
    //       console.error('Erreur API:', error);
    //       alert('Une erreur est survenue lors de la vérification.');
    //     },
    //   });
    // } else {
    //   console.log('Formulaire invalide');
    //   alert('Veuillez remplir tous les champs requis.');
    // }
    
      this.interventionService.submitIntervention(formData).subscribe({
       next: (response) => {
         if (response) {
           this.interventionService.setData('stepOneData', formData);
           this.router.navigate(['/description']);
         } else {
           alert("Utilisateur non reconnu. Veuillez vérifier vos informations.");
         }
        },
        error: (error) => {
          console.error('Erreur API:', error);
          alert('Une erreur est survenue lors de la vérification.');
        },
      });
    } else {
      console.log('Formulaire invalide');
      alert('Veuillez remplir tous les champs requis.');
    }




  }
  
}
