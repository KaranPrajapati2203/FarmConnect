import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import * as echarts from 'echarts';

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
        // console.log("data " + JSON.stringify(data));
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
    const categoryElement = document.getElementById('categoryChart') as HTMLDivElement;
    const categoryChart = echarts.init(categoryElement);

    const categoryLabels = this.productCategories.map(category => category.productTypeName);
    const categoryData = this.productCategories.map(category => category.productCount);

    const categoryOptions = {
      title: {
        text: 'Product Categories',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Product Categories',
          type: 'pie',
          radius: '50%',
          data: categoryData.map((value, index) => ({
            value,
            name: categoryLabels[index]
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            formatter: '{b}: {d}%'
          }
        }
      ],
      color: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'] // Example color palette
    };

    categoryChart.setOption(categoryOptions);
  }

  displayUserRegistrationChart(): void {
    const registrationElement = document.getElementById('registrationChart') as HTMLDivElement;
    const registrationChart = echarts.init(registrationElement);

    const registrationLabels = this.userRegistrationOverTime.map(item => item.registrationDay);
    const registrationData = this.userRegistrationOverTime.map(item => item.userCount);

    const registrationOptions = {
      title: {
        text: 'User Registration Over Time',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: registrationLabels,
        axisLabel: {
          formatter: (value: string) => echarts.format.formatTime('yyyy-MM-dd', value)
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: registrationData,
        type: 'line',
        smooth: true,
        label: {
          show: true,
          position: 'top'
        }
      }]
    };

    registrationChart.setOption(registrationOptions);
  }
  displayOrdersOverTimeChart(): void {
    const ordersElement = document.getElementById('ordersChart') as HTMLDivElement;
    const ordersChart = echarts.init(ordersElement);

    const orderLabels = this.ordersOverTime.map(item => item.orderDay);
    const orderData = this.ordersOverTime.map(item => item.orderCount);

    const ordersOptions = {
      title: {
        text: 'Orders Over Time',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: orderLabels,
        axisLabel: {
          formatter: (value: string) => echarts.format.formatTime('yyyy-MM-dd', value)
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: orderData,
        type: 'line',
        smooth: true,
        label: {
          show: true,
          position: 'top'
        }
      }]
    };

    ordersChart.setOption(ordersOptions);
  }
  displayRevenueByProductTypeChart(): void {
    const revenueElement = document.getElementById('revenueChart') as HTMLDivElement;
    const revenueChart = echarts.init(revenueElement);

    const productLabels = this.revenueByProductType.map(item => item.productTypeName);
    const revenueData = this.revenueByProductType.map(item => item.totalRevenue);

    const revenueOptions = {
      title: {
        text: 'Revenue by Product Type',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          let value = params[0].value;
          return `${params[0].axisValue}<br/>Revenue: ₹${value.toLocaleString('en-IN')}`;
        }
      },
      xAxis: {
        type: 'category',
        data: productLabels
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => `₹${value.toLocaleString('en-IN')}`
        }
      },
      series: [{
        data: revenueData,
        type: 'bar',
        itemStyle: {
          color: '#f0ad4e'
        },
        label: {
          show: true,
          position: 'top',
          formatter: (params: any) => `₹${params.value.toLocaleString('en-IN')}`
        }
      }]
    };

    revenueChart.setOption(revenueOptions);
  }

}
