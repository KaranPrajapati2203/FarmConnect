import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarketService } from '../../services/market.service';
// import L from 'leaflet';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map: any;
  private marketId: number | undefined;
  sellers: any[] = [];
  seller: any; // Variable to hold the selected seller details
  showAllMarkets: boolean = false;
  private currentLocationMarker: any;
  private routingControl: any;

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute, private marketService: MarketService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params['id']) {
        this.showAllMarkets = false;
        this.fetchMarketDetails(+params['id']);
      } else {
        this.showAllMarkets = true;
        this.fetchAllMarkets();
      }
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadLeaflet();
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private fetchMarketDetails(id: number): void {
    this.marketService.getMarketById(id).subscribe(
      (data: any) => {
        this.seller = data;
        this.initMap();
      },
      (error: any) => console.error('Error fetching market details:', error)
    );
  }

  private fetchAllMarkets(): void {
    this.marketService.getMarkets().subscribe(
      (data: any) => {
        this.sellers = data;
        this.initMap();
      },
      (error: any) => console.error('Error fetching all markets:', error)
    );
  }
  private async loadLeaflet() {
    const L = await import('leaflet');
    await import('leaflet-routing-machine');

    this.initMap(L);
  }

  private initMap(L: any = null): void {
    if (!this.seller && !this.showAllMarkets) {
      console.log('Seller not found');
      return;
    }

    if (this.map) {
      this.map.remove();
    }

    if (!L) {
      L = (window as any).L;
    }
    this.map = L.map('map').setView([22.2587, 71.1924], 8); // Initial center of India for all markets

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    if (this.showAllMarkets) {
      // this.map = L.map('map').setView([22.2587, 71.1924], 8); 

      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      // }).addTo(this.map);

      this.sellers.forEach(seller => {
        L.marker([seller.marketLatitude, seller.marketLongitude]).addTo(this.map)
          .bindPopup(`<b>${seller.marketName}</b><br>${seller.marketAddress}`)
          .openPopup();
      });
    } else {
      // this.map = L.map('map').setView([this.seller.marketLatitude, this.seller.marketLongitude], 10);

      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      // }).addTo(this.map);

      L.marker([this.seller.marketLatitude, this.seller.marketLongitude]).addTo(this.map)
        .bindPopup(`<b>${this.seller.marketName}</b><br>${this.seller.marketAddress}`)
        .openPopup();
    }
    this.showCurrentLocation(L);

  }

  private showCurrentLocation(L: any): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const currentLatLng: [number, number] = [position.coords.latitude, position.coords.longitude];
        
        if (this.currentLocationMarker) {
          this.map.removeLayer(this.currentLocationMarker);
        }

        this.currentLocationMarker = L.marker(currentLatLng).addTo(this.map)
          .bindPopup('<b>You are here</b>')
          .openPopup();

        this.map.setView(currentLatLng, 13);

        if (this.seller) {
          this.showRoute(L, currentLatLng, [this.seller.marketLatitude, this.seller.marketLongitude]);
        }
      }, error => {
        console.error('Error getting current location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  private showRoute(L: any, start: [number, number], end: [number, number]): void {
    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }

    this.routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1])
      ],
      routeWhileDragging: true
    }).addTo(this.map);
  }
}
