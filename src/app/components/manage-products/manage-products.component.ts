import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ProductService } from '../../services/product.service';
import { PRODUCT_TYPE_MAP } from '../../interfaces/product-type-map';

interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  buyingPrice: number;
  sellingPrice: number;
  productTypeId: number;
  productMeasureType: string;
  productImage: string;
  maxQuantity: number;
  availableQuantity: number;
  isNeeded: boolean;
  isAvailable: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css'
})
export class ManageProductsComponent {
  products: Product[] = [];
  newProduct: Product = {} as Product;
  editProduct: Product | null = null;
  newProductForm!: FormGroup; // FormGroup for adding new product
  productForm!: FormGroup;
  measureTypes: string[] = ['kg', 'L', 'dozen']; // Example measure types, adjust as needed
  productTypeMap = PRODUCT_TYPE_MAP; // Using the product type map
  formChangesMade = false; // Track form changes
  originalProductData: Product | null = null; // Store original product data for comparison


  constructor(private adminService: AdminService, private productService: ProductService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.newProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      buyingPrice: ['', [Validators.required, Validators.min(1)]],
      sellingPrice: ['', [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
      measureType: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      buyingPrice: ['', [Validators.required, Validators.min(1)]],
      sellingPrice: ['', [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
      measureType: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });

    // Subscribe to form changes to track if any changes are made
    this.productForm.valueChanges.subscribe(() => {
      this.formChangesMade = true;
    });

    this.loadProducts();
  }
  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data.map((product: any) => ({
          ...product,
          productTypeName: PRODUCT_TYPE_MAP[product.productTypeId] || 'Unknown Type'
        }));
      },
      (error: any) => {
        console.error('Error fetching products', error);
      }
    );
  }
  addProduct(form: any): void {
    if (form.valid) {
      this.adminService.createProduct(this.newProduct).subscribe(
        (response: any) => {
          console.log('Product added successfully', response);
          this.resetForm(form);
          this.loadProducts();
        },
        (error: any) => {
          console.error('Error adding product', error);
        }
      );
    } else {
      form.markAllAsTouched();
    }
  }

  editProductDetails(product: Product): void {
    // Fetch the product details by ID
    this.adminService.getProductById(product.productId).subscribe(
      (data: Product) => {
        this.editProduct = { ...data };
        this.populateFormWithData(this.editProduct); // Populate form with fetched data
      },
      (error: any) => {
        console.error('Error fetching product details', error);
      }
    );
  }
  private populateFormWithData(product: Product): void {
    this.productForm.patchValue({
      name: product.productName,
      description: product.productDescription,
      buyingPrice: product.buyingPrice,
      sellingPrice: product.sellingPrice,
      type: product.productTypeId.toString(), // Assuming type is stored as string in the form
      measureType: product.productMeasureType,
      imageUrl: product.productImage
    });

    this.formChangesMade = false; // Reset form changes tracking after populating form
  }
  saveProduct(form: any): void {
    if (form.valid && this.editProduct) {
      this.adminService.updateProduct(this.editProduct.productId, this.editProduct).subscribe(
        (response: any) => {
          console.log('Product updated successfully', response);
          this.cancelEdit();
          this.loadProducts();
          this.formChangesMade = false; // Reset form changes tracking after saving
        },
        (error: any) => {
          console.error('Error updating product', error);
        }
      );
    }
    else {
      form.markAllAsTouched();
    }
  }


  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService.deleteProduct(productId).subscribe(
        (response: any) => {
          console.log('Product deleted successfully', response);
          this.loadProducts();
        },
        (error: any) => {
          console.error('Error deleting product', error);
        }
      );
    }
  }
  private resetForm(form: FormGroup): void {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key)?.setErrors(null);
    });
    this.newProduct = {} as Product;
    this.editProduct = null;
    this.formChangesMade = false;
  }
  cancelEdit(): void {
    this.editProduct = null;
    this.formChangesMade = false; // Reset form changes tracking on cancel
  }
}
