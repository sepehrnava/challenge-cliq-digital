// import { redirect } from "next/navigation";
import type { FC } from "react";

import type { City } from "@/types/weather/city.type";

import Spinner from "../ui/Spinner";
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
      className="grid"
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
        <>
          <div className="relative w-full">
            <input
              id="citiesInput"
              name="citiesInput"
              className="ssr mb-0 h-[50px] w-full rounded-[5px] bg-secondary px-4"
              type="text"
              list="city-list"
              autoComplete="off"
            />
            <div className="prose absolute right-2 top-1/2 -mt-px flex -translate-y-1/2">
              <p className="!m-0 flex items-center gap-2 text-sm text-white/50">
                fetching cities... <Spinner />
              </p>
            </div>
          </div>
          <div className="err h-7" />
        </>
      )}
    </form>
  );
};

export default CitiesLayout;
