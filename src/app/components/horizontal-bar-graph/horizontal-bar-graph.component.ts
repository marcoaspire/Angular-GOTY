import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-horizontal-bar-graph',
  templateUrl: './horizontal-bar-graph.component.html',
  styles:[]
})
export class HorizontalBarGraphComponent implements OnInit,OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() labels!:string[];
  @Input() data!:number[];

  @Input() barChartData: ChartData<'bar'> = {
    labels: [
    //  '2021', '2022','2023','2024','2025'
    ],
    datasets:[
      //{ data: [ 200, 300,400,300, 100 ], label: 'Carros', backgroundColor: 'blue' }
    ]
  }


  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';
  public interval:any;
  // public barChartType: string = 'horizontalBar';
  constructor() { 

    // this.interval=setInterval(()=>{
    //   this.randomize();
    //   console.log("si");
      
    // },2000);



  }
  ngOnDestroy(): void {
    //clearInterval(this.interval);
    
  }

  ngOnInit(): void {    
  }
    // events
    public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
      //console.log(event, active);

      console.log(this.barChartData.datasets[0].data[0]);
      
    }

    public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
      console.log(event, active);
    }
    public randomize(): void {

      // Only Change 3 values
      //serie A
      this.barChartData.datasets[0].data = [
        Math.round(Math.random() * 100),
        59,
        80,
        Math.round(Math.random() * 100),
        56,
        Math.round(Math.random() * 100),
        40 ];

      this.chart?.update();
    }
  

}
