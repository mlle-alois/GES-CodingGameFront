import {Component} from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from "../../services/auth.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      this.authService.login(email).subscribe({
        next: () => {
          this.errorMessage = '';
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = 'Un problème est survenu lors de la connexion. Veuillez réessayer. ' + err;
        },
      });
    } else {
      this.errorMessage = 'Le formulaire est invalide.'
    }
  }

  hasLoginFormErrors(): boolean | undefined {
    return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched;
  }

  hasEmailFormatError(): boolean {
    return this.loginForm.get('email')?.errors?.['email'];
  }

  hasEmailRequiredError(): boolean {
    return this.loginForm.get('email')?.errors?.['required'];
  }
}
