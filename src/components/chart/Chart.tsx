/* eslint-disable consistent-return */

"use server";

import type { HourlyForecast } from "@/types/weather/hourlyForecast.type";

type DailyEvolutions = {
  total: number;
  time: string;
};

async function getDailyEvolutions(
  location?: string,
): Promise<DailyEvolutions[] | undefined> {
  if (!location) return;
  let data: HourlyForecast[];
  if (process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY) {
    const response = await fetch(
      `https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${location}?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&metric=true`,
    );
    data = await response.json();
  } else {
    data = (await import("@/data/12hours.london.json")).data;
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
  // first 6 data
  const dailyEvolutions = data.slice(0, 6).map((dailyForecast) => {
    const date = new Date(dailyForecast.DateTime);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return {
      total: dailyForecast.Temperature.Value,
      time: `${hours}:${minutes}`,
    };
  });
  return dailyEvolutions;
}

async function Chart({ location }: { location?: string }) {
  const data = await getDailyEvolutions(location);
  if (!data)
    return (
      <div className="">
        <p>select a city to view daily Evolutions chart.</p>
      </div>
    );
  const chartWidth = 1200;
  const chartHeight = 400;
  const offsetY = 30;
  const paddingX = 50;
  const paddingY = 50;
  const maxY = Math.max(...data.map((item) => item.total));

  const properties = data.map((property, index) => {
    const { total, time } = property;
    const x = (index / data.length) * (chartWidth - paddingX) + paddingX / 2;
    const y =
      chartHeight -
      offsetY -
      (total / maxY) * (chartHeight - (paddingY + offsetY)) -
      paddingY +
      offsetY;
    return {
      time,
      x,
      y,
    };
  });

  const points = properties.map((point) => {
    const { x, y } = point;
    return `${x},${y}`;
  });

  return (
    <svg
      className="overflow-visible"
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      role="presentation"
    >
      <polyline
        fill="none"
        className="stroke-primary"
        strokeWidth={2}
        points={`${points}`}
      />

      {properties.map((property, index) => {
        const { time, x, y } = property;

        return (
          <g key={index}>
            <circle
              className="fill-primary"
              cx={x}
              cy={y}
              r={12}
              strokeWidth={2}
            />

            <g
              transform={`translate(${x - paddingX} ${chartHeight - (paddingY - offsetY)})`}
              // className="prose"
            >
              <text
                textAnchor="start"
                fontSize={36}
                className="select-none fill-white"
              >
                {time}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

export default Chart;
