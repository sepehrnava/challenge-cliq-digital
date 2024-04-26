import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { FutureForecastAPI } from "@/types/weather/FutureForecast";

async function get5DaysForecast(locationKey: string) {
  let data: FutureForecastAPI;
  if (process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY) {
    const response = await fetch(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&metric=true`,
    );
    data = await response.json();
  } else {
    data = (await import("@/data/5days.json")) as FutureForecastAPI;
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
  return data;
}

interface FutureForecastProps {
  locationKey: string;
}

export default async function FutureForecast(props: FutureForecastProps) {
  const forecasts = await get5DaysForecast(props.locationKey);
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-4xl"
      >
        <CarouselContent>
          {forecasts.DailyForecasts.map((forecast, index) => (
            <CarouselItem
              key={index}
              className="h-[395px] md:basis-1/2 lg:basis-1/5"
            >
              <div className="size-full">
                <Card className="cardGradient size-full !border-none !outline-none">
                  <CardContent className="flex size-full flex-col items-center justify-end p-6">
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
                    <div className="flex">
                      <p className="text-5xl font-black text-primary">
                        {forecast.Temperature.Maximum.Value}°
                      </p>
                      <p className="text-4xl font-black">
                        {forecast.Temperature.Minimum.Value}°
                      </p>
                    </div>

                    <p>
                      {forecast.Day.PrecipitationType ||
                        forecast.Day.ShortPhrase.split(" ")
                          .slice(0, 2)
                          .join(" ")}
                    </p>
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
