import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { SellersComponent } from './components/sellers/sellers.component';
import { CartComponent } from './components/cart/cart.component';
import { MyListingComponent } from './components/my-listing/my-listing.component';
import { MapComponent } from './components/map/map.component';

export const routes: Routes = [
    { path: "dashboard", component: DashboardComponent },
    { path: "", component: HomeComponent },
    { path: "products", component: ProductsComponent },
    { path: "sellers", component: SellersComponent },
    { path: "cart", component: CartComponent },
    { path: "my-listing", component: MyListingComponent },
    { path: 'market-location/:id', component: MapComponent }
];
