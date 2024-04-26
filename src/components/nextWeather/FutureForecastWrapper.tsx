import { Suspense } from "react";

import FutureForecast from "./FutureForecast";

interface FutureForecastWrapperProps {
  searchParams: {
    city?: string;
  };
}

export default function FutureForecastWrapper(
  props: FutureForecastWrapperProps,
) {
  return (
    <div className="mx-auto max-w-4xl pb-[115px] pt-[95px]">
      <div className="prose">
        <h2 className="text-primary">Future Forecast</h2>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {props.searchParams.city ? (
          <FutureForecast locationKey={props.searchParams.city} />
        ) : (
          <p>select a city to view future forecast</p>
        )}
      </Suspense>
    </div>
  );
}
