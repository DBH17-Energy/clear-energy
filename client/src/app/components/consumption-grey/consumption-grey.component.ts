import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumption-grey',
  templateUrl: './consumption-grey.component.html',
  styleUrls: ['./consumption-grey.component.css']
})
export class ConsumptionGreyComponent implements OnInit {
  // Doughnut
  public doughnutChartLabels:string[] = ['Green', 'Grey'];
  public doughnutChartData:number[] = [65, 35];
  public doughnutChartType:string = 'doughnut';
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
