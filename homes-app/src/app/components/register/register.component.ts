import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/registerUser.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitting = false;
  submissionError = '';
  submissionSuccess = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      // email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ]],
      repeatPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const repeatPassword = form.get('repeatPassword');
    return password && repeatPassword && password.value === repeatPassword.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    
    this.isSubmitting = true;
    this.submissionError = '';
    this.submissionSuccess = '';

    const { repeatPassword, ...userData } = this.registerForm.value;

    this.userService.registerUser(userData).subscribe({
      next: (response) => {
        this.submissionSuccess = "Compte créé avec succès";
        this.registerForm.reset();
      },
      error: (error) => {
        this.submissionError = "Erreur d'inscription. Veuillez réessayer.";
        console.error('Erreur:', error);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}