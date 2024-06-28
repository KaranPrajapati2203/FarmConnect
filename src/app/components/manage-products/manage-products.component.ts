import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  selectedQuantity: number;
  measureType: string;
  imageUrl: string;
}

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css'
})
export class ManageProductsComponent {
  products: Product[] = [];
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    type: '',
    selectedQuantity: 0,
    measureType: '',
    imageUrl: ''
  };
  editProduct: Product | null = null;
  nextProductId: number = 1;
  measureTypes: string[] = ['kg', 'L', 'dozen']; // Example measure types

  constructor() { }

  ngOnInit(): void {
    // Initial data
    this.products = [
      {
        id: 1,
        name: 'Organic Apples',
        description: 'Fresh and juicy organic apples from local farms.',
        price: 120,
        type: 'fruits',
        selectedQuantity: 0,
        measureType: 'kg',
        imageUrl: 'https://www.shimlafarms.com/cdn/shop/products/Redapple3.png?v=1675785288&width=1445'
      },
      {
        id: 2,
        name: 'Fresh Carrots',
        description: 'Crisp and sweet carrots grown with love.',
        price: 90,
        type: 'vegetables',
        selectedQuantity: 0,
        measureType: 'kg',
        imageUrl: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/usa-new-york-city-carrots-for-sale-tetra-images.jpg'
      },
      {
        id: 3,
        name: 'Dairy Milk',
        description: 'Pure and fresh milk from grass-fed cows.',
        price: 50,
        type: 'dairy',
        selectedQuantity: 0,
        measureType: 'L',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLbH-mTn8P736RPcSHkV16rhLF1vZvStQMg&s'
      },
      {
        id: 4,
        name: 'Fresh Strawberries',
        description: 'Sweet and juicy strawberries freshly picked.',
        price: 150,
        type: 'fruits',
        selectedQuantity: 0,
        measureType: 'kg',
        imageUrl: 'https://d3fwccq2bzlel7.cloudfront.net/Pictures/480xany/5/8/8/35588_2_1203853_e.jpg'
      },
      {
        id: 5,
        name: 'Organic Broccoli',
        description: 'Healthy and fresh organic broccoli.',
        price: 80,
        type: 'vegetables',
        selectedQuantity: 0,
        measureType: 'kg',
        imageUrl: 'https://s.alicdn.com/@sc04/kf/A4f577b2659534d3292fd568d359d9cc5j.jpg_300x300.jpg'
      },
      {
        id: 6,
        name: 'Fresh Oranges',
        description: 'Fresh and juicy oranges.',
        price: 200,
        type: 'fruits',
        selectedQuantity: 0,
        measureType: 'kg',
        imageUrl: 'https://tacomaboys.com/wp-content/uploads/2020/04/TB-27-8701-1024x588.jpg'
      },
      {
        id: 7,
        name: 'Organic Tomatoes',
        description: 'Ripe and juicy organic tomatoes.',
        price: 70,
        type: 'vegetables',
        selectedQuantity: 0,
        measureType: 'kg',
        imageUrl: 'https://i.cdn.newsbytesapp.com/images/l29720230821154142.jpeg'
      },
      {
        id: 8,
        name: 'Fresh Spinach',
        description: 'Leafy green spinach, rich in nutrients.',
        price: 60,
        type: 'vegetables',
        selectedQuantity: 0,
        measureType: 'kg',
        imageUrl: 'https://www.bigbasket.com/media/uploads/p/xxl/40200226_1-farmogo-spinach-hydroponically-grown.jpg'
      },
      {
        id: 9,
        name: 'Grapes',
        description: 'Sweet and juicy organic grapes.',
        price: 140,
        type: 'fruits',
        selectedQuantity: 0,
        measureType: 'kg',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Kyoho-grape.jpg'
      }
    ];
    this.nextProductId = this.products.length + 1;
  }

  addProduct(form: any): void {
    if (form.invalid) {
      return;
    }
    this.newProduct.id = this.nextProductId++;
    this.products.push({ ...this.newProduct });
    this.newProduct = { id: 0, name: '', description: '', price: 0, type: '', selectedQuantity: 0, measureType: '', imageUrl: '' };
    form.resetForm();
  }

  editProductDetails(product: Product): void {
    this.editProduct = { ...product };
  }

  saveProduct(form: any): void {
    if (form.invalid) {
      return;
    } else if (this.editProduct && this.editProduct.price > 0) {
      const index = this.products.findIndex(p => p.id === this.editProduct!.id);
      this.products[index] = { ...this.editProduct };
      this.editProduct = null;
    } else {
      alert("Product price must be greater than zero.");
    }
  }


  deleteProduct(productId: number): void {
    this.products = this.products.filter(p => p.id !== productId);
  }

  cancelEdit(): void {
    this.editProduct = null;
  }
}
