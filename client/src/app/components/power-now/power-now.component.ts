import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-power-now',
  templateUrl: './power-now.component.html',
  styleUrls: ['./power-now.component.css']
})
export class PowerNowComponent implements OnInit {

  public powernowChartLabels:string[] = ['Solar', 'Wind', 'hydro'];
  public powernowChartData:number[] = [55, 40, 5];
  public powernowChartType:string = 'line';
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
