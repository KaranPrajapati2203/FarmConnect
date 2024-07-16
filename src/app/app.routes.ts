import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { SellersComponent } from './components/sellers/sellers.component';
import { CartComponent } from './components/cart/cart.component';
import { MyListingComponent } from './components/my-listing/my-listing.component';
import { MapComponent } from './components/map/map.component';
import { authGuard } from '../app/guards/auth.guard'; // Adjust the path as necessary
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "admin-dashboard", component: AdminDashboardComponent, canActivate: [authGuard] },
    { path: "products", component: ProductsComponent, canActivate: [authGuard] },
    { path: "sellers", component: SellersComponent, canActivate: [authGuard] },
    { path: "cart", component: CartComponent, canActivate: [authGuard] },
    { path: "my-listing", component: MyListingComponent, canActivate: [authGuard] },
    { path: 'market-location/:id', component: MapComponent, canActivate: [authGuard] },
    { path: 'manage-products', component: ManageProductsComponent, canActivate: [authGuard] },
    { path: 'list-products', component: ListProductsComponent, canActivate: [authGuard] },
    { path: 'show-all-markets', component: MapComponent, canActivate: [authGuard] },
    { path: 'order-history', component: OrderHistoryComponent, canActivate: [authGuard] }
];
