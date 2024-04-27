import type { AvailableUnits } from "@/components/currentWeather/Tempreature";
import { sleep } from "@/lib/utils";
import type { FutureForecastAPI } from "@/types/weather/FutureForecast";

import FutureForecastLayout from "./FutureForecastLayout";

async function get5DaysForecast(locationKey: string, unit?: AvailableUnits) {
  let data: FutureForecastAPI;
  if (process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY) {
    const response = await fetch(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&metric=${unit === "Imperial" ? "false" : "true"}`,
    );
    data = await response.json();
  } else {
    if (unit === "Imperial") {
      data = (await import("@/data/5days-Imperial.json")) as FutureForecastAPI;
    } else {
      data = (await import("@/data/5days-Metric.json")) as FutureForecastAPI;
    }
    await sleep();
  }
  return data;
}

interface FutureForecastProps {
  locationKey: string;
  unit?: AvailableUnits;
}

export default async function FutureForecast(props: FutureForecastProps) {
  const forecasts = await get5DaysForecast(props.locationKey, props.unit);
  return <FutureForecastLayout forecasts={forecasts} />;
}
