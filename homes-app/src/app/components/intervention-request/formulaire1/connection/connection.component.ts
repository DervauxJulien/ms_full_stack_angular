import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { InterventionService } from 'src/app/services/intervention.service';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {

  applyFirstForm = new FormGroup({
    registration: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    CREATION_DATE: new FormControl(format(new Date(), "dd-MM-yyyy HH:mm")),
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
