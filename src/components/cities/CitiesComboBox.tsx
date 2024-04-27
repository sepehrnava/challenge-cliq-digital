"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import type { City } from "@/types/weather/city.type";

import useCityLoader from "../../state/cityLoader.state";
import Spinner from "../ui/Spinner";

interface ComboBoxProps {
  citiesInComboBox: City[];
}

const CityComboBox: React.FC<ComboBoxProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [error, setError] = React.useState<string | null>(null);
  const { loading: isCityLoading } = useCityLoader();
  const cities = props.citiesInComboBox;

  function cityIdToValue(id: string) {
    return cities.find((city) => city.Key === id)?.LocalizedName;
  }

  function cityValueToId(val: string) {
    return cities.find((city) => city.LocalizedName === val)?.Key;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value;
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (currentValue === "") {
      if (current.has("city")) {
        current.delete("city");
      }
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`, { scroll: false });
      return;
    }
    const foundCity = cities.find(
      (city) => city.LocalizedName === currentValue,
    );
    if (!foundCity) {
      setError("City not found");
    } else {
      setError(null);
      current.set("city", cityValueToId(currentValue) || "");
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`, { scroll: false });
    }
  };

  const selectedCity = cityIdToValue(searchParams.get("city") || "");
  return (
    <>
      <div className="relative w-full">
        <input
          id="citiesInput"
          name="citiesInput"
          className="mb-0 h-[50px] w-full rounded-[5px] bg-secondary px-4"
          type="text"
          list="city-list"
          defaultValue={selectedCity}
          onChange={handleChange}
          autoComplete="off"
        />
        <div className="prose absolute right-2 top-1/2 -mt-px flex -translate-y-1/2">
          {isCityLoading && (
            <p className="!m-0 flex items-center gap-2 text-sm text-white/50">
              {typeof isCityLoading === "string" ? isCityLoading : ""}{" "}
              <Spinner />
            </p>
          )}
        </div>
      </div>
      <div className="err h-7">
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <datalist id="city-list">
        {props.citiesInComboBox?.map((city) => (
          <option key={city.Key} label={city.Country.EnglishName}>
            {city.LocalizedName}
          </option>
        ))}
      </datalist>
    </>
  );
};

export default CityComboBox;
