import type { ITagGenre } from '@ts/interfaces/rawgInterfaces';
import type { NextApiRequest, NextApiResponse } from 'next';

import { RAWG_API } from '@utils/constants';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const targetedTags = [
    118, // 'Story Rich'
    31, // 'Singleplayer'
    233, // 'JRPG'
    24, // 'RPG'
    6, // 'Exploration'
    13, // 'Atmospheric'
    110, // 'Cinematic'
    175 // 'Turn-Based Combat'
  ];

  try {
    const allTagsPromise: ITagGenre[] = await Promise.all(
      targetedTags.map(async tag => {
        const tagRes = await fetch(
          `${RAWG_API}/tags/${tag}?key=${process.env.RAWG_API_KEY}`
        );
        const tagData = await tagRes.json();
        return tagData;
      })
    );

    res.status(200).json({ data: allTagsPromise });
  } catch (err: any) {
    res.status(400).json({ error: err });
  }
};
