import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:7045/api/Cart'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getCartItems(userId: number) {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  addToCart(cartItem: any) {
    // debugger;
    // console.log(JSON.stringify(cartItem));
    return this.http.post(this.apiUrl, cartItem);
  }

  updateCartItem(cartId: number, cartItem: any) {
    return this.http.put(`${this.apiUrl}/${cartId}`, cartItem);
  }

  deleteCartItem(cartId: number) {
    return this.http.delete(`${this.apiUrl}/${cartId}`);
  }

  checkout(userId: number) {
    return this.http.post(`${this.apiUrl}/checkout/${userId}`, {});
  }
}
