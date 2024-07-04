import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  orders: any[] = [];
  userId: number = parseInt(localStorage.getItem('userid') || '0');
  private currentOrderId: number = 0;  // Variable to track orderId
  selectedOrder: any = null;
  private modalReference!: NgbModalRef;

  constructor(private router: Router, private orderService: OrderService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadOrderHistory();
  }

  loadOrderHistory() {
    if (this.userId) {
      this.orderService.getOrderHistory(this.userId).subscribe(
        (data: any) => {
          console.log("data: " + JSON.stringify(data));
          if (Array.isArray(data)) {
            const length = data.length;
            this.orders = data.map((order, index) => {
              order.orderId = length - index; // Assign orderId in reverse order
              return order;
            });
          } else {
            // Handle single object case if needed
            data.orderId = 1; // Start with 1 if there's only one order
            this.orders = [data];
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  openOrderDetailsModal(content: any, order: any) {
    this.selectedOrder = order;
    this.modalReference = this.modalService.open(content, { scrollable: true });
    this.modalReference.result.then(
      (result: any) => {
        console.log(`Closed with: ${result}`);
      },
      (reason: any) => {
        console.log(`Dismissed ${reason}`);
      }
    );
  }
}
