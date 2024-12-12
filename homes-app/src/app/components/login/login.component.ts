// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/interfaces/user-interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      registration: ['', [Validators.required, Validators.minLength(3)]],
      passwordUser: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        registration: this.loginForm.get('registration')?.value,
        passwordUser: this.loginForm.get('passwordUser')?.value
      };

      this.authService.login(credentials).subscribe({
        next: (user: User | null) => {
          if (user) {
            this.authService.setCurrentUser(user);
            this.router.navigate(['/intervention-display']);
          } else {
            this.errorMessage = 'Identifiants incorrects';
          }
        },
        error: () => {
          this.errorMessage = 'Erreur de connexion';
        }
      });
    }
  }
}
