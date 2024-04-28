"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Check, ChevronsUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Spinner from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";
import useCityLoader from "@/state/cityLoader.state";
import type { City } from "@/types/weather/city.type";
import useGps from "@/utils/hooks/useGps";

import Geo from "./Geo";

interface CityInputProps {
  citiesInComboBox: City[];
}

const CityInput: React.FC<CityInputProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { getGpsHandler, city: cityFromGps } = useGps();
  const inputBtnRef = React.useRef<HTMLButtonElement>(null);
  const citiesListRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  // mapping cities to local state to add new city to the list from gps as well
  const [cities, setCities] = React.useState([...props.citiesInComboBox]);
  const [error, setError] = React.useState<string | null>(null);
  const { loading: isCityLoading } = useCityLoader();

  function cityIdToValue(id: string) {
    return cities.find((city) => city.Key === id)?.LocalizedName;
  }

  function cityValueToId(val: string) {
    return cities.find((city) => city.LocalizedName === val)?.Key;
  }

  const selectedCity = cityIdToValue(searchParams.get("city") || "");
  const [value, setValue] = React.useState(selectedCity || "");

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
  };

  React.useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value === "") {
      if (current.has("city")) {
        current.delete("city");
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`, { scroll: false });
        return;
      }
      getGpsHandler();
      return;
    }
    const foundCity = cities.find((city) => city.LocalizedName === value);
    if (!foundCity) {
      if (cityFromGps !== value) {
        setError("City does not exist in top 150 cities!");
      } else {
        setError(null);
        setCities((prev) => [
          ...prev,
          {
            Key: current.get("city")!,
            LocalizedName: value,
          },
        ]);
      }
    } else if (value) {
      setError(null);
      const cityID = cityValueToId(value);
      if (typeof cityID === "string" && cityID !== "") {
        current.set("city", cityID);
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`, { scroll: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  React.useEffect(() => {
    if (cityFromGps) setValue(cityFromGps);
  }, [cityFromGps]);

  React.useEffect(() => {
    // if is open and clicked outside of inputBtnRef.current or citiesListRef.current then close
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        inputBtnRef.current &&
        !inputBtnRef.current.contains(e.target as Node) &&
        citiesListRef.current &&
        !citiesListRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [inputBtnRef, open]);

  return (
    <>
      <div className="relative w-full">
        <div className="relative">
          <Button
            ref={inputBtnRef}
            variant="outline"
            role="combobox"
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="mb-0 h-[50px] w-full justify-between rounded-[5px] !border-none bg-secondary pl-3 !outline-none"
          >
            {value
              ? cities.find((city) => city.LocalizedName === value)
                  ?.LocalizedName || cityFromGps
              : "Type city name..."}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>

          <Command
            ref={citiesListRef}
            className="absolute top-[50px] -mt-1 hidden min-h-[300px] w-full bg-secondary"
            style={{ display: open ? "block" : "none" }}
          >
            <div className="relative">
              <CommandInput
                autoFocus
                placeholder="Search your city between top 150 cities"
              />
              <Geo setValue={setValue} />
            </div>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="">
                <CommandList className="!max-h-[250px]">
                  {cities.map((city) => (
                    <CommandItem
                      key={city.LocalizedName}
                      value={city.LocalizedName}
                      onSelect={handleSelect}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === city.LocalizedName
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {city.LocalizedName}
                    </CommandItem>
                  ))}
                </CommandList>
              </ScrollArea>
            </CommandGroup>
          </Command>
        </div>
        <div className="prose absolute right-2 top-1/2 -mt-px flex -translate-y-1/2">
          {isCityLoading && (
            <p className="!m-0 flex items-center gap-2 text-sm text-white/50">
              {typeof isCityLoading === "string" ? isCityLoading : ""}
              <Spinner />
            </p>
          )}
        </div>
      </div>
      <div className="err h-7">
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default CityInput;
