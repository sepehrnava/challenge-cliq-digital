import { Suspense } from "react";

import TodayWeather from "./TodayWeather";
import TodayWeatherLayout from "./TodayWeatherLayout";

interface TodayWeatherWrapperProps {
  searchParams: {
    city?: string;
  };
}

export default function TodayWeatherWrapper(props: TodayWeatherWrapperProps) {
  return (
    <div className="w-full bg-secondary">
      <div className="container py-[72px]">
        <Suspense fallback={<TodayWeatherLayout />}>
          {props.searchParams.city ? (
            <TodayWeather locationKey={props.searchParams.city} />
          ) : (
            <p className="h-[237px]">
              select a city to view today&apos;s weather.
            </p>
          )}
        </Suspense>
      </div>
    </div>
  );
}
