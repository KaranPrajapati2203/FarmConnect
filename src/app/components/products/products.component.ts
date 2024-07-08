import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { PRODUCT_TYPE_MAP } from '../../interfaces/product-type-map';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, InfiniteScrollModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  // products = [
  //   {
  //     name: 'Organic Apples',
  //     description: 'Fresh and juicy organic apples from local farms.',
  //     price: 120,
  //     type: 'fruits',
  //     selectedQuantity: 0,
  //     measureType: 'kg',
  //     imageUrl: 'https://www.shimlafarms.com/cdn/shop/products/Redapple3.png?v=1675785288&width=1445'
  //   },
  //   {
  //     name: 'Fresh Carrots',
  //     description: 'Crisp and sweet carrots grown with love.',
  //     price: 90,
  //     type: 'vegetables',
  //     selectedQuantity: 0,
  //     measureType: 'kg',
  //     imageUrl: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/usa-new-york-city-carrots-for-sale-tetra-images.jpg'
  //   },
  //   {
  //     name: 'Dairy Milk',
  //     description: 'Pure and fresh milk from grass-fed cows.',
  //     price: 50,
  //     type: 'dairy',
  //     selectedQuantity: 0,
  //     measureType: 'L', // Example measure type for dairy milk
  //     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLbH-mTn8P736RPcSHkV16rhLF1vZvStQMg&s'
  //   },
  //   {
  //     name: 'Fresh Strawberries',
  //     description: 'Sweet and juicy strawberries freshly picked.',
  //     price: 150,
  //     type: 'fruits',
  //     selectedQuantity: 0,
  //     measureType: 'kg',
  //     imageUrl: 'https://d3fwccq2bzlel7.cloudfront.net/Pictures/480xany/5/8/8/35588_2_1203853_e.jpg'
  //   },
  //   {
  //     name: 'Organic Broccoli',
  //     description: 'Healthy and fresh organic broccoli.',
  //     price: 80,
  //     type: 'vegetables',
  //     selectedQuantity: 0,
  //     measureType: 'kg',
  //     imageUrl: 'https://s.alicdn.com/@sc04/kf/A4f577b2659534d3292fd568d359d9cc5j.jpg_300x300.jpg'
  //   },
  //   {
  //     name: 'Fresh Oranges',
  //     description: 'Fresh and juicy oranges.',
  //     price: 200,
  //     type: 'fruits',
  //     selectedQuantity: 0,
  //     measureType: 'kg',
  //     imageUrl: 'https://tacomaboys.com/wp-content/uploads/2020/04/TB-27-8701-1024x588.jpg'
  //   },
  //   {
  //     name: 'Organic Tomatoes',
  //     description: 'Ripe and juicy organic tomatoes.',
  //     price: 70,
  //     type: 'vegetables',
  //     selectedQuantity: 0,
  //     measureType: 'kg',
  //     imageUrl: 'https://i.cdn.newsbytesapp.com/images/l29720230821154142.jpeg'
  //   },
  //   {
  //     name: 'Fresh Spinach',
  //     description: 'Leafy green spinach, rich in nutrients.',
  //     price: 60,
  //     type: 'vegetables',
  //     selectedQuantity: 0,
  //     measureType: 'kg',
  //     imageUrl: 'https://www.bigbasket.com/media/uploads/p/xxl/40200226_1-farmogo-spinach-hydroponically-grown.jpg'
  //   },
  //   {
  //     name: 'Grapes',
  //     description: 'Sweet and juicy organic grapes.',
  //     price: 140,
  //     type: 'fruits',
  //     selectedQuantity: 0,
  //     measureType: 'kg',
  //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Kyoho-grape.jpg'
  //   }
  // ];

  products: any[] = [];
  filteredProducts!: any[]; // Array to hold filtered products
  searchText: string = ''; // Variable to hold search input
  selectedType: string = ''; // Variable to hold selected type

  displayedProducts: any[] = []; // Array to hold products for the current view
  itemsPerLoad: number = 12;
  currentIndex: number = 0;

  constructor(private router: Router, private productService: ProductService, private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.productService.getProducts().subscribe((data: any) => {
    //   // console.log("data: " + JSON.stringify(data));
    //   this.products = data;
    //   this.filterProducts();
    // });
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.map((item: any) => ({
        productId: item.productId,
        productName: item.productName,
        productDescription: item.productDescription,
        productPrice: item.sellingPrice,
        productType: PRODUCT_TYPE_MAP[item.productTypeId] || 'unknown',
        productMeasureType: item.productMeasureType,
        productImage: item.productImage,
        selectedQuantity: 0
      }));
      this.filterProducts();
    });
  }

  filterProducts() {
    if (this.searchText.trim() !== '') {
      this.filteredProducts = this.products.filter(product => {
        const matchesSearch = product.productName.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesType = this.selectedType ? product.productType === this.selectedType : true;
        return matchesSearch && matchesType;
      });
    } else {
      this.filteredProducts = this.products.filter(product => {
        return this.selectedType ? product.productType === this.selectedType : true;
      });
    }
    this.resetDisplayProducts();
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

  increaseQuantity(product: any) {
    if (product.selectedQuantity < 50) {
      product.selectedQuantity += 0.25;
      product.selectedQuantity = parseFloat(product.selectedQuantity.toFixed(2)); // To avoid floating point issues
    }
  }

  decreaseQuantity(product: any) {
    if (product.selectedQuantity > 0) {
      product.selectedQuantity -= 0.25;
      product.selectedQuantity = parseFloat(product.selectedQuantity.toFixed(2)); // To avoid floating point issues
    }
  }

  isQuantityZero(product: any): boolean {
    return product.selectedQuantity === 0;
  }

  addToCart(product: any) {
    const userId = parseInt(localStorage.getItem('userid') || '0'); // Retrieve the user ID from local storage

    const cartItem = {
      userId: userId,
      productId: product.productId, // Assuming product has an id property
      quantity: product.selectedQuantity,
      // productName: product.name,
      // productDescription: product.description,
      // productPrice: product.price,
      // productMeasureType: product.measureType,
      // productImage: product.imageUrl
    };
    console.log('cart items data: ' + JSON.stringify(cartItem));
    this.cartService.addToCart(cartItem).subscribe(
      () => {
        this.toastr.success(`Added <b>${product.selectedQuantity} ${product.productMeasureType}</b> of "<b>${product.productName}</b>" to the cart.`);
        // Reset the selected quantity to 0 after adding to the cart
        product.selectedQuantity = 0;
      },
      (error: any) => {
        console.error('Failed to add to cart', error);
      }
    );
  }

}
