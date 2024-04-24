export type HourlyForecast = {
  DateTime: string;
  EpochDateTime: number;
  WeatherIcon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  IsDaylight: boolean;
  Temperature: UnitValue;
  RealFeelTemperature: UnitValue;
  RealFeelTemperatureShade: UnitValue;
  WetBulbTemperature: UnitValue;
  WetBulbGlobeTemperature: UnitValue;
  DewPoint: UnitValue;
  Wind: Wind;
  WindGust: WindGust;
  RelativeHumidity: number;
  IndoorRelativeHumidity: number;
  Visibility: UnitValue;
  Ceiling: UnitValue;
  UVIndex: number;
  UVIndexText: string;
  PrecipitationProbability: number;
  ThunderstormProbability: number;
  RainProbability: number;
  SnowProbability: number;
  IceProbability: number;
  TotalLiquid: UnitValue;
  Rain: UnitValue;
  Snow: UnitValue;
  Ice: UnitValue;
  CloudCover: number;
  Evapotranspiration: UnitValue;
  SolarIrradiance: UnitValue;
  MobileLink: string;
  Link: string;
};

type UnitValue = {
  Value: number;
  Unit: string;
  UnitType: number;
  Phrase?: string;
};

export interface Wind {
  Speed: UnitValue;
  Direction: Direction;
}

export interface Direction {
  Degrees: number;
  Localized: string;
  English: string;
}

export interface WindGust {
  Speed: UnitValue;
}
