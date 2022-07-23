import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

import SEO from '@components/common/seo';
import ExternalLink from '@components/common/externalLink';

import { apiLinks, ffResourcesLinks } from '@utils/constants';

const Home: NextPage = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () =>
    contentRef.current &&
    contentRef.current.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <SEO title="Home" />

      <Flex
        p={[12, null, 24, 32]}
        position="relative"
        flexDir="column"
        alignItems="center"
        justifyContent="space-between"
        boxShadow="lg"
        minH="100vh"
        zIndex="100"
        color="white"
        sx={{
          position: 'relative',
          background:
            'linear-gradient(-45deg,rgba(0, 0, 53, 1) 0%,rgba(0, 86, 175, 1) 100%)',
          span: {
            zIndex: '-200'
          },
          img: {
            zIndex: '-200'
          }
        }}
      >
        <Image
          alt="Final Fantasy Illustration"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="overlay-img"
          placeholder="blur"
          src={require('../assets/img/ffxiv-lodestone.jpeg')}
        />
        <Box>
          <Heading
            alignSelf="start"
            className="title"
            fontSize={['7xl', '8xl', '9xl', '12rem']}
            as="h1"
          >
            Neverending Fantasy
          </Heading>
          <Heading fontSize={['5xl', '6xl', '7xl']} as="h2">
            the franchise, with final in its name, which never ends
          </Heading>
          <Text mt={10} fontSize={['md', '2xl', '3xl']} color="#dae8ff">
            Made by the japanese company -{' '}
            <Link href="https://en.wikipedia.org/wiki/Square_(video_game_company)">
              <a>Square</a>
            </Link>{' '}
            - known for its innovation, visuals, such as the inclusion of
            full-motion videos (FMVs), photorealistic character models, silly
            clothes and hairsyles, and music by{' '}
            <Link href="https://open.spotify.com/artist/3V79CTgRnsDdJSTqKitROv">
              <a>Nobuo Uematsu</a>
            </Link>
            .
          </Text>
          <Text
            mt={2}
            fontSize={['md', '2xl', '3xl']}
            weight="bold"
            color="#dae8ff"
          >
            This is just a silly fan, tribute and informative page of the FF
            games.
          </Text>
          <Text my={10} fontSize="md" color="#dae8ff">
            ALL FINAL FANTASY GAMES CONTENT IS PROPERTY OF SQUARE ENIX CO., LTD
          </Text>
        </Box>

        <Button
          size="lg"
          colorScheme="whiteAlpha"
          textColor="brand"
          onClick={scrollToContent}
          leftIcon={
            <Icon
              icon="bx:bx-down-arrow-alt"
              color="white"
              height="25px"
              width="25px"
            />
          }
        >
          Start Exploring
        </Button>
      </Flex>

      <Box
        ref={contentRef}
        pt={[20, null, null, 32]}
        px={[8, 12, 24, null]}
        pb={10}
      >
        <Flex
          gap={[8, 10, null, 12, 20]}
          flexDir="row"
          flexWrap="wrap"
          justifyContent={['center', null]}
          pb={20}
        >
          <Box
            order={[2, null, null, 1]}
            w={['full', null, null, '60%']}
            pt={[null, null, null, 12]}
            fontSize="lg"
          >
            <Text>
              For those who don't know, Final Fantasy is a Japanese anthology
              science fantasy media franchise created by{' '}
              <a href="https://en.wikipedia.org/wiki/Hironobu_Sakaguchi">
                Hironobu Sakaguchi
              </a>
              , and developed and owned by{' '}
              <a href="https://square-enix-games.com/en_EU/home">Square Enix</a>{' '}
              (formerly Square).
            </Text>
            <Text>
              It's somewhat old, basically an adult, and it centers on a series
              of fantasy and science role-playing video games. The first game in
              the series was released in 1987, it already counts with 15
              numbered main entries having been released to date.
            </Text>
            <Text>
              The franchise has since branched into other video game genres as
              well as branching into other media (CGI films, anime, manga etc.).
            </Text>
            <Text>
              Still, here in the Neverending Fantasy webpage you can explore
              only the games of the FF series, you can do it bellow
            </Text>
          </Box>

          <Flex
            justifyContent="center"
            alignItems="center"
            w={['100%', 'auto']}
            order={[1, null, null, 2]}
          >
            <Image
              alt="Final Fantasy Everywhere"
              width={400}
              height={300}
              placeholder="blur"
              src={require('../assets/img/ff-everywhere-meme.png')}
              objectFit="cover"
            />
          </Flex>
        </Flex>
      </Box>

      <SimpleGrid columns={[1, null, null, 2]}>
        <Link href="/games" passHref={true}>
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
            <Flex
              p={8}
              height="96"
              flexDir="column"
              position="relative"
              boxShadow="base"
              justifyContent="center"
              alignItems="center"
              color="white"
            >
              <Image
                alt="Final Fantasy Games"
                src={require('../assets/img/FFX_HD_Opening.png')}
                placeholder="blur"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="overlay-img-w-round"
              />
              <Heading
                fontFamily="FinalFantasyFont"
                fontSize={['4xl', null, '5xl', '6xl']}
                zIndex="200"
                as="h3"
              >
                Games
              </Heading>
              <Text zIndex="200" fontSize={['lg', null, 'xl']}>
                find the gazillion games the series has
              </Text>
            </Flex>
          </Box>
        </Link>

        <Link href="/ffxiv" passHref={true}>
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
            <Flex
              p={8}
              height="96"
              flexDir="column"
              position="relative"
              boxShadow="base"
              justifyContent="center"
              alignItems="center"
              color="white"
            >
              <Image
                alt="Final Fantasy XIV"
                src={require('../assets/img/final-fantasy-xiv-shadowbringer.jpg')}
                placeholder="blur"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="overlay-img-w-round"
              />
              <Heading
                fontFamily="FinalFantasyFont"
                fontSize={['4xl', null, '5xl', '6xl']}
                zIndex="2"
                as="h3"
              >
                FFXIV
              </Heading>
              <Text zIndex="2" fontSize={['lg', null, 'xl']}>
                explore a fashion randomizer and stuff from the popular mmo
              </Text>
            </Flex>
          </Box>
        </Link>
      </SimpleGrid>

      <Box pt={[32, null, null]} px={[8, 12, 24, 32]}>
        <Heading textColor="brand.500" as="h1" pb={8}>
          But...? where all this data came from?
        </Heading>
        <SimpleGrid
          gap={[8, 10, null, 12, 20]}
          columns={[1, null, null, 2]}
          pb={10}
        >
          <Box>
            <Text fontSize="xl" pb={4}>
              If you're wondering if someone had to make a big word or excel
              document of the FF series,ye, someone had to do it, not me though.
              You can do all this as well via some wonderful APIs made by{' '}
              <b>fantasy</b>tastic developers you can find bellow:
            </Text>
            <ul>
              {apiLinks.map(({ url, text }, i) => (
                <li key={i}>
                  <ExternalLink link={url}>{text}</ExternalLink>
                </li>
              ))}
            </ul>
          </Box>

          <Box>
            <Text fontSize="xl" pb={4}>
              If you feel like diving more in the franchising there are a couple
              of resources that could be helpful, both for the experts and
              noobs:
            </Text>
            <ul>
              {ffResourcesLinks.map(({ url, text }, i) => (
                <li key={i}>
                  <ExternalLink link={url}>{text}</ExternalLink>
                </li>
              ))}
            </ul>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
