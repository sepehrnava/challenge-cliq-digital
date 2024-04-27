import Image from "next/image";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Marquee from "@/components/ui/Marquee";

import type { FutureForecastAPI } from "../../types/weather/FutureForecast";
import { Skeleton } from "../ui/skeleton";

interface FutureForecastLayoutProps {
  forecasts?: FutureForecastAPI;
}

export default function FutureForecastLayout(
  props?: FutureForecastLayoutProps,
) {
  const DailyForecasts = props?.forecasts?.DailyForecasts || [];

  return (
    <Carousel>
      <CarouselContent className="lg:justify-center">
        {DailyForecasts.length > 0 ? (
          DailyForecasts.map((forecast, index) => (
            <CarouselItem
              key={index}
              className="h-[395px] max-w-[172px] md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="size-full">
                <Card className="cardGradient size-full !border-none !outline-none">
                  <CardContent className="flex size-full flex-col justify-end p-4">
                    <p className="text-2xl font-black text-white">
                      {new Date(forecast.Date)
                        .toLocaleString("en-US", {
                          weekday: "short",
                          day: "numeric",
                        })
                        .split(" ")
                        .reverse()
                        .join(" ")
                        .toUpperCase()}
                    </p>
                    {/* show weather icon */}
                    <Image
                      src={`https://developer.accuweather.com/sites/default/files/${forecast!.Day!.Icon! < 10 ? "0" : ""}${forecast!.Day!.Icon}-s.png`}
                      alt={forecast.Day.IconPhrase}
                      width={70}
                      height={70}
                      className="-ml-3 mb-4"
                    />
                    <div className="flex w-full items-center justify-between">
                      <p className="!mb-4 !mt-0 ml-[-7px] text-5xl font-black text-primary">
                        {forecast.Temperature.Maximum.Value.toFixed(0)}°
                      </p>
                      <p className="!mb-4 !mt-3 mr-[-9px] text-4xl font-black">
                        {forecast.Temperature.Minimum.Value.toFixed(0)}°
                      </p>
                    </div>

                    <Marquee className="!mb-4 !mt-0 lowercase">
                      {forecast.Day.PrecipitationType ||
                        forecast.Day.IconPhrase.split(" ")
                          .slice(0, 2)
                          .join(" ")}
                    </Marquee>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))
        ) : (
          <Skeleton className="h-[395px] w-[calc(5_*_172px)]" />
        )}
      </CarouselContent>
      {/* <CarouselPrevious />
        <CarouselNext /> */}
    </Carousel>
  );
}
