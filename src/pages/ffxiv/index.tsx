import { NextPage } from 'next';
import Link from 'next/link';

import SEO from '@components/common/seo';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import CardBg from '@components/common/cardImgBg';

const FFXIVPage: NextPage = () => {
  return (
    <>
      <SEO
        title="FFXIV Stuff"
        description="Check lots of stuff related to the hottest FF MMORPG ever in the block, FFXIV"
      />

      <Box px={[12, null, 24, 32]} py={16}>
        <Heading color="brand.800" fontSize="8xl" as="h1" pb={8}>
          FFXIV stuff
        </Heading>
        <Text fontWeight="medium" fontSize="2xl" pb={4}>
          Did you know that the critically acclaimed MMORPG Final Fantasy XIV
          has a free trial, and includes the entirety of A Realm Reborn AND the
          award-winning Heavensward expansion up to level 60 with no
          restrictions on playtime? Sign up, and enjoy Eorzea today!
        </Text>

        <Text fontSize="2xl" pb={4}>
          Well, for serious now, Final Fantasy XIV is directed and produced by
          Naoki Yoshida, it was released worldwide for Microsoft Windows and
          PlayStation 3 in August 2013, as a replacement for the failed 2010
          version of the game, with support for PlayStation 4, PlayStation 5,
          and macOS releasing later. Final Fantasy XIV takes place in the
          fictional land of Eorzea, five years after the events of the original
          2010 release.
        </Text>

        <Text fontSize="2xl">
          You can check out here things about FFXIV, you know, collectables,
          class jobs, raids, dungeons, the oyster is your world, enjoy!
        </Text>
      </Box>

      <Grid templateColumns={['1fr', null, 'repeat(2, 1fr)']}>
        <Link href="/ffxiv/classjobs" passHref={true}>
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
              h={80}
              imgUrl="/assets/img/ffxiv/classjobs.jpg"
              imgAlt="Class Jobs"
              radii={false}
            >
              <Heading
                zIndex="2"
                textColor="white"
                as="h2"
                fontSize={['4xl', null, '6xl']}
              >
                Classes and Jobs
              </Heading>
              <Text
                zIndex="2"
                textColor="white"
                textAlign="center"
                fontSize={['xl', null, '2xl']}
              >
                explore all the cool class jobs your character can do
              </Text>
            </CardBg>
          </Box>
        </Link>

        <Link href="/ffxiv/instances">
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
              h={80}
              imgUrl="/assets/img/ffxiv/midgardsormr.webp"
              imgAlt="Class Jobs"
              radii={false}
            >
              <Heading
                zIndex="2"
                textColor="white"
                as="h2"
                fontSize={['4xl', null, '6xl']}
              >
                Instances
              </Heading>
              <Text
                zIndex="2"
                textColor="white"
                textAlign="center"
                fontSize={['xl', null, '2xl']}
              >
                the raids, the dungeons, the excitment
              </Text>
            </CardBg>
          </Box>
        </Link>
      </Grid>

      <Grid templateColumns={['1fr']}>
        <Link href="/ffxiv/collectables-and-fashion">
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
              h="30rem"
              imgUrl="/assets/img/ffxiv/fashion.jpg"
              imgAlt="Fashion Image"
              radii={false}
            >
              <Heading
                textColor="white"
                as="h2"
                fontSize={['4xl', null, '6xl']}
              >
                Collectables and Fashion
              </Heading>
              <Text
                zIndex="2"
                textColor="white"
                textAlign="center"
                fontSize={['xl', null, '2xl']}
              >
                collectables, fashion things and stuff
              </Text>
            </CardBg>
          </Box>
        </Link>
      </Grid>
    </>
  );
};

export default FFXIVPage;
