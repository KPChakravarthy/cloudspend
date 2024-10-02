import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { LineComponent } from '../charts/line/line.component';
import { DonutComponent } from '../charts/donut/donut.component';
import jsonData from '../../../mockData.json';
import { CloudSpendData } from './types';
import { MockDataService } from '../../mock-data.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

interface LineChartData {
  categories: string[] | undefined;
  values: number[] | undefined;
}
interface DoughnutChartData {
  value: number;
  name: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CardComponent,
    LineComponent,
    DonutComponent,
    CommonModule,
    LoaderComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isDataReady = false;

  data: CloudSpendData | null = null;
  spendHistoryLast12Months: LineChartData | null = null;
  crashFreeSessionsGraph: LineChartData | null = null;
  spendByService: DoughnutChartData[] = [];
  spendByEnvironment: DoughnutChartData[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.mockDataService.getMockData().subscribe(
      (data) => {
        this.data = data;
        this.spendHistoryLast12Months = this.getSpendHistoryLast12Months();
        this.crashFreeSessionsGraph = this.getCrashFreeSessionsGraph();
        this.spendByService = this.data?.spendByService.map((service, i) => ({
          value: service.spend,
          name: service.service,
          color: this.getColor(i),
        }));
        this.spendByEnvironment = this.data?.spendByEnvironment.map(
          (env, i) => ({
            value: env.spend,
            name: env.environment,
            color: this.getColor(i),
          })
        );
        this.isDataReady = true;
      },
      (error) => {
        console.error('Error fetching mock data:', error);
      }
    );
  }

  getSpendHistoryLast12Months() {
    return {
      categories: this.data?.spendHistoryLast12Months.map((item) => item.month),
      values: this.data?.spendHistoryLast12Months.map((item) => item.spend),
    };
  }

  getCrashFreeSessionsGraph() {
    return {
      categories: this.data?.crashFreeSessionsGraph.map((item) => item.month),
      values: this.data?.crashFreeSessionsGraph.map((item) => item.percentage),
    };
  }

  getColor(index: number): string {
    const colors = [
      '#5470c6',
      '#91cc75',
      '#fac858',
      '#ee6666',
      '#73c0de',
      '#3ba272',
      '#fc8452',
      '#9a60b4',
      '#ea7ccc',
    ];
    return colors[index % colors.length];
  }
}
