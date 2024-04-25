"use client";

import { CommandList } from "cmdk";
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
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export type ComboBoxCities = {
  id: string;
  value: string;
  label: string;
};

interface ComboBoxProps {
  citiesInComboBox: ComboBoxCities[];
}

const CityComboBox: React.FC<ComboBoxProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const cities = props.citiesInComboBox;

  function cityIdToValue(id: string) {
    return cities.find((framework) => framework.id === id)?.value;
  }

  function cityValueToId(val: string) {
    return cities.find((framework) => framework.value === val)?.id;
  }

  React.useEffect(() => {
    // set the value based on the query param on initial load
    const city = searchParams.get("city");
    if (city) {
      setValue(cityIdToValue(city) || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createQueryString = React.useCallback(
    (name: string, val: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, cityValueToId(val) || "");

      return params.toString();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams],
  );

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    router.push(`${pathname}?${createQueryString("city", currentValue)}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between pl-0"
        >
          {value
            ? cities.find((framework) => framework.value === value)?.label
            : ""}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-[200px]">
              <CommandList className="">
                {cities.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={handleSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandList>
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CityComboBox;
