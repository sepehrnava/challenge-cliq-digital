// import { Suspense } from "react";

import { Suspense } from "react";

import Chart from "../components/chart/Chart";
import GraphLoader from "../components/chart/GraphLoader";
import CityForm from "../components/cities/CityForm";
import CityLoading from "../components/cities/CityLoading";

// import CityForm from "../components/cities/CityForm";
// import CityLoading from "../components/cities/CityLoading";

type SearchParams = {
  city?: string;
};

export default function Index({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div>
      <div className="flex items-center justify-center py-[72px]">
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            id="cityNameLabel"
            className="mb-2 text-lg font-normal text-primary"
            htmlFor="citiesInput"
          >
            City Name
          </label>
          <Suspense fallback={<CityLoading />}>
            <CityForm />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<GraphLoader />}>
        <Chart location={searchParams.city} />
      </Suspense>
    </div>
  );
}
