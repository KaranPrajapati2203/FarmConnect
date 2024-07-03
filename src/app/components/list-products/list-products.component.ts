import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { PRODUCT_TYPE_MAP } from '../../interfaces/product-type-map';

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
  // products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Organic Apples',
  //     description: 'Fresh and juicy organic apples from local farms.',
  //     price: 120,
  //     type: 'fruits',
  //     measureType: 'kg',
  //     imageUrl: 'https://www.shimlafarms.com/cdn/shop/products/Redapple3.png?v=1675785288&width=1445',
  //     isNeeded: true
  //   },
  //   {
  //     id: 2,
  //     name: 'Fresh Carrots',
  //     description: 'Crisp and sweet carrots grown with love.',
  //     price: 90,
  //     type: 'vegetables',
  //     measureType: 'kg',
  //     imageUrl: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/usa-new-york-city-carrots-for-sale-tetra-images.jpg',
  //     isNeeded: true
  //   },
  //   {
  //     id: 3,
  //     name: 'Dairy Milk',
  //     description: 'Pure and fresh milk from grass-fed cows.',
  //     price: 50,
  //     type: 'dairy',
  //     measureType: 'L',
  //     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLbH-mTn8P736RPcSHkV16rhLF1vZvStQMg&s',
  //     isNeeded: true
  //   },
  //   {
  //     id: 4,
  //     name: 'Fresh Strawberries',
  //     description: 'Sweet and juicy strawberries freshly picked.',
  //     price: 150,
  //     type: 'fruits',
  //     measureType: 'kg',
  //     imageUrl: 'https://d3fwccq2bzlel7.cloudfront.net/Pictures/480xany/5/8/8/35588_2_1203853_e.jpg',
  //     isNeeded: true
  //   },
  //   {
  //     id: 5,
  //     name: 'Organic Broccoli',
  //     description: 'Healthy and fresh organic broccoli.',
  //     price: 80,
  //     type: 'vegetables',
  //     measureType: 'kg',
  //     imageUrl: 'https://s.alicdn.com/@sc04/kf/A4f577b2659534d3292fd568d359d9cc5j.jpg_300x300.jpg',
  //     isNeeded: true
  //   },
  //   {
  //     id: 6,
  //     name: 'Fresh Oranges',
  //     description: 'Fresh and juicy oranges.',
  //     price: 200,
  //     type: 'fruits',
  //     measureType: 'kg',
  //     imageUrl: 'https://tacomaboys.com/wp-content/uploads/2020/04/TB-27-8701-1024x588.jpg',
  //     isNeeded: false
  //   },
  //   {
  //     id: 7,
  //     name: 'Organic Tomatoes',
  //     description: 'Ripe and juicy organic tomatoes.',
  //     price: 70,
  //     type: 'vegetables',
  //     measureType: 'kg',
  //     imageUrl: 'https://i.cdn.newsbytesapp.com/images/l29720230821154142.jpeg',
  //     isNeeded: true
  //   },
  //   {
  //     id: 8,
  //     name: 'Fresh Spinach',
  //     description: 'Leafy green spinach, rich in nutrients.',
  //     price: 60,
  //     type: 'vegetables',
  //     measureType: 'kg',
  //     imageUrl: 'https://www.bigbasket.com/media/uploads/p/xxl/40200226_1-farmogo-spinach-hydroponically-grown.jpg',
  //     isNeeded: true
  //   },
  //   {
  //     id: 9,
  //     name: 'Grapes',
  //     description: 'Sweet and juicy organic grapes.',
  //     price: 140,
  //     type: 'fruits',
  //     measureType: 'kg',
  //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Kyoho-grape.jpg',
  //     isNeeded: false
  //   }
  // ];
  constructor(private toastr: ToastrService, private productService: ProductService) { }

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedType: string = '';
  searchText: string = '';
  isRestockEnabled: boolean = false;

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        // console.log('getting data: '+JSON.stringify(data));
        this.products = data.map(item => ({
          id: item.productId,
          name: item.productName,
          description: item.productDescription,
          price: item.productPrice,
          type: PRODUCT_TYPE_MAP[item.productTypeId] || 'unknown', // Map productTypeId to type string
          measureType: item.productMeasureType,
          imageUrl: item.productImage,
          isNeeded: item.isNeeded
        }));
        this.filterProducts();
      },
      (error: any) => {
        this.toastr.error('Failed to fetch products', 'Error');
        console.error('Error fetching products:', error);
      }
    );
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
    const userId = localStorage.getItem('userid'); // Get userId from local storage

    const listings = restockProducts.map(product => ({
      sellerId: userId,
      productId: product.id,
      listingQuantity: product.quantity,
      productMeasureType: product.measureType
    }));
    // console.log("inside restock: " + JSON.stringify(listings));
    listings.forEach(listing => {
      this.productService.addProductListing(listing).subscribe(
        (response: any) => {
          this.toastr.success('Product listed successfully', 'Success');
        },
        (error: any) => {
          this.toastr.error('Failed to list product', 'Error');
          console.error('Error listing product:', error);
        }
      );
    });

     // Uncheck all checkboxes and reset quantities
     this.filteredProducts.forEach(product => {
      product.selected = false;
      product.quantity = undefined;
      product.totalPrice = 0;
    });

    this.validateQuantities();
  }

  handleProductSelectionChange(product: Product) {
    if (!product.selected) {
      product.quantity = undefined;
      this.updateTotalPrice(product);
    }
    this.validateQuantities();
  }

  onQuantityChange(product: Product, event: Event) {
    const input = event.target as HTMLInputElement;
    let value = parseFloat(input.value);
    if (product.selected) {
      if (!isNaN(value) && value >= 1 && value <= 50) {
        product.quantity = value;
      } else {
        this.toastr.warning('Quantity must be between 1 and 50');
        value = 0;
        product.quantity = value;
        input.value = value.toString();
      }
      this.updateTotalPrice(product);
    } else {
      this.toastr.warning('Select that product first');
      input.value = product.quantity?.toString() || '0';
    }
    this.validateQuantities();
  }

  getTotalPrice(): number {
    return this.filteredProducts.reduce((total, product) => {
      if (product.selected && product.totalPrice) {
        return total + product.totalPrice;
      }
      return total;
    }, 0);
  }
}
