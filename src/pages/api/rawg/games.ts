import type { IGamesResponse } from '@ts/interfaces/rawgInterfaces';
import type { NextApiRequest, NextApiResponse } from 'next';

import { RAWG_API } from '@utils/constants';
import { addParamsToGetRequest } from '@utils/helpers/addParamsToGetRequest';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  console.log(query);

  try {
    const response = await fetch(
      `${RAWG_API}/games?${addParamsToGetRequest({
        ...query,
        key: process.env.RAWG_API_KEY
      })}`
    );
    const data: IGamesResponse = await response.json();
    res.status(200).json(data);
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};
