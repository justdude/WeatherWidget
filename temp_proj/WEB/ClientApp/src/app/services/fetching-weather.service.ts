import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// weather-fetching.service.ts
import { catchError, map } from 'rxjs/operators';

export interface WeatherInfo {
  date: Date;
  day: string;
  code: number | null;
  text: string;
  high: number;
  low: number;
}

@Injectable({
  providedIn: 'root'
})
export class FetchingWeatherService {

  private readonly rapidKey = '37c9993b09mshc41dc4f6dc793fap181029jsnf7fa2596915f'; // Replace with actual API key
  private readonly rapidHost = 'yahoo-weather5.p.rapidapi.com';
  private readonly fetchWeatherURL = 'https://yahoo-weather5.p.rapidapi.com/weather?location={LOCATION_INPUT}&format=json&u=f';

  constructor(private http: HttpClient) { }

  fetchForecast(location: string): Observable<WeatherInfo[]> {
    if (!location || location.trim() === '') {
      throw new Error('Empty string, please check input');
    }

    const normalizedLocation = location.toLowerCase();
    const url = this.fetchWeatherURL.replace('{LOCATION_INPUT}', normalizedLocation);

    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.rapidKey,
      'X-RapidAPI-Host': this.rapidHost,
    });

    return this.http.get<any>(url, { headers }).pipe(
      map(response => this.transformResponse(response)),
      catchError(error => {
        console.error('Error fetching weather data:', error);
        return [];
      })
    );
  }

  private transformResponse(response: any): WeatherInfo[] {
    const weatherInfoList: WeatherInfo[] = [];
    const forecasts = response.forecasts;

    forecasts.forEach((item: any) => {
      try {
        const date = new Date(item.date * 1000); // Convert milliseconds
        const weatherInfo: WeatherInfo = {
          date,
          day: item.day,
          code: item.code,
          text: item.text,
          high: item.high,
          low: item.low,
        };

        weatherInfoList.push(weatherInfo);
      } catch (error) {
        console.error('Error processing weather data item:', error);
      }
    });

    return weatherInfoList;
  }
}
