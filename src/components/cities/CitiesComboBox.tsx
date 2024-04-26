"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import type { City } from "@/types/weather/city.type";

// export type ComboBoxCities = {
//   id: string;
//   value: string;
//   label: string;
// };

interface ComboBoxProps {
  citiesInComboBox: City[];
}

const CityComboBox: React.FC<ComboBoxProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [error, setError] = React.useState<string | null>(null);

  const cities = props.citiesInComboBox;

  function cityIdToValue(id: string) {
    return cities.find((city) => city.Key === id)?.LocalizedName;
  }

  function cityValueToId(val: string) {
    return cities.find((city) => city.LocalizedName === val)?.Key;
  }

  const createQueryString = React.useCallback(
    (name: string, val: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, cityValueToId(val) || "");

      return params.toString();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value;
    const foundCity = cities.find(
      (city) => city.LocalizedName === currentValue,
    );
    if (!foundCity) {
      setError("City not found");
    } else {
      setError(null);
      router.push(`${pathname}?${createQueryString("city", currentValue)}`);
    }
  };

  const selectedCity = cityIdToValue(searchParams.get("city") || "");
  return (
    <>
      <input
        id="citiesInput"
        name="citiesInput"
        className="h-[50px] rounded-[5px] bg-secondary px-4"
        type="text"
        list="city-list"
        defaultValue={selectedCity}
        onChange={handleChange}
        autoComplete="off"
      />
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

  // return (
  //   <Popover open={open} onOpenChange={setOpen}>
  //     <PopoverTrigger asChild>
  //       <Button
  //         variant="outline"
  //         role="combobox"
  //         aria-expanded={open}
  //         className="w-full justify-between pl-0"
  //       >
  //         {value
  //           ? cities.find((framework) => framework.value === value)?.label
  //           : ""}
  //         <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
  //       </Button>
  //     </PopoverTrigger>
  //     <PopoverContent className="w-[200px] p-0">
  //       <Command>
  //         <CommandInput placeholder="Search framework..." />
  //         <CommandEmpty>No framework found.</CommandEmpty>
  //         <CommandGroup>
  //           <ScrollArea className="h-[200px]">
  //             <CommandList className="">
  //               {cities.map((framework) => (
  //                 <CommandItem
  //                   key={framework.value}
  //                   value={framework.value}
  //                   onSelect={handleSelect}
  //                 >
  //                   <Check
  //                     className={cn(
  //                       "mr-2 h-4 w-4",
  //                       value === framework.value ? "opacity-100" : "opacity-0",
  //                     )}
  //                   />
  //                   {framework.label}
  //                 </CommandItem>
  //               ))}
  //             </CommandList>
  //           </ScrollArea>
  //         </CommandGroup>
  //       </Command>
  //     </PopoverContent>
  //   </Popover>
  // );
};

export default CityComboBox;
