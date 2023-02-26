import { isKeyOf } from "@/utils/isKey";
import type { NextApiRequest, NextApiResponse } from "next";
import { setTimeout } from "timers/promises";

type LocationData = {
  city: string;
  state: string;
};

type ZipCodeData = {
  zipCode: string;
};

type ResponseData = LocationData | ZipCodeData;

const SAMPLE_ZIPCODES = {
  NY: { city: "New York", zipCode: "10025" },
  NJ: { city: "Palisades Park", zipCode: "07650" },
  DE: { city: "Dover", zipCode: "19903" },
};
const SAMPLE_CITY_AND_STATES = {
  "10025": {
    city: "New York",
    state: "NY",
  },
  "19903": {
    city: "Dover",
    state: "DE",
  },
  "07650": {
    city: "Palisades Park",
    state: "NJ",
  },
};

async function fetchZipCodeFromCityAndState(
  city: string,
  state: string
): Promise<ZipCodeData> {
  // const response = await fetch(
  //   `https://www.zipcodeapi.com/rest/${process.env.ZIP_API_KEY}/city-zips.json/${city}/${state}`,
  //   { headers: { Accept: "application/json" } }
  // );
  // const data = await response.json();
  // return { zipCode: data.zip_codes?.[0] };
  try {
    if (
      isKeyOf(SAMPLE_ZIPCODES, state) &&
      SAMPLE_ZIPCODES[state].city.toLowerCase() === city.toLowerCase()
    ) {
      const result: ZipCodeData = { zipCode: SAMPLE_ZIPCODES[state].zipCode };
      return await setTimeout(500, result);
    }
    return await setTimeout(500, { zipCode: "" });
  } catch (ex) {
    return await setTimeout(500, { zipCode: "Not found" });
  }
}

async function fetchCityAndStateFromZipCode(
  zipCode: string
): Promise<LocationData> {
  const ZIPCODE_LENGTH = 5;
  // const response = await fetch(
  //   `https://www.zipcodeapi.com/rest/${process.env.ZIP_API_KEY}/info.json/${zipCode}/radians`,
  //   { headers: { Accept: "application/json" } }
  // );
  // const data = await response.json();
  // return { city: data.city, state: data.state };
  try {
    if (isKeyOf(SAMPLE_CITY_AND_STATES, zipCode)) {
      const result: LocationData = {
        city: SAMPLE_CITY_AND_STATES[zipCode].city,
        state: SAMPLE_CITY_AND_STATES[zipCode].state,
      };
      return await setTimeout(500, result);
    } else {
      return await setTimeout(500, { city: "", state: "" });
    }
  } catch (ex) {
    return await setTimeout(500, { city: "Not found", state: "Not found" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | { error: string }>
) {
  const zipCode = req.query.zipCode as string;
  const city = req.query.city as string;
  const state = req.query.state as string;

  try {
    if (zipCode && !city && !state) {
      const data = await fetchCityAndStateFromZipCode(zipCode);
      res.status(200).json(data);
    } else {
      const data = await fetchZipCodeFromCityAndState(city, state);
      res.status(200).json(data);
    }
  } catch (ex) {
    //TODO:
    console.error(ex);
    res.status(500).json({ error: "something went wrong" });
  }
}

//TODO: error codes from api
// 400	The request format was not correct.
// 401	The API key was not found, was not activated, or has been disabled.
// 404	A zip code you provided was not found.
// 429	The usage limit for your application has been exceeded for the hour time period.

//https://www.zipcodeapi.com/rest/<api_key>/city-zips.<format>/<city>/<state> --> get zipcode from city and state
// https://www.zipcodeapi.com/rest/<clientKey>/info.json/<zipcode>/radians --> get city and state from zipcode
