import type { NextPage } from 'next';
import Link from 'next/link';
import { useRef } from 'react';

import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';

import SEO from '@components/common/seo';
import ExternalLink from '@components/common/externalLink';
import CardImgBg from '@components/common/cardImgBg';

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
        background="linear-gradient(-45deg,rgba(0, 0, 53, 1) 0%,rgba(0, 86, 175, 1) 100%)"
        sx={{
          span: {
            zIndex: '-200'
          }
        }}
      >
        <Image
          top={0}
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="center"
          opacity={0.1}
          zIndex="-100"
          position="absolute"
          alt="Final Fantasy Illustration"
          src="/assets/img/ffxiv/free-trial-promo-art.jpg"
        />
        <Box>
          <Heading
            mb={10}
            alignSelf="start"
            borderBottom=" solid 10px"
            borderColor="cornflowerblue"
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
            fontWeight="bold"
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

      {/* place quotes of famous people who talked about the ff franchise here */}
      <Box minH="100vh">
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
              <Text fontSize="xl">
                For those who don't know, Final Fantasy is a Japanese anthology
                science fantasy media franchise created by{' '}
                <a href="https://en.wikipedia.org/wiki/Hironobu_Sakaguchi">
                  Hironobu Sakaguchi
                </a>
                , and developed and owned by{' '}
                <a href="https://square-enix-games.com/en_EU/home">
                  Square Enix
                </a>{' '}
                (formerly Square), which centers on a series of fantasy and
                science role-playing video games. The first game in the series
                was released in 1987, it already counts with 15 numbered main
                entries having been released to date.
              </Text>

              <Text fontSize="xl" mt={2}>
                The franchise has since branched into other video game genres
                and other media types (CGI films, anime, manga etc.), and it's
                still growing nowadays, making it really popular.
              </Text>
              <Text fontSize="xl" mt={2}>
                Well, here in this webpage you can explore stuff about all the
                games of the FF series, and more in depth the MMORPG FFXIV.
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
                src={'/assets/img/ff-everywhere-meme.png'}
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
              transition="background-color 0.5s linear"
              background="#0050ac"
              _hover={{
                bgColor: '#1763b4'
              }}
              _active={{
                bgColor: '#1763b4'
              }}
            >
              <CardImgBg
                h="96"
                imgUrl="/assets/img/ffx-opening-art.png"
                imgAlt="Final Fantasy Games"
              >
                <Heading
                  fontFamily="FinalFantasyFont"
                  fontSize={['4xl', null, '5xl', '6xl']}
                  color="white"
                  zIndex="200"
                  as="h3"
                >
                  Games
                </Heading>
                <Text color="white" zIndex="200" fontSize={['lg', null, 'xl']}>
                  find the gazillion games the series has
                </Text>
              </CardImgBg>
            </Box>
          </Link>

          <Link href="/ffxiv" passHref={true}>
            <Box
              as="a"
              w="100%"
              opacity="0.9"
              display="block"
              transition="background-color 0.5s linear"
              background="#0050ac"
              _hover={{
                bgColor: '#1763b4'
              }}
              _active={{
                bgColor: '#1763b4'
              }}
            >
              <CardImgBg
                h="96"
                imgUrl="/assets/img/ffxiv/data-center-travel-system.jpg"
                imgAlt="Final Fantasy XIV"
              >
                <Heading
                  fontFamily="FinalFantasyFont"
                  fontSize={['4xl', null, '5xl', '6xl']}
                  color="white"
                  zIndex="2"
                  as="h3"
                >
                  FFXIV
                </Heading>
                <Text color="white" zIndex="2" fontSize={['lg', null, 'xl']}>
                  explore info and stuff from the popular mmo
                </Text>
              </CardImgBg>
            </Box>
          </Link>
        </SimpleGrid>
      </Box>

      <Box pt={[32, null, null]} px={[8, 12, 24, 32]}>
        <Heading textColor="brand.500" as="h1" fontSize="6xl" pb={8}>
          But...? where all this data came from?
        </Heading>
        <SimpleGrid
          gap={[8, 10, null, 12, 20]}
          columns={[1, null, null, 2]}
          pb={10}
        >
          <Box>
            <Text fontSize="xl" pb={4}>
              If you're wondering if someone had to make a big excel document
              and whole databases of the FF series, ye, someone had to do it,
              not me though. Even you can get all of the info in this website
              via some wonderful APIs made by some <b>fantasy</b>tastic
              developers you can find bellow:
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
