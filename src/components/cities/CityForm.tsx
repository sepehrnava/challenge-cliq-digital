import type { City } from "../../types/weather/city.type";
import ComboboxDemo, { type ComboBoxCities } from "./CitiesComboBox";

async function getTopCities(): Promise<ComboBoxCities[]> {
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

  const cities: ComboBoxCities[] = data.map((city) => ({
    id: city.Key,
    value: city.LocalizedName.toLowerCase(),
    // capitalize the first letter of the city name
    label:
      city.LocalizedName.charAt(0).toUpperCase() + city.LocalizedName.slice(1),
  }));
  return cities;
}

export default async function CityForm() {
  const cities = await getTopCities();

  return (
    <div>
      <ComboboxDemo citiesInComboBox={cities} />
    </div>
  );
}
