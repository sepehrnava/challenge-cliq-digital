"use client";

import type { WeatherCondition } from "@/types/weather/weatherCondition.type";

interface TemperatureProps {
  temperature: WeatherCondition["Temperature"];
}

export default function Temperature(props: TemperatureProps) {
  return (
    <div className="prose flex items-center justify-center gap-10 prose-p:!m-0">
      <p className="text-8xl font-normal text-primary">
        {props.temperature.Metric.Value}°
      </p>
      <div className="prose flex flex-col justify-between gap-[10px] prose-p:!m-0 prose-p:px-[13px] prose-p:py-1 ">
        <p className="cardGradient text-4xl font-black text-primary">
          {props.temperature.Metric.Unit}
        </p>
        <p className="cardGradient text-4xl font-black text-primary">
          {props.temperature.Imperial.Unit}
        </p>
      </div>
    </div>
  );
}
