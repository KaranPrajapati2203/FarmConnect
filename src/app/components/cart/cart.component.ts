import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: any[] = [];
  userId: number = parseInt(localStorage.getItem('userid') || '0'); // Replace with the actual user ID

  constructor(private router: Router, private toastr: ToastrService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }
  loadCart() {
    if (this.userId) {
      this.cartService.getCartItems(this.userId).subscribe(
        (data: any) => {
          // Assuming data is an array of cart items
          this.cart = Array.isArray(data) ? data.map(item => ({
            cartId: item.cartId,
            userId: item.userId,
            productId: item.productId,
            quantity: item.quantity,
            createdAt: item.createdAt,
            productName: item.productName,
            productDescription: item.productDescription,
            productPrice: item.productPrice,
            productMeasureType: item.productMeasureType,
            productImage: item.productImage
          })) : [data]; // If data is not an array, make it an array
          
        },
        (error: any) => {
          // this.toastr.error('Failed to load cart items.', 'Error');
          console.error(error);
        }
      );
    }
  }

  getTotalPrice() {
    return this.cart.reduce((total, product) => total + product.productPrice * product.quantity, 0).toFixed(2);
  }

  increaseQuantity(product: any) {
    if (product.quantity < 50) {
      product.quantity += 0.25;
      product.quantity = parseFloat(product.quantity.toFixed(2)); // To avoid floating point issues
      this.updateCartItem(product);
    }
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 0.25) {
      product.quantity -= 0.25;
      product.quantity = parseFloat(product.quantity.toFixed(2)); // To avoid floating point issues
      this.updateCartItem(product);
    } else {
      this.removeFromCart(product);
    }
  }

  removeFromCart(product: any) {
    this.cartService.deleteCartItem(product.cartId).subscribe(
      () => {
        this.cart = this.cart.filter(cartItem => cartItem.cartId !== product.cartId);
        this.toastr.success('Product removed from cart.', 'Success');
        // if (this.cart.length === 0) {
        //   this.toastr.warning('Your cart is empty.', 'Warning');
        // }
      },
      (error: any) => {
        this.toastr.error('Failed to remove product from cart.', 'Error');
        console.error(error);
      }
    );
  }

  updateCartItem(product: any) {
    this.cartService.updateCartItem(product.cartId, { quantity: product.quantity }).subscribe(
      () => {
        this.toastr.success('Cart updated successfully.', 'Success');
      },
      (error: any) => {
        this.toastr.error('Failed to update cart.', 'Error');
        console.error(error);
      }
    );
  }

  checkout() {
    if (this.cart.length > 0) {
      const totalAmount = this.getTotalPrice();
      this.cartService.checkout(this.userId).subscribe(
        () => {
          this.cart = [];
          this.toastr.success(`Checkout successful! Total amount: ₹${totalAmount}`, 'Success');
          console.log('Proceed to checkout');
        },
        (error: any) => {
          this.toastr.error('Checkout failed!', 'Error');
          console.error(error);
        }
      );
    } else {
      this.toastr.error('Your cart is empty!', 'Error');
    }
  }

  continueShopping() {
    this.router.navigate(['/products']);
  }
}
