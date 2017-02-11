import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumption-details',
  templateUrl: './consumption-details.component.html',
  styleUrls: ['./consumption-details.component.css']
})
export class ConsumptionDetailsComponent implements OnInit {

  public dateLong:string = Date().toString();

  constructor() { }

  ngOnInit() {
  }

}
