import { type FC, Suspense } from "react";

import CitiesLayout from "./Cities.layout";
import CityForm from "./CityForm";
import Geo from "./Geo";

interface CityWrapperProps {
  // selectedCity?: string;
}

const CityWrapper: FC<CityWrapperProps> = (_props) => {
  return (
    <div className="mx-auto max-w-md py-[72px]">
      <Suspense fallback={<CitiesLayout />}>
        <CityForm
        // selectedCity={props.selectedCity}
        />
      </Suspense>
      <Geo />
    </div>
  );
};

export default CityWrapper;
