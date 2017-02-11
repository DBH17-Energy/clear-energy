import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sources-map',
  templateUrl: './sources-map.component.html',
  styleUrls: ['./sources-map.component.css']
})
export class SourcesMapComponent implements OnInit {
  public locations:any[] = [
    {lat: 53.2194, lng: 6.5665, size:10000, color: "#33dabd"},
    {lat: 53.2194, lng: 5.9865, size:8000, color: "#33dabd"},
    {lat: 52.8294, lng: 6.5865, size:12000, color: "#33dabd"},
    {lat: 51.8294, lng: 6.5865, size:12000, color: "#33dabd"},
    {lat: 49.9294, lng: 5.5865, size:12000, color: "#33dabd"},
    {lat: 51.2294, lng: 5.6865, size:12000, color: "#33dabd"}
  ];
  public lat: number = 52.23;
  public lng: number = 4.55;

  constructor() { }

  ngOnInit() {
  }

}
