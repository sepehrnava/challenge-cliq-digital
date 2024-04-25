import { Suspense } from "react";

import CitiesLayout from "./Cities.layout";
import CityForm from "./CityForm";
import Geo from "./Geo";

// a component that shows a loading spinner
const CityLoading = () => {
  return (
    <div className="mx-auto flex max-w-md flex-col justify-center py-[72px]">
      <Suspense fallback={<CitiesLayout />}>
        <CityForm />
      </Suspense>
      <Geo />
    </div>
  );
};

export default CityLoading;
