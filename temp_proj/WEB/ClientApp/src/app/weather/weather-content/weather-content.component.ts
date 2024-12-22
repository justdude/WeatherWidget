import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FetchingWeatherService, WeatherInfo } from '../../services/fetching-weather.service';

@Component({
  selector: 'app-weather-content',
  templateUrl: './weather-content.component.html',
  styleUrls: ['./weather-content.component.css']
})
export class WeatherContentComponent implements OnInit {
  // private location:string;
  public isLoading: boolean;
  public weatherInfos: WeatherInfo[];

  constructor(private weatherService: FetchingWeatherService){
    this.isLoading = false;
   }

  ngOnInit() {
    this.loadWeather('London');
  }

  loadWeather(location: string){
    this.setLoading(true);
    this.weatherService.fetchForecast(location)
    .subscribe(result => {
      this.weatherInfos = result;
      this.setLoading(false);
    }, error => {
      console.error(error);
      this.setLoading(false);
    });
  }

  setLoading(isLoading: boolean){
    this.isLoading = isLoading;
  }
}
