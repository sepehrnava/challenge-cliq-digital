// import { redirect } from "next/navigation";
import type { FC } from "react";

import type { City } from "@/types/weather/city.type";

import CityComboBox from "./CitiesComboBox";

interface ICitiesLayoutProps {
  citiesInComboBox?: City[];
  // selectedCity?: string;
}

const CitiesLayout: FC<ICitiesLayoutProps> = (props) => {
  // async function changeCity(formData: FormData) {
  //   "use server";

  //   const city = formData.get("citiesInput") as string;
  //   if (city) {
  //     redirect(`/?city=${city}`);
  //   }
  // }

  return (
    <form
      // action={changeCity}
      className="relative grid"
    >
      <label
        className="mb-2 text-lg font-normal text-primary"
        htmlFor="citiesInput"
      >
        City Name
      </label>
      {props.citiesInComboBox ? (
        <CityComboBox citiesInComboBox={props.citiesInComboBox} />
      ) : (
        <input
          id="citiesInput"
          name="citiesInput"
          className="ssr h-[50px] rounded-[5px] bg-secondary px-4"
          type="text"
          list="city-list"
        />
      )}
      {!props.citiesInComboBox && (
        <div className="prose absolute right-1 top-1/2 -mt-px flex translate-y-1/2">
          <p className="!m-0 text-sm text-white/70">fetching cities...</p>
        </div>
      )}
    </form>
  );
};

export default CitiesLayout;
