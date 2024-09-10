export interface Weather {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    wind_mph: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    vis_km: number;
    vis_miles: number;
  };
}
