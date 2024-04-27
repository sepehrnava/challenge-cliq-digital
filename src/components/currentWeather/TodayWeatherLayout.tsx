import type { WeatherCondition } from "@/types/weather/weatherCondition.type";

import { Skeleton } from "../ui/skeleton";
import Tempreature from "./Tempreature";

interface TodayWeatherLoadingProps {
  currentcondition?: WeatherCondition;
}

export default function TodayWeatherLayout(props?: TodayWeatherLoadingProps) {
  return (
    <div className="text-center ">
      <div className="prose mx-auto mb-[35px]">
        {props?.currentcondition && props.currentcondition.Link ? (
          <p className="text-4xl font-black capitalize">
            {(() => {
              const regex = /www\.accuweather\.com\/en\/(\w+)\/(\w+)\//;
              const match = regex.exec(props.currentcondition.Link);
              if (match && match.length > 2) {
                const countryCode = match[1]?.toUpperCase();
                const cityName = match[2];
                return `${cityName}, ${countryCode}`;
              }
              return <></>;
            })()}
          </p>
        ) : (
          <div className="my-6 w-full">
            <Skeleton className="h-10" />
          </div>
        )}
      </div>
      {props?.currentcondition ? (
        <Tempreature temperature={props.currentcondition.Temperature} />
      ) : (
        <Skeleton className="mx-auto h-[106px] w-full" />
      )}
      <div>
        {props?.currentcondition ? (
          <p className="text-2xl font-black">
            {new Date(
              props.currentcondition.LocalObservationDateTime,
            )?.toLocaleString("en-US", {
              weekday: "long",
            })}
            , {props.currentcondition.WeatherText?.toLowerCase()}
          </p>
        ) : (
          <div className="my-6">
            <Skeleton className="h-8 w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
