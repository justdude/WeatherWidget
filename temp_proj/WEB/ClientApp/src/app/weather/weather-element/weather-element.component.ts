import { Component, Input, OnInit } from '@angular/core';
import { WeatherInfo } from 'src/app/services/fetching-weather.service';

@Component({
  selector: 'app-weather-element',
  templateUrl: './weather-element.component.html',
  styleUrls: ['./weather-element.component.css']
})
export class WeatherElementComponent implements OnInit {
  @Input()
  public info:WeatherInfo;

  constructor() { }

  ngOnInit() {
  }

  //TODO: parse datetime during data fetching
  public getDay(date:string):string{
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date(date);
    var dayName = days[d.getDay()];
    return dayName;
  }
  public getMonth(month:number):string{
    const monthNames = 
    ["January",    "February", 
    "March", "April","May", 
    "June", "July", "August", 
    "September", "October", "November", "December"
    ];

    return monthNames[month];
  }

  public getDate(date:string):Date{
    var d = new Date(date);
    return d;
  }

  public getDateFormat(date:string):string{
    var d = new Date(date);
    var res = `${this.getMonth(d.getMonth())} ${d.getDate()}`; 
    return res;
  }

}
