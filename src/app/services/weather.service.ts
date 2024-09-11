import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../interfaces/weather.interface';
import { GeoWeather } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private API_KEY = '36a2284979944a2b97c134634241009';
  private BASE_URL = 'http://api.weatherapi.com/v1/current.json';

  private IPIFY_URL = 'https://api.ipify.org?format=json';
  private GEO_API_BASE_URL = 'https://geo.ipify.org/api/v2/country';
  private GEO_API_KEY = 'at_uoKgk4jn8oDwO14bIQoJwTxxz9ufq';

  http = inject(HttpClient);

  getWeather(location: string): Observable<Weather> {
    const url = `${this.BASE_URL}?key=${this.API_KEY}&q=${location}&aqi=no`;
    return this.http.get<Weather>(url);
  }

  getIPAddress(): Observable<any> {
    return this.http.get(this.IPIFY_URL);
  }

  getGeoData(ipAddress: string): Observable<GeoWeather> {
    const url = `${this.GEO_API_BASE_URL},city?apiKey=${this.GEO_API_KEY}&ipAddress=${ipAddress}`;
    return this.http.get<GeoWeather>(url);
  }
}
