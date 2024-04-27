"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

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
    <div className="prose flex items-center justify-center gap-10 prose-p:!m-0">
      <p className="text-8xl font-normal text-primary">
        {props.temperature[unit].Value}°
      </p>
      <div className="prose flex flex-col justify-between gap-[10px] prose-p:!m-0 prose-p:px-[13px] prose-p:py-1 ">
        <button
          onClick={() => setUnit("Metric")}
          className="cardGradient"
          type="button"
        >
          <p className="text-4xl font-black text-primary">
            {props.temperature.Metric.Unit}
          </p>
        </button>
        <button
          onClick={() => setUnit("Imperial")}
          className="cardGradient"
          type="button"
        >
          <p className="text-4xl font-black text-primary">
            {props.temperature.Imperial.Unit}
          </p>
        </button>
      </div>
    </div>
  );
}
