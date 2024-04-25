export interface WeatherCondition {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: any;
  IsDayTime: boolean;
  Temperature: Temperature;
  MobileLink: string;
  Link: string;
}

interface Temperature {
  Metric: UnitValue;
  Imperial: UnitValue;
}

interface UnitValue {
  Value: number;
  Unit: string;
  UnitType: number;
}
