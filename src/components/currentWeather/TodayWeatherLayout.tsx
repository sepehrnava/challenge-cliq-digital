import type { WeatherCondition } from "@/types/weather/weatherCondition.type";

import { Skeleton } from "../ui/skeleton";
import Tempreature from "./Tempreature";

interface TodayWeatherLoadingProps {
  currentcondition?: WeatherCondition;
}

export default function TodayWeatherLoading(props?: TodayWeatherLoadingProps) {
  const currentcondition = props?.currentcondition;
  return (
    <div className="prose text-center">
      <p className="text-4xl font-black capitalize">
        {currentcondition ? (
          <>
            {(() => {
              const regex = /www\.accuweather\.com\/en\/(\w+)\/(\w+)\//;
              const match = currentcondition.Link.match(regex);
              if (match && match.length === 3) {
                const countryCode = match[1]?.toUpperCase();
                const cityName = match[2];
                return `${cityName}, ${countryCode}`;
              }
              return <></>;
            })()}
          </>
        ) : (
          <div className="my-6 w-full">
            <Skeleton className="h-10" />
          </div>
        )}
      </p>
      {currentcondition ? (
        <Tempreature temperature={currentcondition.Temperature} />
      ) : (
        <Skeleton className="h-[106px] w-full" />
      )}
      {currentcondition ? (
        <p className="text-2xl font-black">
          {new Date(currentcondition.LocalObservationDateTime).toLocaleString(
            "en-US",
            {
              weekday: "long",
            },
          )}
          , {currentcondition.WeatherText.toLowerCase()}
        </p>
      ) : (
        <div className="my-6">
          <Skeleton className="h-8 w-full" />
        </div>
      )}
    </div>
  );
}
