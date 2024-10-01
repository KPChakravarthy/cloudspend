import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { LineComponent } from '../charts/line/line.component';
import { DonutComponent } from '../charts/donut/donut.component';
import jsonData from '../../../mockData.json';
import { CloudSpendData } from './types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, LineComponent, DonutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  data: CloudSpendData = jsonData;

  spendHistoryLast12Months = this.getSpendHistoryLast12Months();
  crashFreeSessionsGraph = this.getCrashFreeSessionsGraph();

  spendByService = this.data.spendByService.map((service, i) => ({ value: service.spend, name: service.service, color: this.getColor(i) }));
  spendByEnvironment = this.data.spendByEnvironment.map((env, i) => ({ value: env.spend, name: env.environment, color: this.getColor(i) }));

  getSpendHistoryLast12Months() {
    return {
      categories: this.data.spendHistoryLast12Months.map((item) => item.month),
      values: this.data.spendHistoryLast12Months.map((item) => item.spend),
    };
  }

  getCrashFreeSessionsGraph() {
    return {
      categories: this.data.crashFreeSessionsGraph.map((item) => item.month),
      values: this.data.crashFreeSessionsGraph.map((item) => item.percentage),
    };
  }

  getColor(index: number): string {
    const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
    return colors[index % colors.length];
  }
}
