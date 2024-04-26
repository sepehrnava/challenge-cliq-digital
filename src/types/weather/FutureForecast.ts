export interface FutureForecastAPI {
  Headline: Headline;
  DailyForecasts: DailyForecast[];
}

interface DailyForecast {
  Date: string;
  EpochDate: number;
  Sun: Sun;
  Moon: Moon;
  Temperature: Temperature;
  RealFeelTemperature: RealFeelTemperature;
  RealFeelTemperatureShade: RealFeelTemperature;
  HoursOfSun: number;
  DegreeDaySummary: DegreeDaySummary;
  AirAndPollen: AirAndPollen[];
  Day: Day;
  Night: Night;
  Sources: string[];
  MobileLink: string;
  Link: string;
}
interface Night {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType: string;
  PrecipitationIntensity: string;
  ShortPhrase: string;
  LongPhrase: string;
  PrecipitationProbability: number;
  ThunderstormProbability: number;
  RainProbability: number;
  SnowProbability: number;
  IceProbability: number;
  Wind: Wind;
  WindGust: Wind;
  TotalLiquid: Minimum;
  Rain: Minimum;
  Snow: Minimum;
  Ice: Minimum;
  HoursOfPrecipitation: number;
  HoursOfRain: number;
  HoursOfSnow: number;
  HoursOfIce: number;
  CloudCover: number;
  Evapotranspiration: Minimum;
  SolarIrradiance: Minimum;
  RelativeHumidity: RelativeHumidity;
  WetBulbTemperature: WetBulbTemperature;
  WetBulbGlobeTemperature: WetBulbTemperature;
}
interface Day {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType?: string;
  PrecipitationIntensity?: string;
  ShortPhrase: string;
  LongPhrase: string;
  PrecipitationProbability: number;
  ThunderstormProbability: number;
  RainProbability: number;
  SnowProbability: number;
  IceProbability: number;
  Wind: Wind;
  WindGust: Wind;
  TotalLiquid: Minimum;
  Rain: Minimum;
  Snow: Minimum;
  Ice: Minimum;
  HoursOfPrecipitation: number;
  HoursOfRain: number;
  HoursOfSnow: number;
  HoursOfIce: number;
  CloudCover: number;
  Evapotranspiration: Minimum;
  SolarIrradiance: Minimum;
  RelativeHumidity: RelativeHumidity;
  WetBulbTemperature: WetBulbTemperature;
  WetBulbGlobeTemperature: WetBulbTemperature;
}
interface WetBulbTemperature {
  Minimum: Minimum;
  Maximum: Minimum;
  Average: Minimum;
}
interface RelativeHumidity {
  Minimum: number;
  Maximum: number;
  Average: number;
}
interface Wind {
  Speed: Minimum;
  Direction: Direction;
}
interface Direction {
  Degrees: number;
  Localized: string;
  English: string;
}
interface AirAndPollen {
  Name: string;
  Value: number;
  Category: string;
  CategoryValue: number;
  Type?: string;
}
interface DegreeDaySummary {
  Heating: Minimum;
  Cooling: Minimum;
}
interface RealFeelTemperature {
  Minimum: Minimum2;
  Maximum: Minimum2;
}
interface Minimum2 {
  Value: number;
  Unit: string;
  UnitType: number;
  Phrase: string;
}
interface Temperature {
  Minimum: Minimum;
  Maximum: Minimum;
}
interface Minimum {
  Value: number;
  Unit: string;
  UnitType: number;
}
interface Moon {
  Rise?: string;
  EpochRise?: number;
  Set: string;
  EpochSet: number;
  Phase: string;
  Age: number;
}
interface Sun {
  Rise: string;
  EpochRise: number;
  Set: string;
  EpochSet: number;
}
interface Headline {
  EffectiveDate: string;
  EffectiveEpochDate: number;
  Severity: number;
  Text: string;
  Category: string;
  EndDate: string;
  EndEpochDate: number;
  MobileLink: string;
  Link: string;
}
