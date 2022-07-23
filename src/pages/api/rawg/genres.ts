import { NextApiRequest, NextApiResponse } from 'next';
import { RAWG_API } from '@utils/constants';
import { ITagsGenresResponse } from '@ts/interfaces/api/rawgInterfaces';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(
      `${RAWG_API}/genres?key=${process.env.RAWG_API_KEY}`
    );

    const data: ITagsGenresResponse = await response.json();
    const resData: ITagsGenresResponse = {
      ...data,
      results: data.results.filter(
        genre =>
          genre.slug !== 'family' &&
          genre.slug !== 'indie' &&
          genre.slug !== 'shooter' &&
          genre.slug !== 'sports' &&
          genre.slug !== 'board-games' &&
          genre.slug !== 'educational' &&
          genre.slug !== 'racing' &&
          genre.slug !== 'platformer'
      )
    };

    res.status(200).json(resData);
  } catch (err: any) {
    res.status(400).json({ error: err });
  }
};
