import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-power-now',
  templateUrl: './power-now.component.html',
  styleUrls: ['./power-now.component.css']
})
export class PowerNowComponent implements OnInit {

  public powernowChartLabels:string[] = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
  public powernowChartData:number[] = [5, 10, 15, 20, 32, 40, 100, 180, 100, 150, 100, 90,120, 60, 90, 200, 400, 420, 390, ];
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
