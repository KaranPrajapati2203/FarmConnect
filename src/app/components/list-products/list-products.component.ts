import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  measureType: string;
  imageUrl: string;
  isNeeded: boolean;
  selected?: boolean;
  quantity?: number;
  totalPrice?: number;
}
@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Organic Apples',
      description: 'Fresh and juicy organic apples from local farms.',
      price: 120,
      type: 'fruits',
      measureType: 'kg',
      imageUrl: 'https://www.shimlafarms.com/cdn/shop/products/Redapple3.png?v=1675785288&width=1445',
      isNeeded: true
    },
    {
      id: 2,
      name: 'Fresh Carrots',
      description: 'Crisp and sweet carrots grown with love.',
      price: 90,
      type: 'vegetables',
      measureType: 'kg',
      imageUrl: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/usa-new-york-city-carrots-for-sale-tetra-images.jpg',
      isNeeded: true
    },
    {
      id: 3,
      name: 'Dairy Milk',
      description: 'Pure and fresh milk from grass-fed cows.',
      price: 50,
      type: 'dairy',
      measureType: 'L',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLbH-mTn8P736RPcSHkV16rhLF1vZvStQMg&s',
      isNeeded: true
    },
    {
      id: 4,
      name: 'Fresh Strawberries',
      description: 'Sweet and juicy strawberries freshly picked.',
      price: 150,
      type: 'fruits',
      measureType: 'kg',
      imageUrl: 'https://d3fwccq2bzlel7.cloudfront.net/Pictures/480xany/5/8/8/35588_2_1203853_e.jpg',
      isNeeded: true
    },
    {
      id: 5,
      name: 'Organic Broccoli',
      description: 'Healthy and fresh organic broccoli.',
      price: 80,
      type: 'vegetables',
      measureType: 'kg',
      imageUrl: 'https://s.alicdn.com/@sc04/kf/A4f577b2659534d3292fd568d359d9cc5j.jpg_300x300.jpg',
      isNeeded: true
    },
    {
      id: 6,
      name: 'Fresh Oranges',
      description: 'Fresh and juicy oranges.',
      price: 200,
      type: 'fruits',
      measureType: 'kg',
      imageUrl: 'https://tacomaboys.com/wp-content/uploads/2020/04/TB-27-8701-1024x588.jpg',
      isNeeded: false
    },
    {
      id: 7,
      name: 'Organic Tomatoes',
      description: 'Ripe and juicy organic tomatoes.',
      price: 70,
      type: 'vegetables',
      measureType: 'kg',
      imageUrl: 'https://i.cdn.newsbytesapp.com/images/l29720230821154142.jpeg',
      isNeeded: true
    },
    {
      id: 8,
      name: 'Fresh Spinach',
      description: 'Leafy green spinach, rich in nutrients.',
      price: 60,
      type: 'vegetables',
      measureType: 'kg',
      imageUrl: 'https://www.bigbasket.com/media/uploads/p/xxl/40200226_1-farmogo-spinach-hydroponically-grown.jpg',
      isNeeded: true
    },
    {
      id: 9,
      name: 'Grapes',
      description: 'Sweet and juicy organic grapes.',
      price: 140,
      type: 'fruits',
      measureType: 'kg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Kyoho-grape.jpg',
      isNeeded: false
    }
  ];
  constructor(private toastr: ToastrService) { }

  filteredProducts: Product[] = [];
  selectedType: string = '';
  searchText: string = '';
  isRestockEnabled: boolean = false;

  ngOnInit() {
    this.filterProducts();
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      return product.isNeeded &&
        (!this.selectedType || product.type === this.selectedType) &&
        (!this.searchText || product.name.toLowerCase().includes(this.searchText.toLowerCase()));
    });
    this.validateQuantities();
  }

  validateQuantities() {
    this.isRestockEnabled = this.filteredProducts.some(product => product?.selected && product?.quantity && product.quantity > 0);
  }

  updateTotalPrice(product: Product) {
    if (product.quantity && product.quantity > 0) {
      product.totalPrice = product.quantity * product.price;
    } else {
      product.totalPrice = 0;
    }
    this.validateQuantities();
  }

  addToRestockList() {
    const restockProducts = this.filteredProducts.filter(product => product?.selected && product?.quantity && product.quantity > 0);
    console.log('Restocking the following products:', restockProducts);
    // Implement the restock logic here
  }

  handleProductSelectionChange(product: Product) {
    if (!product.selected) {
      // Reset quantity if product is unselected
      product.quantity = undefined; // or null, depending on your preference
      // Recalculate total price and revalidate quantities
      this.updateTotalPrice(product);
      this.validateQuantities();
    }
  }

  onQuantityChange(product: Product, event: Event) {
    const input = event.target as HTMLInputElement;
    let value = parseInt(input.value, 10);
    if (product.selected) {
      if (!isNaN(value) && value >= 1 && value <= 50) {
        product.quantity = value;
      } else {
        this.toastr.warning('Quantity must be between 1 and 50');
        // value = Math.max(1, Math.min(value, 50));
        value = 0;
        product.quantity = value;
        input.value = value.toString();
      }
      this.updateTotalPrice(product);
      this.validateQuantities();
    } else {
      this.toastr.warning('Select that product first');
      input.value = product.quantity?.toString() || '0'; // Revert to previous quantity if not selected
    }
  }
}
