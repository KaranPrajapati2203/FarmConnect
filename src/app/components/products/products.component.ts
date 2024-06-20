import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, InfiniteScrollModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products = [
    {
      name: 'Organic Apples',
      description: 'Fresh and juicy organic apples from local farms.',
      price: 120,
      type: 'fruits',
      imageUrl: 'https://www.shimlafarms.com/cdn/shop/products/Redapple3.png?v=1675785288&width=1445'
    },
    {
      name: 'Fresh Carrots',
      description: 'Crisp and sweet carrots grown with love.',
      price: 90,
      type: 'vegetables',
      imageUrl: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/usa-new-york-city-carrots-for-sale-tetra-images.jpg'
    },
    {
      name: 'Dairy Milk',
      description: 'Pure and fresh milk from grass-fed cows.',
      price: 50,
      type: 'dairy',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLbH-mTn8P736RPcSHkV16rhLF1vZvStQMg&s'
    },
    {
      name: 'Fresh Strawberries',
      description: 'Sweet and juicy strawberries freshly picked.',
      price: 150,
      type: 'fruits',
      imageUrl: 'https://d3fwccq2bzlel7.cloudfront.net/Pictures/480xany/5/8/8/35588_2_1203853_e.jpg'
    },
    {
      name: 'Organic Broccoli',
      description: 'Healthy and fresh organic broccoli.',
      price: 80,
      type: 'vegetables',
      imageUrl: 'https://s.alicdn.com/@sc04/kf/A4f577b2659534d3292fd568d359d9cc5j.jpg_300x300.jpg'
    },
    {
      name: 'Fresh Oranges',
      description: 'Fresh and juicy oranges.',
      price: 200,
      type: 'fruits',
      imageUrl: 'https://tacomaboys.com/wp-content/uploads/2020/04/TB-27-8701-1024x588.jpg'
    },
    {
      name: 'Organic Tomatoes',
      description: 'Ripe and juicy organic tomatoes.',
      price: 70,
      type: 'vegetables',
      imageUrl: 'https://i.cdn.newsbytesapp.com/images/l29720230821154142.jpeg'
    },
    {
      name: 'Fresh Spinach',
      description: 'Leafy green spinach, rich in nutrients.',
      price: 60,
      type: 'vegetables',
      imageUrl: 'https://www.bigbasket.com/media/uploads/p/xxl/40200226_1-farmogo-spinach-hydroponically-grown.jpg'
    },
    {
      name: 'Grapes',
      description: 'Sweet and juicy organic grapes.',
      price: 140,
      type: 'fruits',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Kyoho-grape.jpg'
    }
  ];

  filteredProducts!: any[]; // Array to hold filtered products
  searchText: string = ''; // Variable to hold search input
  selectedType: string = ''; // Variable to hold selected type

  displayedProducts: any[] = []; // Array to hold products for the current view
  itemsPerLoad: number = 18;
  currentIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.filterProducts();
  }

  filterProducts() {
    // Filter products based on searchText and selectedType
    if (this.searchText.trim() !== '') {
      this.filteredProducts = this.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesType = this.selectedType ? product.type === this.selectedType : true;
        return matchesSearch && matchesType;
      });
    } else {
      // If search input is empty, only apply type filter
      this.filteredProducts = this.products.filter(product => {
        return this.selectedType ? product.type === this.selectedType : true;
      });
    }
    this.resetDisplayProducts()
  }

  resetDisplayProducts() {
    this.displayedProducts = [];
    this.currentIndex = 0;
    this.loadMoreProducts();
  }

  loadMoreProducts() {
    const nextProducts = this.filteredProducts.slice(this.currentIndex, this.currentIndex + this.itemsPerLoad);
    this.displayedProducts = this.displayedProducts.concat(nextProducts);
    this.currentIndex += this.itemsPerLoad;
  }

  onScroll() {
    this.loadMoreProducts();
  }

  goToProductDetails(product: any) {
    this.router.navigate(['/product-details', product.name]);
  }


}
