// import { redirect } from "next/navigation";
import type { FC } from "react";

import type { City } from "@/types/weather/city.type";

import { Skeleton } from "../ui/skeleton";
import Spinner from "../ui/Spinner";
import CityInput from "./CitiesInput";

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
        <CityInput citiesInComboBox={props.citiesInComboBox} />
      ) : (
        <>
          <Skeleton className="relative h-[50px] w-full rounded-[5px] px-4">
            <div className="prose absolute right-2 top-1/2 -mt-px flex -translate-y-1/2">
              <p className="!m-0 flex items-center gap-2 text-sm text-white/50">
                fetching cities... <Spinner />
              </p>
            </div>
          </Skeleton>
          <div className="err h-7" />
        </>
      )}
    </form>
  );
};

export default CitiesLayout;
