import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  totalUsers!: number;
  totalProducts!: number;
  totalOrders!: number;
  totalMarketplaces!: number;

  constructor() { }

  ngOnInit(): void {
    // Initialize with static data
    this.totalUsers = 120;
    this.totalProducts = 58;
    this.totalOrders = 34;
    this.totalMarketplaces = 10;
  }
}
