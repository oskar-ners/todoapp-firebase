import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private API_KEY = '36a2284979944a2b97c134634241009';
  private BASE_URL = 'http://api.weatherapi.com/v1/current.json';

  http = inject(HttpClient);

  getWeather(location: string): Observable<Weather> {
    const url = `${this.BASE_URL}?key=${this.API_KEY}&q=${location}&aqi=no`;
    return this.http.get<Weather>(url);
  }
}
