/* eslint-disable no-continue */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */

import { sleep } from "@/lib/utils";
import type { HourlyForecast } from "@/types/weather/hourlyForecast.type";

type DailyEvolutions = {
  total: number;
  time: string;
};

async function getDailyEvolutions(
  location: string,
): Promise<DailyEvolutions[]> {
  let data: HourlyForecast[];
  if (process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY) {
    const response = await fetch(
      `https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${location}?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&metric=true`,
    );
    data = await response.json();
  } else {
    data = (await import("@/data/12hours.london.json")).data;
    await sleep(1000);
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

async function Chart({ location }: { location: string }) {
  const data = await getDailyEvolutions(location);
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

  function svgQuadraticCurvePath() {
    const points = properties.map((point) => {
      const { x, y } = point;
      return [x, y];
    });
    if (!points?.length || !points[0] || !points[0].length || !points[0][0])
      return "";
    let path = `M${points[0][0]},${points[0][1]}`;

    for (let i = 0; i < points.length - 1; i++) {
      const xMid = (points[i]![0]! + points[i + 1]![0]!) / 2;
      const yMid = (points[i]![1]! + points[i + 1]![1]!) / 2;
      const cpX1 = (xMid + points[i]![0]!) / 2;
      const cpX2 = (xMid + points[i + 1]![0]!) / 2;
      path += `Q ${cpX1}, ${points[i]![1]}, ${xMid}, ${yMid} Q ${cpX2}, ${
        points[i + 1]![1]
      }, ${points[i + 1]![0]}, ${points[i + 1]![1]}`;
    }

    return path;
  }

  return (
    <svg
      id="chart"
      className="svgAnimation overflow-visible"
      viewBox={`0 0 ${chartWidth - 200} ${chartHeight}`}
      role="presentation"
    >
      <path
        fill="none"
        className="stroke-primary"
        strokeWidth={10}
        d={svgQuadraticCurvePath()}
      />

      {properties.map((property, index) => {
        const { time, x, y } = property;

        return (
          <g key={index}>
            <circle
              className="fill-primary"
              cx={x}
              cy={y}
              r={15}
              strokeWidth={2}
            >
              <title>{`${time} - ${data[index]!.total}°C`}</title>
            </circle>
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
