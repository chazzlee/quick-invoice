import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

//https://www.zipcodeapi.com/rest/<api_key>/city-zips.<format>/<city>/<state>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const city = req.query.city;
  const state = req.query.state;

  const response = await fetch(
    `https://www.zipcodeapi.com/rest/${process.env.ZIP_API_KEY}/city-zips.json/${city}/${state}`,
    { headers: { Accept: "application/json" } }
  );
  const data = await response.json();
  res.status(200).json(data);
}
