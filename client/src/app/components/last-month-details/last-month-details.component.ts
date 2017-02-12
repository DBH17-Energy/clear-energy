import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-last-month-details',
  templateUrl: './last-month-details.component.html',
  styleUrls: ['./last-month-details.component.css']
})
export class LastMonthDetailsComponent implements OnInit {
  // Doughnut
  public doughnutChartLabels:string[] = ['Green'];
  public doughnutChartData:number[] = [65];
  public doughnutChartType:string = 'doughnut';
  public backgroundColor:any = [{backgroundColor: ["#33dabd", "#9575cd"]}];
  public lastMonth:string = "January";

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  toAction() {
    this._router.navigate(['./action'])
  }

}
