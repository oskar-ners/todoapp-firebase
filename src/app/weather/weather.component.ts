import { Component, OnInit, inject } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { BackButtonComponent } from '../back-button/back-button.component';
import { GeoWeather, Weather } from '../interfaces/weather.interface';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    LogoutButtonComponent,
    BackButtonComponent,
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  weatherService = inject(WeatherService);

  weatherData!: Weather;
  geoWeatherData!: GeoWeather | undefined;
  location: string = '';

  ngOnInit() {
    this.weatherService.getIPAddress().subscribe(
      (ipData: any) => {
        const userIP = ipData.ip;
        this.weatherService.getGeoData(userIP).subscribe(
          (geoData: GeoWeather) => {
            this.geoWeatherData = geoData;
            console.log('Geolocation data:', this.geoWeatherData);
          },
          (error) => {
            console.error('Error fetching geolocation data:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching IP address:', error);
      }
    );
  }

  getWeather(location: string): void {
    this.weatherService.getWeather(location).subscribe({
      next: (weatherData: Weather) => {
        this.weatherData = weatherData;
        console.log('you get your weather data!');
        console.log(weatherData);
      },
      error: (error) => {
        console.warn('Error ' + error.message);
      },
    });
  }
}
