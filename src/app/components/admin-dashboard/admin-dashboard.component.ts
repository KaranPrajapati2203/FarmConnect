import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { AdminService } from '../../services/admin.service';
import 'chartjs-adapter-date-fns';
import 'chartjs-plugin-datalabels';

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
  productCategories: any[] = [];
  userRegistrationOverTime: any[] = [];
  productListingsBySellers: any[] = [];
  ordersOverTime: any[] = [];
  revenueByProductType: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchDashboardData();
  }
  fetchDashboardData(): void {
    this.adminService.getDashboardData().subscribe({
      next: (data: any) => {
        console.log("data " + JSON.stringify(data));
        this.totalUsers = data.totalUsers;
        this.totalProducts = data.totalProducts;
        this.totalOrders = data.totalOrders;
        this.totalMarketplaces = data.totalMarketplaces;
        this.productCategories = data.productCategories;
        this.userRegistrationOverTime = data.userRegistrationOverTime;
        this.productListingsBySellers = data.productListingsBySellers;
        this.ordersOverTime = data.ordersOverTime;
        this.revenueByProductType = data.revenueByProductType;
        this.displayCharts();
      },
      error: (err: any) => {
        console.error('Error fetching dashboard data', err);
      }
    });
  }
  displayCharts(): void {
    this.displayCategoryChart();
    this.displayUserRegistrationChart();
    // this.displayProductListingsChart();
    this.displayOrdersOverTimeChart();
    this.displayRevenueByProductTypeChart();
  }
  displayCategoryChart(): void {
    const categoryCtx = document.getElementById('categoryChart') as HTMLCanvasElement;

    const categoryLabels = this.productCategories.map(category => category.productTypeName);
    const categoryData = this.productCategories.map(category => category.productCount);

    new Chart(categoryCtx, {
      type: 'pie',
      data: {
        labels: categoryLabels,
        datasets: [{
          label: 'Product Categories',
          data: categoryData,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF7395', '#64B5F6', '#FFD54F']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem: any) => {
                const dataset = tooltipItem.dataset;
                const label = dataset.label || '';
                const value = dataset.data[tooltipItem.dataIndex];
                const total = dataset.data.reduce((acc: number, val: number) => acc + val, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          },
          legend: {
            position: 'right',
            align: 'center'
          }
        }
      }
    });
  }
  displayUserRegistrationChart(): void {
    const registrationCtx = document.getElementById('registrationChart') as HTMLCanvasElement;

    const registrationLabels = this.userRegistrationOverTime.map(item => item.registrationMonth);
    const registrationData = this.userRegistrationOverTime.map(item => item.userCount);

    new Chart(registrationCtx, {
      type: 'line',
      data: {
        labels: registrationLabels,
        datasets: [{
          label: 'User Registration Over Time',
          data: registrationData,
          borderColor: '#3e95cd',
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month',
              displayFormats: {
                month: 'MMM yyyy'
              }
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Users'
            }
          }
        }
      }
    });
  }
  displayProductListingsChart(): void {
    const listingsCtx = document.getElementById('listingsChart') as HTMLCanvasElement;

    const sellerLabels = this.productListingsBySellers.map(item => item.sellerName);
    const listingsData = this.productListingsBySellers.map(item => item.listingCount);

    new Chart(listingsCtx, {
      type: 'bar',
      data: {
        labels: sellerLabels,
        datasets: [{
          label: 'Product Listings by Sellers',
          data: listingsData,
          backgroundColor: '#8e5ea2'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Sellers'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Listings'
            }
          }
        }
      }
    });
  }
  displayOrdersOverTimeChart(): void {
    const ordersCtx = document.getElementById('ordersChart') as HTMLCanvasElement;

    const orderLabels = this.ordersOverTime.map(item => item.orderMonth);
    const orderData = this.ordersOverTime.map(item => item.orderCount);

    new Chart(ordersCtx, {
      type: 'line',
      data: {
        labels: orderLabels,
        datasets: [{
          label: 'Orders Over Time',
          data: orderData,
          borderColor: '#3cba9f',
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month',
              displayFormats: {
                month: 'MMM yyyy'
              }
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Orders'
            }
          }
        }
      }
    });
  }
  displayRevenueByProductTypeChart(): void {
    const revenueCtx = document.getElementById('revenueChart') as HTMLCanvasElement;

    const productLabels = this.revenueByProductType.map(item => item.productTypeName);
    const revenueData = this.revenueByProductType.map(item => item.totalRevenue);

    new Chart(revenueCtx, {
      type: 'bar',
      data: {
        labels: productLabels,
        datasets: [{
          label: 'Revenue by Product Type',
          data: revenueData,
          backgroundColor: '#f0ad4e'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Product Types'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Total Revenue'
            }
          }
        }
      }
    });
  }


}
