import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: any[] = [];

  constructor(private router: Router) {
    // Initialize the cart with data from localStorage or an empty array
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  getTotalPrice() {
    return this.cart.reduce((total, product) => total + product.price * product.selectedQuantity, 0).toFixed(2);
  }

  increaseQuantity(product: any) {
    if (product.selectedQuantity < 50) {
      product.selectedQuantity += 0.25;
      product.selectedQuantity = parseFloat(product.selectedQuantity.toFixed(2)); // To avoid floating point issues
      this.updateCart();
    }
  }

  decreaseQuantity(product: any) {
    if (product.selectedQuantity > 0.25) {
      product.selectedQuantity -= 0.25;
      product.selectedQuantity = parseFloat(product.selectedQuantity.toFixed(2)); // To avoid floating point issues
      this.updateCart();
    } else {
      this.removeFromCart(product);
    }
  }

  removeFromCart(product: any) {
    this.cart = this.cart.filter(cartItem => cartItem !== product);
    this.updateCart();
  }

  updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  checkout() {
    console.log('Proceed to checkout');
    // Implement checkout logic here
  }

  continueShopping() {
    this.router.navigate(['/products']);
  }
}
