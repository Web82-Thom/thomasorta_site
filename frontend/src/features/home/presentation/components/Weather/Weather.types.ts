export type WeatherReport = {
  city: string;
  description: string;
  temperature: number | null;
  temperatureMin: number | null;
  temperatureMax: number | null;
  icon: string | null;
  iconUrl: string | null;
};
