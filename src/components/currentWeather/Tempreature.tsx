"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";
import type { WeatherCondition } from "@/types/weather/weatherCondition.type";

interface TemperatureProps {
  temperature: WeatherCondition["Temperature"];
}

export const availableUnits = ["Metric", "Imperial"] as const;
export type AvailableUnits = (typeof availableUnits)[number];

export default function Temperature(props: TemperatureProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // check if urlUnit exists in availableUnits, if not set it to Metric
  const urlUnit = availableUnits.includes(
    searchParams.get("unit") as AvailableUnits,
  )
    ? (searchParams.get("unit") as AvailableUnits)
    : "Metric";
  const [unit, setUnit] = React.useState(urlUnit);

  React.useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("unit", unit);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`, { scroll: false });
  }, [pathname, router, searchParams, unit]);

  return (
    <div className="prose mx-auto flex items-center justify-center gap-10 prose-p:!m-0">
      <p className="min-w-[130px] text-6xl font-normal text-primary md:min-w-[200px] md:text-8xl">
        {props.temperature &&
          props.temperature[unit] &&
          props.temperature[unit].Value}
        °
      </p>
      <div className="prose flex flex-col justify-between gap-[10px] prose-p:!m-0 prose-p:px-[13px] prose-p:py-1 ">
        <button
          id="unitToMetric"
          onClick={() => setUnit("Metric")}
          className={cn(unit === "Metric" ? "" : "opacity-60", "cardGradient")}
          type="button"
        >
          <p className="text-2xl font-black text-primary md:text-4xl">
            {props.temperature?.Metric?.Unit}
          </p>
        </button>
        <button
          id="unitToImperial"
          onClick={() => setUnit("Imperial")}
          className={cn(unit === "Metric" ? "opacity-60" : "", "cardGradient")}
          type="button"
        >
          <p className="text-2xl font-black text-primary md:text-4xl">
            {props.temperature?.Imperial?.Unit}
          </p>
        </button>
      </div>
    </div>
  );
}
