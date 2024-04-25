import { Suspense } from "react";

import Chart from "../components/chart/Chart";
import GraphLoader from "../components/chart/GraphLoader";
import CityLoading from "../components/cities/CityLoading";

type SearchParams = {
  city?: string;
};

export default function Index({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  // const selectedCity = searchParams?.city;

  return (
    <div>
      <CityLoading
      // selectedCity={selectedCity}
      />
      <Suspense fallback={<GraphLoader />}>
        <Chart location={searchParams!.city} />
      </Suspense>
    </div>
  );
}
