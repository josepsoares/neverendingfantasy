import { NextPage } from 'next';
import Link from 'next/link';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';

import SEO from '@components/common/seo';
import CardBg from '@components/common/cardImgBg';

const TripleTriad: NextPage = () => {
  return (
    <>
      <SEO
        title="Triple Triad - FFXIV"
        description="Dig into the info of the Triple Triad card minigame in FFXIV. Cards, decks, packs, you name it"
      />
      <Box px={[12, null, 24, 32]} py={16}>
        <Heading color="brand.800" fontSize="8xl" as="h1" pb={8}>
          Triple Triad
        </Heading>

        <Text fontSize="2xl">
          Triple Triad is a card battle mini-game originally from Final Fantasy
          VIII. It was released alongside Gold Saucer in patch 2.51. Players can
          collect Triple Triad Cards from various sources. Winning a Triple
          Triad match against a Triple Triad NPC will earn the player
          Manderville Gold Saucer Points and sometimes new cards.
        </Text>
      </Box>

      <Grid templateColumns={['1fr', null, 'repeat(2, 1fr)']}>
        {[
          {
            name: 'Cards',
            description: 'Cards of new characters and familiar faces'
          },
          {
            name: 'NPCs',
            description:
              'Discover multiple NPCs that can be challenged to Triple Triad matches'
          }
        ].map(({ name, description }, i) => (
          <Link
            key={i}
            href={`/ffxiv/triple-triad/${name.toLowerCase()}`}
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
                h={96}
                radii={false}
                imgUrl={`/assets/img/ffxiv/triple-triad-${name.toLowerCase()}.jpg`}
                imgAlt={`${name.toLowerCase()} Image`}
                imgPosition={name === 'NPCs' ? 'top' : 'center'}
              >
                <Heading textColor="white" as="h2">
                  {name}
                </Heading>
                <Text textColor="white">{description}</Text>
              </CardBg>
            </Box>
          </Link>
        ))}
      </Grid>
    </>
  );
};

export default TripleTriad;
