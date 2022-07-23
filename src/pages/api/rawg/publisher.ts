import { NextApiRequest, NextApiResponse } from 'next';

import { IPublishersDevelopersResponse } from '@ts/interfaces/api/rawgInterfaces';
import { RAWG_API } from '@utils/constants';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  try {
    const response = await fetch(
      `${RAWG_API}/publishers/${query.id}?key=${process.env.RAWG_API_KEY}`
    );
    const data: IPublishersDevelopersResponse = await response.json();
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err });
  }
};
