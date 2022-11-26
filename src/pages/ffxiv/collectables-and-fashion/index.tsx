import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';

import CardBg from '@components/common/cardImgBg';
import SEO from '@components/common/seo';
import { capitalizeString } from '@utils/helpers/capitalizeString';

const Fashion: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <SEO
        title="FFXIV Collectables and Fashion"
        description="Check lots of stuff related to the hottest FF MMORPG ever in the block, FFXIV"
      />

      <Box px={[12, null, 24, 32]} py={16}>
        <Heading
          as="h1"
          pb={6}
          color="brand.800"
          fontSize={['5xl', null, null, '8xl']}
        >
          FFXIV Collectables and Fashion Stuff
        </Heading>
        <Text fontSize="2xl">
          FFXIV has a lot of things to collect, a humongous amount of things to
          get. Of course, you need to work hard to get all of these
          collectables, these things don't come effortlessly from the aether
          realm or something.
        </Text>
        <Text pt={1} fontSize="2xl">
          The collectables presented bellow are only a sample of all available
          collectables in the game, because, you could count and add to this
          list fish, crafting recipes, sighseeings etc.. But, of course, that
          would make the list giant, so I chose some of the "more relevant"
          collectables in the game (yup, it won't work for everyone, I know).
        </Text>
        <Text pt={4} fontSize="2xl">
          Well, for more info about collectables you can check FFXIV and for
          each of items listed bellow there are a couple of websites recommended
          in each page of the items.
        </Text>
      </Box>

      <Grid
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
            name: 'relics',
            description: 'shiny, precious and hard to obtain equipment',
            img: 'relic-weapons-alt.png'
          },
          {
            name: 'achievements',
            description: "gotta achieve 'em all",
            img: 'lodestone.jpeg'
          },
          {
            name: 'mounts',
            description: 'your trustworthy rides through Eorza',
            img: 'mount.jpg'
          },
          {
            name: 'minions',
            description: 'little friends of yours',
            img: 'minions.jpg'
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
          <Link
            key={i}
            href={`${router.pathname}/${item.name}`}
            passHref={true}
          >
            <Box
              w="100%"
              opacity="0.9"
              display="block"
              transition="background-color 1s linear"
              background="#0064d7"
              sx={{
                '&:hover, &:active': {
                  background: '#2f93ff'
                }
              }}
            >
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
            </Box>
          </Link>
        ))}
      </Grid>
    </>
  );
};

export default Fashion;
