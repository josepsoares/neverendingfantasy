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
                <Heading as="h2" textColor="white">
                  {capitalizeString(item.name)}
                </Heading>
                <Text textColor="white">{item.description}</Text>
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
            name: 'relic weapons',
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
                <Heading as="h2" textColor="white">
                  {capitalizeString(item.name)}
                </Heading>
                <Text textColor="white">{item.description}</Text>
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
                <Heading as="h2" textColor="white">
                  {capitalizeString(item.name)}
                </Heading>
                <Text textColor="white">{item.description}</Text>
              </CardBg>
            </Box>
          </Link>
        ))}
      </Grid>
    </>
  );
};

export default Fashion;
