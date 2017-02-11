import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-consumption-details',
  templateUrl: './consumption-details.component.html',
  styleUrls: ['./consumption-details.component.css']
})
export class ConsumptionDetailsComponent implements OnInit {

  public dateLong:string = Date().toString();

  constructor(private _router: Router) { }

  public overview() {
    this._router.navigate(['./overview'])
  }

  ngOnInit() {
  }

}
