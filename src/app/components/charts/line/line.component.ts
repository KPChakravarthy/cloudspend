import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-line',
  standalone: true,
  imports: [],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss',
})
export class LineComponent {
  @Input() data: any;

  private chartInstance: any;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.initChart();
  }

  private initChart(): void {
    const element = this.el.nativeElement.querySelector(
      '#line-chart-container'
    );
    this.chartInstance = echarts.init(element);

    const options = {
      xAxis: {
        type: 'category',
        data: this.data?.categories || [],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.data?.values || [],
          type: 'line',
          smooth: false,
          lineStyle: {
            color: '#ff5722',
            width: 3,
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}',
      },
    };

    this.chartInstance.setOption(options);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  }
}
