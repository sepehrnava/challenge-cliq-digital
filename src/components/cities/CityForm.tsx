import type { City } from "@/types/weather/city.type";

import CitiesLayout from "./Cities.layout";
// import { type ComboBoxCities } from "./CitiesComboBox";

async function getTopCities() {
  let data: City[] = [];
  if (process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY) {
    const response = await fetch(
      `https://dataservice.accuweather.com/locations/v1/topcities/150?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}`,
      { cache: "no-store" },
    );
    data = await response.json();
  } else {
    data = (await import("@/data/150.json")).data;
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
  return data;
}

interface CityFormProps {
  // selectedCity?: string;
}

export default async function CityForm(_props: CityFormProps) {
  const cities = await getTopCities();

  return <CitiesLayout citiesInComboBox={cities} />;
}
