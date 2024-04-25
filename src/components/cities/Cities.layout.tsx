import type { FC } from "react";

import { Skeleton } from "../ui/skeleton";
import type { ComboBoxCities } from "./CitiesComboBox";
import ComboBox from "./CitiesComboBox";

interface ICitiesLayoutProps {
  citiesInComboBox?: ComboBoxCities[];
}

const CitiesLayout: FC<ICitiesLayoutProps> = (props) => {
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        id="cityNameLabel"
        className="mb-2 text-lg font-normal text-primary"
        htmlFor="citiesInput"
      >
        City Name
      </label>
      {props.citiesInComboBox ? (
        <ComboBox citiesInComboBox={props.citiesInComboBox} />
      ) : (
        <Skeleton className="h-10" />
      )}
    </>
  );
};

export default CitiesLayout;
