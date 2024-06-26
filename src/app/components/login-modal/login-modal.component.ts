import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  loginForm!: FormGroup;
  errorMessage!: string;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    console.log('Login form submitted');
    if (this.loginForm.valid) {
      console.log('Login form is valid');
      const loginData = this.loginForm.value;
      console.log('Login data:', loginData);

      this.authService.login(loginData).subscribe(
        (response: any) => {
          console.log('Login response:', response);
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.activeModal.close('Login Successful');
            this.router.navigateByUrl('/products');
          } else {
            this.errorMessage = 'Invalid email or password.';
          }
        },
        (error: any) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Login failed. Please try again.';
        }
      );
    } else {
      console.log('Login form is invalid');
    }
  }
  
}
