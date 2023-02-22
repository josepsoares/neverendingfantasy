import { NextPage } from 'next';
import Link from 'next/link';

import { Container, Grid, Heading, Text } from '@chakra-ui/react';

import SEO from '@components/seo';
import CardBg from '@components/cards/bgImgCard';

const FFXIVPage: NextPage = () => {
  return (
    <>
      <SEO
        title="FFXIV Stuff"
        description="Check lots of stuff related to the hottest FF MMORPG ever in the block, FFXIV"
      />

      <Container
        py="16"
        mx="auto"
        maxW={['91.666667%%', '83.333333%', null, '75%']}
      >
        <Heading
          pb="6"
          as="h1"
          color="brand.800"
          fontSize={['5xl', null, null, '8xl']}
        >
          FFXIV stuff
        </Heading>
        <Text fontWeight="medium" fontSize="2xl" pb="4">
          Did you know that the critically acclaimed MMORPG Final Fantasy XIV
          has a free trial, and includes the entirety of A Realm Reborn AND the
          award-winning Heavensward expansion up to level 60 with no
          restrictions on playtime? Sign up, and enjoy Eorzea today!
        </Text>

        <Text fontSize="xl" pb="4">
          Well, for serious now, Final Fantasy XIV is directed and produced by
          Naoki Yoshida, it was released worldwide for Microsoft Windows and
          PlayStation 3 in August 2013, as a replacement for the failed 2010
          version of the game, with support for PlayStation 4, PlayStation 5,
          and macOS releasing later. Final Fantasy XIV takes place in the
          fictional land of Eorzea, five years after the events of the original
          2010 release.
        </Text>

        <Text fontSize="xl">
          You can check out here things about FFXIV, you know, collectables,
          class jobs, raids, dungeons, the oyster is your world, enjoy!
        </Text>
      </Container>

      <Grid templateColumns={['1fr', null, 'repeat(2, 1fr)']}>
        <Link href="/ffxiv/classjobs" passHref={true}>
          <CardBg
            h={80}
            imgUrl="/assets/img/ffxiv/classjobs.jpg"
            imgAlt="Class Jobs"
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
        </Link>

        <Link href="/ffxiv/collectables">
          <CardBg
            h={80}
            imgUrl="/assets/img/ffxiv/fashion.jpg"
            imgAlt="FFXIV Collectables Image"
          >
            <Heading textColor="white" as="h2" fontSize={['4xl', null, '6xl']}>
              Collectables, Fashion, etc.
            </Heading>
            <Text
              zIndex="2"
              textColor="white"
              textAlign="center"
              fontSize={['xl', null, '2xl']}
            >
              collectables, fashion things and other stuff
            </Text>
          </CardBg>
        </Link>
      </Grid>
    </>
  );
};

export default FFXIVPage;
