import { NextApiRequest, NextApiResponse } from 'next';

import { RAWG_API } from '@utils/constants';
import { IGamesResponse } from '@ts/interfaces/api/rawgInterfaces';
import { addParamsToGetRequest } from '@utils/helpers/addParamsToGetRequest';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

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
    res.status(400).json({ error: err });
  }
};
