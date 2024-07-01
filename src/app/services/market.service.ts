import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private apiUrl = 'https://localhost:7045/api/Market'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Fetch all markets
  getMarkets() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetch a single market by id
  getMarketById(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
