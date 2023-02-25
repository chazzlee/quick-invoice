import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

//https://www.zipcodeapi.com/rest/<api_key>/city-zips.<format>/<city>/<state> --> get zipcode from city and state
// https://www.zipcodeapi.com/rest/<clientKey>/info.json/<zipcode>/radians

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const city = req.query.city;
  // const state = req.query.state;
  // const response = await fetch(
  //   `https://www.zipcodeapi.com/rest/${process.env.ZIP_API_KEY}/city-zips.json/${city}/${state}`,
  //   { headers: { Accept: "application/json" } }
  // );

  const zipCode = req.query.zipCode;
  const response = await fetch(
    `https://www.zipcodeapi.com/rest/${process.env.ZIP_API_KEY}/info.json/${zipCode}/radians`
  );
  const data = await response.json();

  res.status(200).json({ city: data.city, state: data.state });
}

//TODO: error codes from api
// 400	The request format was not correct.
// 401	The API key was not found, was not activated, or has been disabled.
// 404	A zip code you provided was not found.
// 429	The usage limit for your application has been exceeded for the hour time period.
