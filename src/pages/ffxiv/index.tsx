import { NextPage } from 'next';
import Link from 'next/link';

import SEO from '@components/common/seo';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import CardBg from '@components/common/cardBg';
import BgBlueBox from '@components/common/bgBlueBox';

const FFXIVPage: NextPage = () => {
  return (
    <>
      <SEO
        title="FFXIV Stuff"
        description="Check lots of stuff related to the hottest FF MMORPG ever in the block, FFXIV"
      />

      <Box px={[12, null, 24, 32]} py={16}>
        <Heading as="h1" pb={6} textColor="brand.500">
          FFXIV stuff
        </Heading>
        <Text pb={4}>
          Final Fantasy XIV is a massively multiplayer online role-playing game
          (MMORPG) developed and published by Square Enix. Directed and produced
          by Naoki Yoshida, it was released worldwide for Microsoft Windows and
          PlayStation 3 in August 2013, as a replacement for the failed 2010
          version of the game, with support for PlayStation 4, PlayStation 5,
          and macOS releasing later. Final Fantasy XIV takes place in the
          fictional land of Eorzea, five years after the events of the original
          2010 release.
        </Text>
        <Text>
          You can check out here things about FFXIV, you know, collectables,
          class jobs, raids, dungeons, the oyster is your world
        </Text>
      </Box>

      <Link href="/ffxiv/collectables-fashion" passHref={true}>
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
            h={80}
            imgUrl="img/ffxiv/ffxiv-fashion.jpg"
            imgAlt="Fashion Image"
            radii={false}
          >
            <Heading textColor="white" as="h2">
              Collectables and Fashion
            </Heading>
            <Text textColor="white">
              collectables, fashion things and a randomizer
            </Text>
          </CardBg>
        </Box>
      </Link>

      <Grid templateColumns={['1fr', null, 'repeat(2, 1fr)', 'repeat(3, 1fr)']}>
        <Link href="/ffxiv/classjobs" passHref={true}>
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
              imgUrl="img/ffxiv/ffxiv-classjobs.jpg"
              imgAlt="Class Jobs"
              radii={false}
            >
              <Heading zIndex="2" textColor="white" as="h2">
                Class Jobs
              </Heading>
              <Text zIndex="2" textColor="white">
                explore all the cool class jobs your character can do
              </Text>
            </CardBg>
          </Box>
        </Link>

        <Link href="/ffxiv/instances" passHref={true}>
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
              imgUrl="img/ffxiv/ffxiv-dungeon.jpg"
              imgAlt="Class Jobs"
              radii={false}
            >
              <Heading zIndex="2" textColor="white" as="h2">
                Instances
              </Heading>
              <Text zIndex="2" textColor="white">
                the raids, the dungeons, the excitment
              </Text>
            </CardBg>
          </Box>
        </Link>

        <Link href="/ffxiv/triple-triad" passHref={true}>
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
              imgUrl="img/ffxiv/ffxiv-triple-triad.jpg"
              imgAlt="Triple Triad Image"
              radii={false}
            >
              <Heading as="h2" textColor="white">
                Triple Triad
              </Heading>
              <Text textColor="white">aim to be the ace of cards in ffxiv</Text>
            </CardBg>
          </Box>
        </Link>
      </Grid>
    </>
  );
};

export default FFXIVPage;
