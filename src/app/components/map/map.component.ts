import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map: any;
  private sellerId: number | undefined;
  seller: any; // Variable to hold the selected seller details

  sellers = [
    {
      id: 1,
      name: 'Shree Organic Farms',
      description: 'Organic fruits and vegetables directly from the farm.',
      location: 'Maharashtra, India',
      imageUrl: 'https://cff2.earth.com/uploads/2023/05/16064103/Farms-scaled.jpg',
      latitude: 19.7515,
      longitude: 75.7139
    },
    {
      id: 2,
      name: 'Swastik Farm',
      description: 'Fresh dairy products from grass-fed cows.',
      location: 'Gujarat, India',
      imageUrl: 'https://ec.europa.eu/eurostat/documents/4187653/16403426/Martin%20Bergsma_Shutterstock_287378714_RV.jpg',
      latitude: 22.2587,
      longitude: 71.1924
    },
    {
      id: 3,
      name: 'Swasthya Harvest',
      description: 'Locally grown organic produce.',
      location: 'Punjab, India',
      imageUrl: 'https://live.staticflickr.com/65535/50881797506_176f3d534f_z.jpg',
      latitude: 31.1471,
      longitude: 75.3412
    },
    {
      id: 4,
      name: 'Organic Mandala',
      description: 'Family-owned farm offering organic produce.',
      location: 'Kerala, India',
      imageUrl: 'https://www.shutterstock.com/image-photo/thoroughbred-horses-grazing-sunset-field-600nw-1412323913.jpg',
      latitude: 10.8505,
      longitude: 76.2711
    },
    {
      id: 5,
      name: 'Farm Fresh India',
      description: 'Delivering fresh farm produce to your doorstep.',
      location: 'Tamil Nadu, India',
      imageUrl: 'https://static8.depositphotos.com/1086305/849/i/450/depositphotos_8495323-stock-photo-american-country.jpg',
      latitude: 11.1271,
      longitude: 78.6569
    },
    {
      id: 6,
      name: 'Hariyali Farms',
      description: 'Sustainable farming with organic practices.',
      location: 'Uttar Pradesh, India',
      imageUrl: 'https://media.licdn.com/dms/image/D561BAQGIQhJMe9algQ/company-background_10000/0/1660545021462/frams_by_a_cover?e=2147483647&v=beta&t=v2jdEkSstoRiWxv5eVJzrcIr1DMlGUR5Q_RUpiW-U1E',
      latitude: 26.8467,
      longitude: 80.9462
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.sellerId = +params['id'];
      this.seller = this.sellers.find(seller => seller.id === this.sellerId);
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadLeaflet();
    }
  }

  private async loadLeaflet() {
    const L = await import('leaflet');
    this.initMap(L);
  }

  private initMap(L: any): void {
    const seller = this.sellers.find(s => s.id === this.sellerId);
    if (!seller) {
      console.error('Seller not found');
      return;
    }

    this.map = L.map('map').setView([seller.latitude, seller.longitude], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([seller.latitude, seller.longitude]).addTo(this.map)
      .bindPopup(`<b>${seller.name}</b><br>${seller.location}`)
      .openPopup();
  }
}
