import { Suspense } from "react";

import type { AvailableUnits } from "../currentWeather/Tempreature";
import FutureForecast from "./FutureForecast";
import FutureForecastLayout from "./FutureForecastLayout";

interface FutureForecastWrapperProps {
  searchParams: {
    city?: string;
    unit?: AvailableUnits;
  };
}

export default function FutureForecastWrapper(
  props: FutureForecastWrapperProps,
) {
  return (
    <div className="container pb-[115px] pt-[95px]">
      <div className="block">
        <div className="prose">
          <h2 className="text-[24px] text-primary md:text-[36px]">
            5 DAYS FORECAST
          </h2>
        </div>
      </div>
      <Suspense fallback={<FutureForecastLayout />}>
        {props.searchParams.city ? (
          <FutureForecast
            locationKey={props.searchParams.city}
            unit={props.searchParams.unit}
          />
        ) : (
          <FutureForecastLayout />
        )}
      </Suspense>
    </div>
  );
}
