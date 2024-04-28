import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { sleep } from "@/lib/utils";
import useCityLoader from "@/state/cityLoader.state";
import type { City } from "@/types/weather/city.type";

// a react hook to get the location from the user
const useGps = () => {
  const [city, setCity] = React.useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { setLoading } = useCityLoader();

  const getGpsHandler = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        let data: City;
        setLoading("fetching nearest city from your location...");
        if (process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY) {
          const response = await fetch(
            `/api/geo?latitude=${latitude}&longitude=${longitude}`,
          );
          data = await response.json();
        } else {
          data = (await import("@/data/150.json")).data[0]!;
          await sleep();
        }
        setLoading(false);
        if (!data.Key) {
          return;
        }
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set("city", data.Key);
        const search = current.toString();
        const query = search ? `?${search}` : "";
        setCity(data.LocalizedName);
        router.push(`${pathname}${query}`, { scroll: false });
      },
      async () => {
        // try to get the city from the user's ip address
        const ipResponse = await fetch("https://ipapi.co/json/");
        const ipData: { ip: string } = await ipResponse.json();
        const { ip } = ipData;
        let data: City;
        if (process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY) {
          const cityResponse = await fetch(
            `https://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&q=${ip}`,
          );
          data = await cityResponse.json();
        } else {
          data = (await import("@/data/150.json")).data[0]!;
          await sleep();
        }
        if (!data.Key) {
          return;
        }
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set("city", data.Key);
        const search = current.toString();
        const query = search ? `?${search}` : "";
        setCity(data.LocalizedName);
        router.push(`${pathname}${query}`, { scroll: false });
      },
    );
  };

  return { city, getGpsHandler };
};

export default useGps;
