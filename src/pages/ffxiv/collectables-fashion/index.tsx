import { NextPage } from 'next';
import Link from 'next/link';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';

import CardBg from '@components/common/cardBg';
import SEO from '@components/common/seo';
import { capitalizeString } from '@utils/helpers/capitalizeString';

const Fashion: NextPage = () => {
  return (
    <>
      <SEO
        title="FFXIV Collectables and Fashion"
        description="Check lots of stuff related to the hottest FF MMORPG ever in the block, FFXIV"
      />

      <Box px={[12, null, 24, 32]} py={16}>
        <Heading as="h1" pb={6} textColor="brand.500">
          FFXIV Collectables and Fashion Stuff
        </Heading>
        <p>
          It centers on a series of fantasy and science role-playing video
          games. The first game in the series was released in 1987, but, even
          thought it has final on its name, it already counts with 15 numbered
          main entries having been released to date.
        </p>
        <p>
          the franchise has since branched into other video game genres such as
          tactical role-playing, action role-playing, massively multiplayer
          online role-playing, racing, third-person shooter, fighting, and
          rhythm, as well as branching into other media, including CGI films,
          anime, manga, and novels.
        </p>
      </Box>

      <Link href="/ffxiv/collectables-fashion/achievements" passHref={true}>
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
            imgUrl="img/ffxiv/ffxiv-lodestone.jpeg"
            imgAlt="Lodestone Image"
            radii={false}
          >
            <Heading textColor="white" as="h2">
              Achievements
            </Heading>
            <Text textColor="white">
              find updated news about the FFXIV world
            </Text>
          </CardBg>
        </Box>
      </Link>

      <Grid templateColumns={['1fr', null, 'repeat(2, 1fr)', 'repeat(3, 1fr)']}>
        {[
          { name: 'accessories' },
          { name: 'armoire' },
          { name: 'hairstyles' }
        ].map((item, i) => (
          <Link
            key={i}
            href={`/ffxiv/collectables-fashion/${item.name}`}
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
                imgUrl="img/ffxiv/ffxiv-classjobs.jpg"
                imgAlt="Class Jobs"
                radii={false}
              >
                <Heading as="h2" textColor="white">
                  {capitalizeString(item.name)}
                </Heading>
                <Text textColor="white">explore simular ff games</Text>
              </CardBg>
            </Box>
          </Link>
        ))}
      </Grid>

      <Grid templateColumns={['1fr', null, 'repeat(2, 1fr)']} pb={10}>
        {[{ name: 'minions' }, { name: 'mounts' }].map((item, i) => (
          <Link
            key={i}
            href={`/ffxiv/collectables-fashion/${item.name}`}
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
                imgUrl="img/ffxiv/ffxiv-classjobs.jpg"
                imgAlt="Class Jobs"
                radii={false}
              >
                <Heading as="h2" textColor="white">
                  {capitalizeString(item.name)}
                </Heading>
                <Text textColor="white">explore simular ff games</Text>
              </CardBg>
            </Box>
          </Link>
        ))}
      </Grid>
    </>
  );
};

export default Fashion;
