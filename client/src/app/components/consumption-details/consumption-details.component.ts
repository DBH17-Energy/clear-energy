import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-consumption-details',
  templateUrl: './consumption-details.component.html',
  styleUrls: ['./consumption-details.component.css']
})
export class ConsumptionDetailsComponent implements OnInit {

  public dateLong:string = (new Date()).toLocaleString();
  public daysLeft:number = this.getMonthDaysLeft();
  public daysPercentage:number = this.getPercentage();

  getMonthDaysLeft(){
    var date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() - date.getDate();
  }

  getTotalDays() {
    var date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() - date.getDate() - new Date(date.getFullYear(), date.getMonth(), 0).getDate() - date.getDate();
  }

  getPercentage() {
    return this.getMonthDaysLeft() - this.getTotalDays();
  }

  constructor(private _router: Router) { }

  public overview() {
    this._router.navigate(['./overview'])
  }

  ngOnInit() {
  }

}
