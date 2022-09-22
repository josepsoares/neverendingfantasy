import { NextPage } from 'next';
import Link from 'next/link';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';

import CardBg from '@components/common/cardImgBg';
import SEO from '@components/common/seo';
import { capitalizeString } from '@utils/helpers/capitalizeString';
import { useRouter } from 'next/router';

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

      <Grid templateColumns={['1fr', null, 'repeat(3, 1fr)']}>
        {[
          {
            name: 'achievements',
            description: "gotta achieve 'em all",
            img: '/assets/img/ffxiv/lodestone.jpeg'
          },
          {
            name: 'emotes',
            description: 'expressing yourself is the key for success',
            img: '/assets/img/ffxiv/emote-collage.jpg'
          },
          {
            name: 'orchestrions',
            description: 'music is an outburst of the soul',
            img: '/assets/img/ffxiv/orchestrion.webp'
          }
        ].map((item, i) => (
          <Link
            key={i}
            href={`${router.pathname}/${item.name}`}
            passHref={true}
          >
            <Box
              as="a"
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
                imgUrl={item.img}
                imgAlt={`${capitalizeString(item.name)} Image`}
              >
                <Heading
                  as="h2"
                  textColor="white"
                  fontSize={['4xl', null, '6xl']}
                >
                  {capitalizeString(item.name).replace('-', ' ')}
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

      <Grid templateColumns={['1fr', null, 'repeat(3, 1fr)']}>
        {[
          {
            name: 'accessories',
            description: 'fashionable acessories to pamper you character',
            img: 'umbrellas.jpg'
          },
          {
            name: 'armoire',
            description: 'all the pieces of clothing you can imagine',
            img: 'fashion-alt.jpg'
          },
          {
            name: 'relic-weapons',
            description: 'shiny, precious and hard to obtain weapons',
            img: 'relic-weapons-alt.png'
          }
        ].map((item, i) => (
          <Link
            key={i}
            href={`${router.pathname}/${item.name}`}
            passHref={true}
          >
            <Box
              as="a"
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
                  fontSize={['4xl', null, '6xl']}
                >
                  {capitalizeString(item.name).replace('-', ' ')}
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

      <Grid templateColumns={['1fr', null, 'repeat(2, 1fr)']}>
        {[
          {
            name: 'mounts',
            description: 'your trustworthy rides through Eorza',
            img: '/assets/img/ffxiv/mount.jpg'
          },
          {
            name: 'minions',
            description: 'little friends of yours',
            img: '/assets/img/ffxiv/minions.jpg'
          }
        ].map((item, i) => (
          <Link
            key={i}
            href={`${router.pathname}/${item.name}`}
            passHref={true}
          >
            <Box
              as="a"
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
                imgUrl={item.img}
                imgAlt={`${capitalizeString(item.name)} Image`}
              >
                <Heading
                  as="h2"
                  textColor="white"
                  fontSize={['4xl', null, '6xl']}
                >
                  {capitalizeString(item.name).replace('-', ' ')}
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
