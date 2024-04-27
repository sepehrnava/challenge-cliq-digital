import { sleep } from "@/lib/utils";
import type { WeatherCondition } from "@/types/weather/weatherCondition.type";

import TodayWeatherLayout from "./TodayWeatherLayout";

async function getTodayWeather(locationKey: string) {
  let data: WeatherCondition[];
  if (process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY) {
    const response = await fetch(
      `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&details=true`,
    );
    data = await response.json();
  } else {
    data = (await import("@/data/weatherCondition.json")).data;
    await sleep();
  }
  return data;
}

interface TodayWeatherProps {
  locationKey: string;
}

export default async function TodayWeather(props: TodayWeatherProps) {
  const currentcondition = await getTodayWeather(props.locationKey);

  return <TodayWeatherLayout currentcondition={currentcondition[0]} />;
}
