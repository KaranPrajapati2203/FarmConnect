import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';

interface Listing {
  productName: string;
  quantity: number;
  totalPrice: number;
  listedAt: Date;
  amountReceived: number;
}


@Component({
  selector: 'app-my-listing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-listing.component.html',
  styleUrl: './my-listing.component.css'
})
export class MyListingComponent {
  // myListings: Listing[] = [
  //   {
  //     productName: 'Organic Apples',
  //     quantity: 10,
  //     totalPrice: 1200,
  //     listedAt: new Date('2024-07-01T10:00:00'),
  //     amountReceived: 1200
  //   },
  //   {
  //     productName: 'Fresh Carrots',
  //     quantity: 5,
  //     totalPrice: 450,
  //     listedAt: new Date('2024-07-02T12:00:00'),
  //     amountReceived: 450
  //   },
  //   {
  //     productName: 'Dairy Milk',
  //     quantity: 20,
  //     totalPrice: 1000,
  //     listedAt: new Date('2024-07-03T14:30:00'),
  //     amountReceived: 1000
  //   }
  // ];

  myListings: any[] = [];
  totalIncome: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProductListings();
  }

  loadProductListings() {
    const userId = localStorage.getItem('userid'); // Replace with actual userId logic if necessary
    this.productService.getProductListings(userId).subscribe(
      (listings: any) => {
        // console.log("listing: " + JSON.stringify(listings));
        this.myListings = listings;
      },
      (error: any) => {
        console.error('Error fetching listings:', error);
        // Handle error as needed
      }
    );
  }

  getTotalIncome(): number {
    return this.myListings.reduce((total, listing) => total + (listing.productPrice * listing.listingQuantity), 0);

  }
}
