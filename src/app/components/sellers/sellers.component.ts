import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sellers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.css'
})
export class SellersComponent {
  sellers = [
    {
      name: 'Shree Organic Farms',
      description: 'Organic fruits and vegetables directly from the farm.',
      location: 'Maharashtra, India',
      imageUrl: 'https://cff2.earth.com/uploads/2023/05/16064103/Farms-scaled.jpg'
    },
    {
      name: 'Swastik Farm',
      description: 'Fresh dairy products from grass-fed cows.',
      location: 'Gujarat, India',
      imageUrl: 'https://ec.europa.eu/eurostat/documents/4187653/16403426/Martin%20Bergsma_Shutterstock_287378714_RV.jpg'
    },
    {
      name: 'Swasthya Harvest',
      description: 'Locally grown organic produce.',
      location: 'Punjab, India',
      imageUrl: 'https://live.staticflickr.com/65535/50881797506_176f3d534f_z.jpg'
    },
    {
      name: 'Organic Mandala',
      description: 'Family-owned farm offering organic produce.',
      location: 'Kerala, India',
      imageUrl: 'https://www.shutterstock.com/image-photo/thoroughbred-horses-grazing-sunset-field-600nw-1412323913.jpg'
    },
    {
      name: 'Farm Fresh India',
      description: 'Delivering fresh farm produce to your doorstep.',
      location: 'Tamil Nadu, India',
      imageUrl: 'https://static8.depositphotos.com/1086305/849/i/450/depositphotos_8495323-stock-photo-american-country.jpg'
    },
    {
      name: 'Hariyali Farms',
      description: 'Sustainable farming with organic practices.',
      location: 'Uttar Pradesh, India',
      imageUrl: 'https://media.licdn.com/dms/image/D561BAQGIQhJMe9algQ/company-background_10000/0/1660545021462/frams_by_a_cover?e=2147483647&v=beta&t=v2jdEkSstoRiWxv5eVJzrcIr1DMlGUR5Q_RUpiW-U1E'
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }
}
