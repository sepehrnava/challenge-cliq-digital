import { type FC, Suspense } from "react";

import CitiesLayout from "./Cities.layout";
import CityForm from "./CityForm";
import Geo from "./Geo";

interface CityWrapperProps {
  // selectedCity?: string;
}

const CityWrapper: FC<CityWrapperProps> = (_props) => {
  return (
    <div className="container max-w-[644px] py-[72px]">
      <Suspense fallback={<CitiesLayout />}>
        <CityForm
        // selectedCity={props.selectedCity}
        />
      </Suspense>
      <Suspense fallback={null}>
        <Geo />
      </Suspense>
    </div>
  );
};

export default CityWrapper;
