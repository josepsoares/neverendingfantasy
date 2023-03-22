import { useRef } from 'react';
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

import CardImgBg from '@components/cards/bgImgCard';
import Container from '@components/container';
import TestimonialItem from '@components/misc/testimonialItem';
import SEO from '@components/seo';
import {
  ffResourcesLinks,
  relevantApisLinks,
  testimonials
} from '@utils/constants';

const Home = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current &&
      window &&
      window.scrollTo({
        top: contentRef.current.getBoundingClientRect().top,
        left: 0,
        behavior: 'smooth'
      });
  };

  return (
    <>
      <SEO title="Home" />

      <Flex
        boxShadow="lg"
        minH="100vh"
        zIndex="100"
        color="white"
        flexDir="column"
        position="relative"
        alignItems="center"
        justifyContent="center"
        px={['10', null, '0']}
        bgGradient="linear(to-bl,#000035 0%,#0056af 100%)"
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
          zIndex="-100"
          opacity={0.15}
          objectFit="cover"
          position="absolute"
          objectPosition="center"
          alt="Final Fantasy Illustration"
          src="/assets/img/ffxiv/free-trial-promo-art.jpg"
        />
        <Flex justifyContent="center" alignItems="center" flexDir="column">
          <Image
            alt="Neverending Fantasy Logo"
            src="/assets/logo/nef-logo-hero-bg.png"
          />
          <Heading
            as="h2"
            fontSize="5xl"
            textAlign="center"
            fontWeight="medium"
            letterSpacing="wider"
          >
            the neverending franchise with "final" in its name
          </Heading>
          <Text
            mt="6"
            color="#dae8ff"
            textAlign="center"
            fontWeight="normal"
            fontSize={['md', 'lg', '2xl']}
          >
            This is just a silly fan-made tribute and informative website of the
            FF games.
          </Text>
          <Text
            color="#dae8ff"
            textAlign="center"
            mt={['4', null, '2']}
            fontSize={['sm', null, 'md']}
          >
            ALL FINAL FANTASY GAMES CONTENT IS PROPERTY OF SQUARE ENIX CO., LTD
          </Text>

          <Button
            p="8"
            mt="8"
            size="lg"
            fontSize="2xl"
            textColor="brand"
            alignItems="center"
            colorScheme="whiteAlpha"
            onClick={scrollToContent}
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
      </Flex>

      <Container pb="32" pt={['20', null, null, '32']}>
        <Heading
          as="h1"
          pb="8"
          fontSize="8xl"
          textColor="brand.500"
          textAlign={['left', null, 'center']}
        >
          What truly is Final Fantasy?
        </Heading>

        <Box pb="12" px={[null, null, '10']}>
          <Text fontSize="2xl">
            Well, repeating a little bit the intro above, Final Fantasy is a
            Japanese anthology media franchise made by{' '}
            <Link href="https://en.wikipedia.org/wiki/Square_(video_game_company)">
              Square Enix (formerly Square)
            </Link>{' '}
            and created by{' '}
            <a href="https://en.wikipedia.org/wiki/Hironobu_Sakaguchi">
              Hironobu Sakaguchi
            </a>
            , which centers on a series of fantasy and sci-fi role-playing video
            games. It is known for its innovation, visuals, such as the
            inclusion of full-motion videos (FMVs), photorealistic character
            models, silly clothes and hairsyles, and music by{' '}
            <Link href="https://open.spotify.com/artist/3V79CTgRnsDdJSTqKitROv">
              Nobuo Uematsu
            </Link>
            . The franchise has also branched into different game genres and
            medias including CGI films, anime, etc.
          </Text>

          <Text fontSize="2xl" pt="2">
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
          alignItems="center"
          px={[null, null, '8', '18']}
          gridTemplateColumns={[
            '1fr',
            null,
            null,
            null,
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
              gridColMd={item?.gridColMd}
              gridColLg={item?.gridColLg}
              profession={item.profession}
            />
          ))}
        </SimpleGrid>
      </Container>

      <SimpleGrid my="24" ref={contentRef} columns={1}>
        <Link href="/games">
          <CardImgBg
            h="lg"
            imgUrl="/assets/img/ffx-opening-art.png"
            imgAlt="Final Fantasy Games"
          >
            <Heading
              as="h3"
              zIndex="200"
              color="white"
              fontSize={['6xl', '8xl']}
            >
              All Games
            </Heading>
            <Text
              color="white"
              zIndex="200"
              textAlign="center"
              fontSize={['2xl', '3xl']}
            >
              find the gazillion games the series has
            </Text>
          </CardImgBg>
        </Link>

        <Link href="/ffxiv">
          <CardImgBg
            h="lg"
            imgUrl="/assets/img/ffxiv/data-center-travel-system.jpg"
            imgAlt="Final Fantasy XIV"
          >
            <Heading fontSize={['6xl', '8xl']} color="white" zIndex="2" as="h3">
              FFXIV Stuff
            </Heading>
            <Text
              zIndex="2"
              color="white"
              textAlign="center"
              fontSize={['2xl', '3xl']}
            >
              explore info and stuff from the popular mmo
            </Text>
          </CardImgBg>
        </Link>
      </SimpleGrid>

      <Container pt="32">
        <Heading
          pb="8"
          as="h1"
          fontSize="8xl"
          textColor="brand.500"
          textAlign={['left', null, 'center']}
        >
          But...? where all this data came from?
        </Heading>
        <SimpleGrid
          pb="10"
          columns={[1, null, null, 2]}
          gap={['8', '10', null, '12', '20']}
        >
          <Box>
            <Text pb="4">
              If you're wondering if someone had to make a big excel document
              and whole databases of the FF series, ye, someone had to do it,
              not me though. Even you can get all of the info in this website
              via some wonderful APIs made by some <b>fantasy</b>tastic
              developers you can find bellow:
            </Text>
            <ul>
              {relevantApisLinks.map(({ url, name }, i) => (
                <li key={i}>
                  <Link target="_blank" rel="noopener noreferrer" href={url}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>

          <Box>
            <Text pb="4">
              If you feel like diving more in the franchising there are a couple
              of resources that could be helpful, both for the experts and
              noobs:
            </Text>
            <ul>
              {ffResourcesLinks.map(({ url, name }, i) => (
                <li key={i}>
                  <Link target="_blank" rel="noopener noreferrer" href={url}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Home;
