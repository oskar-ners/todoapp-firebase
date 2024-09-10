import { Component, inject } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { BackButtonComponent } from '../back-button/back-button.component';
import { Weather } from '../interfaces/weather.interface';

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
export class WeatherComponent {
  weatherService = inject(WeatherService);

  weatherData!: Weather;
  location: string = '';

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
