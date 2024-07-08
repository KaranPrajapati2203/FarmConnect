import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

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
    this.displayCharts();
  }

  displayCharts(): void {
    const doughnutCtx = document.getElementById('doughnutChart') as HTMLCanvasElement;
    const barCtx = document.getElementById('barChart') as HTMLCanvasElement;

    new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Active Users', 'Inactive Users'],
        datasets: [{
          label: 'User Distribution',
          data: [100, 20],
          backgroundColor: ['#42A5F5', '#FF6384'],
          hoverBackgroundColor: ['#64B5F6', '#FF7395']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Available Products', 'Out of Stock'],
        datasets: [{
          label: 'Product Inventory',
          data: [50, 8],
          backgroundColor: ['#66BB6A', '#FFCA28'],
          hoverBackgroundColor: ['#81C784', '#FFD54F']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
