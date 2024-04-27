"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

import type { City } from "@/types/weather/city.type";

// Geo component that ask for the user's location and if param does not exist in url, then add city param to the url of nearest city
function Geo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // const [city, setCity] = React.useState("");
  // const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (searchParams.get("city")) {
      // setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      let data: City;
      if (process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY) {
        const response = await fetch(
          `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&q=${latitude}%2C${longitude}&toplevel=true`,
          { cache: "no-store" },
        );
        data = await response.json();
      } else {
        // @ts-ignore
        data = (await import("@/data/150.json")).data;
        await new Promise<void>((resolve) => {
          setTimeout(resolve, 1000);
        });
      }
      current.set("city", data.Key);
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`, { scroll: false });
    });
    // return () => {
    //   navigator?.geolocation?.clearWatch(watch);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}

export default Geo;
