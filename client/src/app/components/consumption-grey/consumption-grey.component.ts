import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumption-grey',
  templateUrl: './consumption-grey.component.html',
  styleUrls: ['./consumption-grey.component.css']
})
export class ConsumptionGreyComponent implements OnInit {
  // Doughnut
  public greyChartLabels:string[] = ['Nuclear', 'Coal'];
  public greyChartData:number[] = [65, 35];
  public greyChartType:string = 'doughnut';
  //public greyChartOptions:any = [{responsive: true,
  //                                scales: {xAxes: [{display: true, scaleLabel: {display: true, labelString: 'Month'}}],
  //                                         yAxes: [{display: true, ticks: {beginAtZero: true, steps: 10, stepValue: 5, max: 100}}]
  //                              }}];
  public backgroundColor:any = [{backgroundColor: ["#33dabd", "#9575cd"]}];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor() { }

  ngOnInit() {
  }

}
