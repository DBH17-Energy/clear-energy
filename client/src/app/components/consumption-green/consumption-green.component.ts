import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumption-green',
  templateUrl: './consumption-green.component.html',
  styleUrls: ['./consumption-green.component.css']
})
export class ConsumptionGreenComponent implements OnInit {
  // barchart
  public greenChartLabels:string[] = ['Solar', 'Wind', 'hydro'];
  public greenChartData:number[] = [55, 40, 5];
  public greenChartType:string = 'doughnut';  //'horizontalBar';

  // didn't get the barcharts working
  //public greenChartOptions:string = JSON.stringify({responsive: true,
  //  scales: {yAxes: {display: true, ticks: {beginAtZero: true, max: 100}}
  //  }});


  public backgroundColor:any = {backgroundColor: ["#33dabd", "#9575cd"]};

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
