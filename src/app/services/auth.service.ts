import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode'
import { Router } from '@angular/router';
// import { tap } from 'rxjs/operators';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7045/api/Users'; // Base URL of your API

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(loginData: any) {
    console.log('AuthService login method called');
    console.log('Login data:', loginData);
    return this.http.post<any>(`${this.apiUrl}/login`, loginData);
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // getUser() {
  //   var token = localStorage.getItem("token");
  //   if (!token) {
  //     return null;
  //   }
  //   var decodeToken: any = jwtDecode(token);
  //   const userDetail = {
  //     // Role: decodeToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  //     Role: decodeToken['RoleId']
  //   };
  //   console.log(userDetail);
  //   return userDetail;
  // }
}
