"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { sleep } from "@/lib/utils";
import useGpsLoader from "@/state/gpsLoader.state";
import type { City } from "@/types/weather/city.type";

// Geo component that ask for the user's location and if param does not exist in url, then add city param to the url of nearest city
function Geo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { setLoading } = useGpsLoader();
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    if (searchParams.get("city")) return;
    if (dialogRef.current) {
      dialogRef.current?.showModal();
      dialogRef.current!.style.display = "flex";
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        let data: City;
        setLoading(true);
        if (process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY) {
          const response = await fetch(
            `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&q=${latitude}%2C${longitude}&toplevel=true`,
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
        router.push(`${pathname}${query}`, { scroll: false });
      },
    );
    // return () => {
    //   navigator?.geolocation?.clearWatch(watch);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 hidden max-w-md items-center justify-center rounded bg-secondary p-10 backdrop:bg-black/50"
    >
      <p className="text-white">
        you can give us your location to show you the weather of your city or
        deny it and we will try to get nearest city from your ip address.
      </p>
    </dialog>
  );
}

export default Geo;
