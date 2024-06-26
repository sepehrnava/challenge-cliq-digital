"use client";

import React from "react";

import useGps from "@/utils/hooks/useGps";

interface GeoProps {
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

// Geo component that ask for the user's location and if param does not exist in url, then add city param to the url of nearest city
function Geo(props: GeoProps) {
  const { city, getGpsHandler } = useGps();

  React.useEffect(() => {
    if (city) props.setValue(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    <>
      <button
        title="fill the input with your location"
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        onClick={getGpsHandler}
        aria-label="Get your location"
      >
        <svg
          width={20}
          height={20}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27 14H24.1113M24.1113 14C24.1113 16.6819 23.0466 19.2532 21.1502 21.1495C19.2539 23.0459 16.6819 24.1113 14 24.1113M24.1113 14C24.1113 11.3181 23.0466 8.74545 21.1502 6.84909C19.2539 4.95273 16.6819 3.88874 14 3.88874M14 1V3.88874M14 3.88874C11.3183 3.88874 8.74649 4.95266 6.85026 6.84889C4.95403 8.74512 3.88874 11.317 3.88874 13.9986C3.88874 16.6803 4.95403 19.2521 6.85026 21.1484C8.74649 23.0446 11.3183 24.1113 14 24.1113M1 14H3.88874M14 27V24.1113"
            stroke="currentColor"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
          />
          <path
            d="M14.004 19.7771C15.5363 19.7771 17.0058 19.1684 18.0893 18.0849C19.1728 17.0014 19.7815 15.5319 19.7815 13.9996C19.7815 12.4674 19.1728 10.9978 18.0893 9.91435C17.0058 8.83086 15.5363 8.22217 14.004 8.22217C12.4718 8.22217 11.0022 8.83086 9.91875 9.91435C8.83526 10.9978 8.22656 12.4674 8.22656 13.9996C8.22656 15.5319 8.83526 17.0014 9.91875 18.0849C11.0022 19.1684 12.4718 19.7771 14.004 19.7771Z"
            stroke="currentColor"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
          />
        </svg>
      </button>
      {/* <dialog
      ref={dialogRef}
      className="fixed inset-0 hidden max-w-md items-center justify-center rounded bg-secondary p-10 backdrop:bg-black/50"
    >
      <p className="text-white">
        You can provide us access to your location so we can display the weather
        in your city, or you can refuse it and we&apos;ll use your IP address to
        determine the closest city.
      </p>
    </dialog> */}
    </>
  );
}

export default React.memo(Geo);
