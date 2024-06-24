import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, LoginModalComponent, CommonModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void { }

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

  logout() {
    this.isLoggedIn = false; // Reset to false on logout
    this.router.navigateByUrl("");
  }
}
