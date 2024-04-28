import type { City } from "@/types/weather/city.type";

export async function GET(request: Request) {
  // get latitude longitude or ip address from query
  const query = new URLSearchParams(request.url.split("?")[1]);
  const { latitude, longitude, ip } = Object.fromEntries(query.entries());
  let data: City;
  if (latitude && longitude) {
    const response = await fetch(
      `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&q=${latitude}%2C${longitude}&toplevel=true`,
    );
    data = await response.json();
  } else if (ip) {
    const cityResponse = await fetch(
      `https://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&q=${ip}`,
    );
    data = await cityResponse.json();
  } else {
    // if no query, return 400
    return new Response(null, {
      status: 400,
    });
  }
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
