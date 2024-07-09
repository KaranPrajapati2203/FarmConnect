import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  buyingPrice: number;
  sellingPrice: number;
  productTypeId: number;
  productMeasureType: string;
  productImage: string;
  maxQuantity: number;
  availableQuantity: number;
  isNeeded: boolean;
  isAvailable: boolean;
  createdAt: Date;
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'https://localhost:7045/api/Admin'; // Update with your actual API URL
  private apiUrl = 'https://localhost:7045/api/Products';
  constructor(private http: HttpClient) { }

  getDashboardData() {
    return this.http.get(`${this.baseUrl}/dashboard-data`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post(`${this.apiUrl}`, product);
  }

  updateProduct(id: number, product: Product) {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
