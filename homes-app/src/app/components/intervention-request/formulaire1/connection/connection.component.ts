import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user-interface';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css'],
})
export class ConnectionComponent {
  applyFirstForm = new FormGroup({
    registration: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
  });

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  submitUser() {
    if (this.applyFirstForm.valid) {
      const userData = {
        ...this.applyFirstForm.value,
      } as Partial<User>;

      this.usersService.setUser(userData).subscribe({
        next: (userResponse) => {

          const userId = userResponse; 
          console.log(userId);
          this.usersService.setData('currentUserId', userId);

          this.router.navigate(['/description']);
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
