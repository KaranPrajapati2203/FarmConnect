import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketService } from '../../services/market.service';

@Component({
  selector: 'app-sellers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.css'
})
export class SellersComponent {
  // sellers = [
  //   {
  //     id: 1,
  //     name: 'Shree Organic Farms',
  //     description: 'Organic fruits and vegetables directly from the farm.',
  //     location: 'Maharashtra, India',
  //     imageUrl: 'https://cff2.earth.com/uploads/2023/05/16064103/Farms-scaled.jpg',
  //     latitude: 19.7515,
  //     longitude: 75.7139
  //   },
  //   {
  //     id: 2,
  //     name: 'Swastik Farm',
  //     description: 'Fresh dairy products from grass-fed cows.',
  //     location: 'Gujarat, India',
  //     imageUrl: 'https://ec.europa.eu/eurostat/documents/4187653/16403426/Martin%20Bergsma_Shutterstock_287378714_RV.jpg',
  //     latitude: 22.2587,
  //     longitude: 71.1924
  //   },
  //   {
  //     id: 3,
  //     name: 'Swasthya Harvest',
  //     description: 'Locally grown organic produce.',
  //     location: 'Punjab, India',
  //     imageUrl: 'https://live.staticflickr.com/65535/50881797506_176f3d534f_z.jpg',
  //     latitude: 31.1471,
  //     longitude: 75.3412
  //   },
  //   {
  //     id: 4,
  //     name: 'Organic Mandala',
  //     description: 'Family-owned farm offering organic produce.',
  //     location: 'Kerala, India',
  //     imageUrl: 'https://www.shutterstock.com/image-photo/thoroughbred-horses-grazing-sunset-field-600nw-1412323913.jpg',
  //     latitude: 10.8505,
  //     longitude: 76.2711
  //   },
  //   {
  //     id: 5,
  //     name: 'Farm Fresh India',
  //     description: 'Delivering fresh farm produce to your doorstep.',
  //     location: 'Tamil Nadu, India',
  //     imageUrl: 'https://static8.depositphotos.com/1086305/849/i/450/depositphotos_8495323-stock-photo-american-country.jpg',
  //     latitude: 11.1271,
  //     longitude: 78.6569
  //   },
  //   {
  //     id: 6,
  //     name: 'Hariyali Farms',
  //     description: 'Sustainable farming with organic practices.',
  //     location: 'Uttar Pradesh, India',
  //     imageUrl: 'https://media.licdn.com/dms/image/D561BAQGIQhJMe9algQ/company-background_10000/0/1660545021462/frams_by_a_cover?e=2147483647&v=beta&t=v2jdEkSstoRiWxv5eVJzrcIr1DMlGUR5Q_RUpiW-U1E',
  //     latitude: 26.8467,
  //     longitude: 80.9462
  //   }
  // ];

  sellers: any[] = []; // Array to hold sellers
  filteredSellers!: any[]; // Array to hold filtered sellers
  searchText: string = ''; // Variable to hold search input

  constructor(private marketService: MarketService, private router: Router) { }

  ngOnInit(): void {
    this.fetchSellers();
  }

  fetchSellers() {
    this.marketService.getMarkets()
      .subscribe(
        (data: any) => {
          console.log("market data: " + JSON.stringify(data));
          this.sellers = data;
          this.filteredSellers = this.sellers; // Initialize filteredSellers with all sellers
        },
        (error: any) => {
          console.error('Error fetching sellers:', error);
          // Handle error as needed, e.g., show error message to the user
        }
      );
  }

  filterSellers() {
    // Filter sellers based on searchText
    if (this.searchText.trim() !== '') {
      this.filteredSellers = this.sellers.filter(seller =>
        seller.marketName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      // If search input is empty, show all sellers
      this.filteredSellers = this.sellers;
    }
  }

  showAllMarketLocations() {
    console.log("maret locations clicked");
    this.router.navigate(['/show-all-markets']);

  }

  viewOnMap(sellerId: number) {
    this.router.navigate(['/market-location', sellerId]);
  }

}
