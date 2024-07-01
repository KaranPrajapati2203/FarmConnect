import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7045/api/Users'; // Base URL of your API
  private roleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public role$ = this.roleSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    // Initialize the role from localStorage if available
    const role = this.getRoleFromLocalStorage();
    this.roleSubject.next(role);
  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(loginData: any) {
    console.log('AuthService login method called');
    console.log('Login data:', loginData);
    return this.http.post<any>(`${this.apiUrl}/login`, loginData);
  }

  logout() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userid');
        this.roleSubject.next(null); // Update the role to null
        this.toastr.success('Logout Successful', 'Success'); // Display success message
        this.router.navigateByUrl('');
        console.log("logout successful");
      }
    }
    catch (error) {
      console.error('Logout failed:', error);
      this.toastr.error('Logout failed. Please try again.', 'Error');
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (e) {
      console.error('Invalid token:', e);
      return null;
    }
  }

  getRoleFromLocalStorage(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('role');
    }
    return null;
  }

  updateRole(token: string) {
    const decodedToken = this.decodeToken(token);
    if (decodedToken && decodedToken.RoleId) {
      const role = decodedToken.RoleId;
      const userid = decodedToken.UserId;
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('role', role);
        localStorage.setItem('userid', userid);
      }
      this.roleSubject.next(role);
    }
  }
}
