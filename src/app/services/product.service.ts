import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:7045/api/Products'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addProductListing(request: any) {
    return this.http.post<any>(`${this.apiUrl}/listings`, request);
  }
}
