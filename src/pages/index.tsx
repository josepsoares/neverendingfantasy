import React, { useRef } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

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
import TestimonialItem from '@components/common/testimonialItem';

import { apiLinks, ffResourcesLinks, testimonials } from '@utils/constants';

const Home: NextPage = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current &&
      window &&
      window.scrollTo({
        top: contentRef.current.getBoundingClientRect().top - 250,
        left: 0,
        behavior: 'smooth'
      });
  };

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
            borderBottom="solid 8px"
            borderColor="cornflowerblue"
            fontSize={['7xl', '8xl', '9xl', '14rem']}
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
              <a>Square Enix (formerly Square)</a>
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
          p={10}
          colorScheme="whiteAlpha"
          textColor="brand"
          onClick={scrollToContent}
          fontSize={['2xl', null, '3xl']}
          alignItems="center"
          leftIcon={
            <Icon
              width="40"
              height="40"
              icon="bx:bx-down-arrow-alt"
              color="white"
            />
          }
        >
          <Text>Start Exploring</Text>
        </Button>
      </Flex>

      {/* place quotes of famous people who talked about the ff franchise here */}
      <Box pt={[20, null, null, 32]} px={[8, 12, 24, 32]} pb={20}>
        <Heading
          textAlign="center"
          textColor="brand.500"
          as="h1"
          fontSize="8xl"
          pb={8}
        >
          What truly is Final Fantasy?
        </Heading>

        <Box pb={12} px={[2, 8, 10, 28, null]}>
          <Text fontSize="2xl">
            Well, repeating a little bit the intro above, Final Fantasy is a
            Japanese anthology media franchise created by{' '}
            <a href="https://en.wikipedia.org/wiki/Hironobu_Sakaguchi">
              Hironobu Sakaguchi
            </a>
            , which centers on a series of fantasy and sci-fi role-playing video
            games. The franchise has also branched into different game genres
            and medias including CGI films, anime, etc.
          </Text>

          <Text fontSize="2xl" mt={2}>
            But yeah, the games of the franchise can address various themes and{' '}
            <Box as="span" fontWeight="semibold" color="brand.500">
              convey different feelings and messages to the human masses
            </Box>
            , so nothing better than{' '}
            <Box as="span" fontWeight="semibold" color="brand.500">
              some quotes of various individuals about their feelings of the
              franchise:
            </Box>
          </Text>
        </Box>

        <SimpleGrid
          gap={4}
          px={[null, 6, 8, 18, null]}
          alignItems="center"
          gridTemplateColumns={[
            '1fr',
            null,
            null,
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
            'repeat(5, 1fr)',
            'repeat(7, 1fr)'
          ]}
        >
          {testimonials.map((item, i) => (
            <TestimonialItem
              key={i}
              img={item.img}
              name={item.name}
              quote={item.quote}
              gridColSm={item?.gridColSm}
              gridColMd={item?.gridColMd}
              gridColLg={item?.gridColLg}
              gridCol4K={item?.gridCol4K}
              rowLg={item.rowLg}
              profession={item.profession}
            />
          ))}
        </SimpleGrid>
      </Box>

      <SimpleGrid ref={contentRef} columns={[1, null, null, 2]} pb={6}>
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
              h="lg"
              imgUrl="/assets/img/ffx-opening-art.png"
              imgAlt="Final Fantasy Games"
              radii={false}
            >
              <Heading
                fontFamily="FinalFantasyFont"
                fontSize={['4xl', null, '6xl', '8xl']}
                color="white"
                zIndex="200"
                as="h3"
              >
                Games
              </Heading>
              <Text
                color="white"
                zIndex="200"
                textAlign="center"
                fontSize={['lg', null, '2xl', '3xl']}
              >
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
              h="lg"
              imgUrl="/assets/img/ffxiv/data-center-travel-system.jpg"
              imgAlt="Final Fantasy XIV"
              radii={false}
            >
              <Heading
                fontFamily="FinalFantasyFont"
                fontSize={['4xl', null, '6xl', '8xl']}
                color="white"
                zIndex="2"
                as="h3"
              >
                FFXIV
              </Heading>
              <Text
                color="white"
                zIndex="2"
                textAlign="center"
                fontSize={['lg', null, '2xl', '3xl']}
              >
                explore info and stuff from the popular mmo
              </Text>
            </CardImgBg>
          </Box>
        </Link>
      </SimpleGrid>

      <Box pt={[32, null, null]} px={[8, 12, 24, 32]}>
        <Heading
          textAlign="center"
          textColor="brand.500"
          as="h1"
          fontSize="8xl"
          pb={8}
        >
          But...? where all this data came from?
        </Heading>
        <SimpleGrid
          gap={[8, 10, null, 12, 20]}
          columns={[1, null, null, 2]}
          pb={10}
        >
          <Box>
            <Text pb={4}>
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
            <Text pb={4}>
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
