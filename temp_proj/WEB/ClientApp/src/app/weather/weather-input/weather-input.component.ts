import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-weather-input',
  templateUrl: './weather-input.component.html',
  styleUrls: ['./weather-input.component.css']
})
export class WeatherInputComponent implements OnInit {
  @Output() onSearchEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.onSearch("London");
  }

  onSearch(value: string) {
    this.onSearchEvent.emit(value);
  }

}
