// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'https://localhost:7045/api/Users'; // Base URL of your API

//   constructor(private http: HttpClient, private router: Router) { }

//   register(user: any) {
//     return this.http.post(`${this.apiUrl}/register`, user);
//   }

//   login(loginData: any) {
//     console.log('AuthService login method called');
//     console.log('Login data:', loginData);
//     return this.http.post<any>(`${this.apiUrl}/login`, loginData);
//   }

//   logout() {
//     console.log("logout successful");
//     localStorage.removeItem('token');
//     console.log("role removed: " + localStorage.getItem('role'))
//     localStorage.removeItem('role');
//     console.log("current role: " + localStorage.getItem('role'))
//     this.router.navigateByUrl('');
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   decodeToken(token: string): any {
//     try {
//       const payload = token.split('.')[1];
//       const decodedPayload = atob(payload);
//       return JSON.parse(decodedPayload);
//     } catch (e) {
//       console.error('Invalid token:', e);
//       return null;
//     }
//   }

// }

// --------------------------------------------------------------------------------------------------------------

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7045/api/Users'; // Base URL of your API
  private roleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
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
    console.log("logout successful");
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.roleSubject.next(null); // Update the role to null
    }
    this.router.navigateByUrl('');
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
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('role', role);
      }
      this.roleSubject.next(role);
    }
  }
}
