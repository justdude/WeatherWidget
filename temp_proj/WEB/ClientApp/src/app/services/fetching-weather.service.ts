import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchingWeatherService {

  constructor(private http: HttpClient) { }

  fetchForecast(location:string):Observable<WeatherInfo[]>{
    const path = `https://localhost:44318/weather/${location}`;
    return this.http.get<WeatherInfo[]>(path);
  }
}

export interface WeatherInfo
{
    day:string;
    date:Date;
    low:number;
    high:number;
    text:string;
    code:number;
}
