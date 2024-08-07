import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup-modal.component.html',
  styleUrl: './signup-modal.component.css'
})
export class SignupModalComponent {
  signupForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    public activeModal: NgbActiveModal, 
    private fb: FormBuilder, 
    private authService: AuthService, 
    private modalService: NgbModal,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      isSeller: [false], // Added for seller registration
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.mustMatch('password', 'confirmPassword') });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


  onSubmit() {
    if (this.signupForm.valid) {
      const formValues = this.signupForm.value;
      const user = {
        firstname: formValues.firstname,
        lastname: formValues.lastname,
        email: formValues.email,
        password: formValues.password,
        roleId: formValues.isSeller ? 3 : 2 // Set roleId based on isSeller checkbox
      };

      this.authService.register(user).subscribe(
        (response: any) => {
          console.log('Registration successful:', response);
          this.toastr.success('Registration Successful', 'Success')
          this.activeModal.close('Signup Successful');
        },
        (error: any) => {
          this.toastr.error('Registration failed. Please try again.', 'Error');
          console.error('Registration failed:', error);
        }
      );
    }
  }

  openLoginModal() {
    this.activeModal.dismiss();
    this.modalService.open(LoginModalComponent);
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
