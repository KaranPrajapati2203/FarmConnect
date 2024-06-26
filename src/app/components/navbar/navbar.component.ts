import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { CommonModule } from '@angular/common';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, LoginModalComponent, CommonModule, RouterLinkActive, SignupModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(private modalService: NgbModal, private router: Router, private authService: AuthService) { }

  ngOnInit(): void { 
    this.isLoggedIn = !!this.authService.getToken(); // Check if user is logged in on initialization
  }

  openLoginModal() {
    const modalRef = this.modalService.open(LoginModalComponent);
    modalRef.result.then(
      (result: any) => {
        console.log(result);
        this.isLoggedIn = true; // Set to true after successful login
        this.router.navigateByUrl("/products");
      },
      (reason: any) => {
        console.log('Dismissed', reason);
      }
    );
  }

  openSignupModal() {
    const modalRef = this.modalService.open(SignupModalComponent);
    modalRef.result.then(
      (result: any) => {
        console.log(result);
        // Open login modal after successful signup
        this.openLoginModal();
      },
      (reason: any) => {
        console.log('Dismissed', reason);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
}
