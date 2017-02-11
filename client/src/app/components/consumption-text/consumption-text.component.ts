import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumption-text',
  templateUrl: './consumption-text.component.html',
  styleUrls: ['./consumption-text.component.css']
})
export class ConsumptionTextComponent implements OnInit {

  public month:string = "February";
  public kwh:number = 140;

  constructor() { }

  ngOnInit() {
  }

}
