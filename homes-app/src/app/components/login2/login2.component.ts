import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, NavigationStart, NavigationEnd, RouterEvent } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user-interface';

@Component({
  selector: 'app-login2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component {
  loginForm = new FormGroup({
    registration: new FormControl('', Validators.required),
    passwordUser: new FormControl('', Validators.required),
  });

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  submitUser() {
    if (this.loginForm.valid) {
      const userData = {
        ...this.loginForm.value,
      } as Partial<User>;
  
      this.usersService.login(userData).subscribe({
        next: (userResponse) => {
          console.log('Réponse utilisateur :', userResponse);
          if (userResponse) {
            const idUser = userResponse; 
            console.log('ID utilisateur récupéré :', idUser);
            localStorage.setItem("idUser", JSON.stringify(idUser)); 
            this.router.navigate(['/dashboard']);
          } else {
            console.error('La réponse utilisateur ne contient pas assez d\'éléments.');
          }
        },
        error: (error) => {
          console.error('Erreur lors de la vérification/création de l\'utilisateur :', error);
        },
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
