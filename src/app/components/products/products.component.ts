import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products = [
    {
      name: 'Organic Apples',
      description: 'Fresh and juicy organic apples from local farms.',
      price: 120,
      imageUrl: 'https://www.shimlafarms.com/cdn/shop/products/Redapple3.png?v=1675785288&width=1445'
    },
    {
      name: 'Fresh Carrots',
      description: 'Crisp and sweet carrots grown with love.',
      price: 90,
      imageUrl: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/usa-new-york-city-carrots-for-sale-tetra-images.jpg'
    },
    {
      name: 'Dairy Milk',
      description: 'Pure and fresh milk from grass-fed cows.',
      price: 50,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLbH-mTn8P736RPcSHkV16rhLF1vZvStQMg&s'
    },
    {
      name: 'Fresh Strawberries',
      description: 'Sweet and juicy strawberries freshly picked.',
      price: 150,
      imageUrl: 'https://d3fwccq2bzlel7.cloudfront.net/Pictures/480xany/5/8/8/35588_2_1203853_e.jpg'
    },
    {
      name: 'Organic Broccoli',
      description: 'Healthy and fresh organic broccoli.',
      price: 80,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/A4f577b2659534d3292fd568d359d9cc5j.jpg_300x300.jpg'
    },
    {
      name: 'Fresh Oranges',
      description: 'Fresh and juicy oranges.',
      price: 200,
      imageUrl: 'https://tacomaboys.com/wp-content/uploads/2020/04/TB-27-8701-1024x588.jpg'
    },
    {
      name: 'Organic Tomatoes',
      description: 'Ripe and juicy organic tomatoes.',
      price: 70,
      imageUrl: 'https://i.cdn.newsbytesapp.com/images/l29720230821154142.jpeg'
    },
    {
      name: 'Fresh Spinach',
      description: 'Leafy green spinach, rich in nutrients.',
      price: 60,
      imageUrl: 'https://www.bigbasket.com/media/uploads/p/xxl/40200226_1-farmogo-spinach-hydroponically-grown.jpg'
    },
    {
      name: 'Grapes',
      description: 'Sweet and juicy organic grapes.',
      price: 140,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Kyoho-grape.jpg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
