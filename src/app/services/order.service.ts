import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:7045/api/OrderHistory'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getOrderHistory(userId: number) {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
