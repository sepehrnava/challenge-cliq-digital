import type { AvailableUnits } from "@/components/currentWeather/Tempreature";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Marquee from "@/components/ui/Marquee";
import type { FutureForecastAPI } from "@/types/weather/FutureForecast";

async function get5DaysForecast(locationKey: string, unit?: AvailableUnits) {
  let data: FutureForecastAPI;
  if (process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY) {
    const response = await fetch(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&metric=${unit === "Imperial" ? "false" : "true"}`,
    );
    data = await response.json();
  } else {
    if (unit === "Imperial") {
      data = (await import("@/data/5days-Imperial.json")) as FutureForecastAPI;
    } else {
      data = (await import("@/data/5days-Metric.json")) as FutureForecastAPI;
    }
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
  return data;
}

interface FutureForecastProps {
  locationKey: string;
  unit?: AvailableUnits;
}

export default async function FutureForecast(props: FutureForecastProps) {
  const forecasts = await get5DaysForecast(props.locationKey, props.unit);
  return (
    <div>
      <Carousel>
        <CarouselContent className="lg:justify-center">
          {forecasts.DailyForecasts.map((forecast, index) => (
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
                    <div className="flex w-full items-center justify-between">
                      <p className="!mt-0 ml-[-7px] text-5xl font-black text-primary">
                        {forecast.Temperature.Maximum.Value.toFixed(0)}°
                      </p>
                      <p className="!mt-3 mr-[-9px] text-4xl font-black">
                        {forecast.Temperature.Minimum.Value.toFixed(0)}°
                      </p>
                    </div>

                    <Marquee className="!mt-0">
                      {forecast.Day.PrecipitationType ||
                        forecast.Day.IconPhrase.split(" ")
                          .slice(0, 2)
                          .join(" ")}
                    </Marquee>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>
  );
}
