import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-donut',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donut.component.html',
  styleUrl: './donut.component.scss',
})
export class DonutComponent {
    @Input() data: any;
    @Input() title: string;
    private chartInstance: any;  
    constructor(private el: ElementRef) {
        this.title = "";
    }
  
    ngOnInit(): void {
      this.initChart();
    }
  
    private initChart(): void {
      const element = this.el.nativeElement.querySelector('#donut-chart-container');
      this.chartInstance = echarts.init(element);
  
      const options = {
        tooltip: {
          trigger: 'item',
          z: '1004',
        },
        legend: {
          show: false
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 0,
              borderColor: '#fff',
              borderWidth: 0
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.data.map((item: any) => ({
                name: item.name,
                value: item.value,
                itemStyle: { color: item.color }
              })),
          }
        ]
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
