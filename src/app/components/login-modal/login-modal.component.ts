import { Component,OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  username: string = '';
  password: string = '';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  onSubmit() {
    // Implement your login logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    // Close the modal after login (assuming login is successful)
    this.activeModal.close('Login Successful');
  }
}
