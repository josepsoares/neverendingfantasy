import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box, Grid, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import CardBg from '@components/cardBgImg';
import SEO from '@components/seo';

import { capitalizeString } from '@utils/helpers/capitalizeString';

const CollectablesAndFashion: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <SEO
        title="FFXIV Collectables and Fashion"
        description="Check lots of stuff related to the hottest FF MMORPG ever in the block, FFXIV"
      />

      <Box mx="auto" maxW={['91.666667%%', '83.333333%', null, '75%']} py="16">
        <Heading
          pb="6"
          as="h1"
          color="brand.800"
          fontSize={['5xl', null, null, '8xl']}
        >
          FFXIV Collectables and Fashion Stuff
        </Heading>
        <Text fontWeight="medium" fontSize="2xl" pb="4">
          FFXIV has a lot, and I mean a LOT, of things to collect. Of course,
          you need to work hard to get all of these collectables, these things
          don't come effortlessly from the aether realm or something.
        </Text>
        <Text fontSize="xl" pb="4">
          The collectables presented bellow are only a sample of all available
          collectables in the game, because, you could count and add to this
          list fish, crafting recipes, sighseeings etc.. But, of course, that
          would make the list giant, so I chose some of the "cool" collectables
          in the game (yup, it won't work for everyone, I know).
        </Text>
        <Text fontSize="xl">
          If you want to check out all the collectables from the game you can
          visit the{' '}
          <Link
            href="https://ffxivcollect.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            FFXIV Collect
          </Link>{' '}
          and{' '}
          <Link
            href="https://triad.raelys.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Another Triple Triad Tracker
          </Link>{' '}
          (specific for triple triad) websites
        </Text>
      </Box>

      <SimpleGrid templateColumns={['1fr', null, 'repeat(2, 1fr)']}>
        {[
          {
            name: 'mounts',
            description: 'your trustworthy rides through Eorza',
            img: 'mount.jpg'
          },
          {
            name: 'minions',
            description: 'little friends of yours',
            img: 'minions.jpg'
          }
        ].map((item, i) => (
          <Link key={i} href={`${router.pathname}/${item.name}`}>
            <CardBg
              h={64}
              radii={false}
              imgUrl={`/assets/img/ffxiv/${item.img}`}
              imgAlt={`${capitalizeString(item.name)} Image`}
            >
              <Heading
                as="h2"
                textColor="white"
                textAlign="center"
                fontSize={['4xl', null, '6xl']}
              >
                {item.name.replaceAll('-', ' ')}
              </Heading>
              <Text
                textAlign="center"
                textColor="white"
                fontSize={['xl', null, '2xl']}
              >
                {item.description}
              </Text>
            </CardBg>
          </Link>
        ))}
      </SimpleGrid>

      <SimpleGrid
        templateColumns={[
          '1fr',
          null,
          'repeat(2, 1fr)',
          null,
          'repeat(3, 1fr)'
        ]}
      >
        {[
          {
            name: 'armoire',
            description: 'all the pieces of clothing you can imagine',
            img: 'fashion-alt.jpg'
          },
          {
            name: 'accessories',
            description: 'fashionable acessories to pamper you character',
            img: 'umbrellas.jpg'
          },
          {
            name: 'emotes',
            description: 'expressing yourself is the key for success',
            img: 'emote-collage.jpg'
          },
          {
            name: 'achievements',
            description: "gotta achieve 'em all",
            img: 'lodestone.jpeg'
          },
          {
            name: 'triple-triad-cards',
            description: 'that cool and complicated card minigame',
            img: 'triple-triad-cards.jpg'
          },
          {
            name: 'orchestrions',
            description: 'music is an outburst of the soul',
            img: 'orchestrion.webp'
          }
        ].map((item, i) => (
          <Link key={i} href={`${router.pathname}/${item.name}`}>
            <CardBg
              h={64}
              radii={false}
              imgUrl={`/assets/img/ffxiv/${item.img}`}
              imgAlt={`${capitalizeString(item.name)} Image`}
            >
              <Heading
                as="h2"
                textColor="white"
                textAlign="center"
                fontSize={['4xl', null, '6xl']}
              >
                {item.name.replaceAll('-', ' ')}
              </Heading>
              <Text
                textAlign="center"
                textColor="white"
                fontSize={['xl', null, '2xl']}
              >
                {item.description}
              </Text>
            </CardBg>
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
};

export default CollectablesAndFashion;
