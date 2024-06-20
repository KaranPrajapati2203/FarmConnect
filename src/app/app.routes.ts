import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { SellersComponent } from './components/sellers/sellers.component';

export const routes: Routes = [
    { path: "dashboard", component: DashboardComponent },
    { path: "", component: HomeComponent },
    { path: "products", component: ProductsComponent },
    { path: "sellers", component: SellersComponent }
];
