import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import { OrderService } from '../../services/order.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  orders: any[] = [
    {
      orderId: 1,
      orderDate: '2024-07-03',
      items: [
        { productName: 'Organic Apples', quantity: 2, price: 120, measureType: 'kg' },
        { productName: 'Fresh Carrots', quantity: 1, price: 90, measureType: 'kg' }
      ],
      totalAmount: 330,
      totalItems: 2
    },
    {
      orderId: 2,
      orderDate: '2024-06-30',
      items: [
        { productName: 'Dairy Milk', quantity: 1, price: 50, measureType: 'L' }
      ],
      totalAmount: 50,
      totalItems: 1
    },
    {
      orderId: 3,
      orderDate: '2024-06-28',
      items: [
        { productName: 'Fresh Strawberries', quantity: 3, price: 150, measureType: 'kg' },
        { productName: 'Organic Broccoli', quantity: 2, price: 80, measureType: 'kg' }
      ],
      totalAmount: 570,
      totalItems: 2
    }
    // Add more orders as needed
  ];

  constructor(private router: Router) { }

  viewOrderDetails(order: any) {
    // Implement the logic to navigate to the order details page
    // For example:
    // this.router.navigate(['/order-details', order.orderId]);
  }
}
