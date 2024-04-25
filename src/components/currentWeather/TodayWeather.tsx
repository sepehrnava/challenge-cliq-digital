import type { WeatherCondition } from "@/types/weather/weatherCondition.type";

async function getTodayWeather(locationKey: string) {
  let data: WeatherCondition;
  if (process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY) {
    const response = await fetch(
      `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}`,
    );
    data = await response.json();
  } else {
    data = await import("@/data/weatherCondition.json");
  }
  return data;
}

export default async function TodayWeather() {
  const currentcondition = await getTodayWeather("249758");
  return <div>{currentcondition.WeatherText}</div>;
}
