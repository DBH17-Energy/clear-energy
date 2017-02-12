import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-consumption-details',
  templateUrl: './consumption-details.component.html',
  styleUrls: ['./consumption-details.component.css']
})
export class ConsumptionDetailsComponent implements OnInit {

  private dateLong:string;
  private daysLeft:number = this.getMonthDaysLeft();
  private daysPercentage:number = this.getPercentage();
  private username: string;

  constructor(private _router: Router) { }

  ngOnInit() {
    var storage = JSON.parse(localStorage.getItem('currentUser'));
    if (storage !== null) {
      this.username = storage.user.username;

      this.updateDate();
      setInterval(() => { this.updateDate();}, 5000);
    } else {
      this.username =  "john";
    }
  }

  private overview() {
    this._router.navigate(['./overview'])
  }

  private updateDate() {
    this.dateLong = (new Date()).toLocaleString();
  }

  private getMonthDaysLeft(){
    var date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() - date.getDate();
  }

  private getTotalDays() {
    var date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() - date.getDate() - new Date(date.getFullYear(), date.getMonth(), 0).getDate() - date.getDate();
  }

  private getPercentage() {
    return this.getMonthDaysLeft() - this.getTotalDays();
  }

}
