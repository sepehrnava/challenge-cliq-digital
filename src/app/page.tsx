import GraphWrapper from "@/components/chart/GraphWrapper";
import CityWrapper from "@/components/cities/CitiesWrapper";
import TodayWeatherWrapper from "@/components/currentWeather/TodayWeatherWrapper";
import FutureForecastWrapper from "@/components/nextWeather/FutureForecastWrapper";

type SearchParams = {
  city?: string;
};

export default function Index({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // const selectedCity = searchParams?.city;

  return (
    <div>
      <CityWrapper />
      <TodayWeatherWrapper searchParams={searchParams} />
      <FutureForecastWrapper searchParams={searchParams} />
      <GraphWrapper searchParams={searchParams} />
    </div>
  );
}
