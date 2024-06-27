import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  loginForm!: FormGroup;
  errorMessage!: string;
  showPassword: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal,
    private toastr: ToastrService // Inject ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.authService.login(loginData).subscribe(
        (response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token);

            this.authService.updateRole(response.token);

            this.activeModal.close('Login Successful');
            this.toastr.success('Login Successful', 'Success'); // Display success message
            this.router.navigateByUrl('/products');
            console.log("Hello");
          } else {
            this.errorMessage = 'Invalid email or password.';
          }
        },
        (error: any) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Login failed. Please try again.';
          this.toastr.error('Login failed. Please try again.', 'Error'); // Display error message
        }
      );
    } else {
      console.log('Login form is invalid');
    }
  }

  openSignupModal() {
    this.activeModal.dismiss();
    this.modalService.open(SignupModalComponent);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
