import type { IGameDetail } from '@ts/interfaces/rawgInterfaces';
import type { GetServerSideProps, NextPage } from 'next';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';

import Container from '@components/container';
import Error from '@components/feedback/error';
import Loading from '@components/feedback/loading';
import GameMediaCarousel from '@components/gameMediaCarousel';
import SEO from '@components/seo';
import {
  getGame,
  getGameScreenshots,
  getGameStoreLinks,
  getGameTrailers
} from '@services/rawgApi';
import { server } from '@utils/config/server';
import { _cap } from '@utils/helpers/string';

const GamePage: NextPage<{ gameId: number; game: IGameDetail }> = ({
  gameId,
  game
}) => {
  const gameDetails = useQuery(
    ['game-details', gameId],
    () => getGame(gameId),
    { initialData: game }
  );

  /*   const gameTrailers = useQuery(
    ['game-trailers', gameId],
    () => getGameTrailers(gameId),
    {
      enabled: !!gameDetails?.data?.movies_count
    }
  );

  const gameScreenshots = useQuery(
    ['game-screenshots', gameId],
    () => getGameScreenshots(gameId),
    {
      enabled: !!gameDetails?.data?.screenshots_count
    }
  );

  const gameStoreLinks = useQuery(
    ['game-store-links', gameId],
    () => getGameStoreLinks(gameId),
    {
      enabled: !!gameDetails?.data?.stores
    }
  ); */

  console.log(gameDetails?.data);
  console.log(
    !!gameDetails?.data?.movies_count,
    !!gameDetails?.data?.screenshots_count,
    !!gameDetails?.data?.stores
  );

  console.log();

  // console.log(gameTrailers, gameScreenshots, gameStoreLinks);

  return (
    <>
      {gameDetails.error ? (
        <Box px={[12, null, 24, 32]} py={16}>
          <Error />
        </Box>
      ) : gameDetails.isLoading ? (
        <Box px={[12, null, 24, 32]} py={16}>
          <Loading />
        </Box>
      ) : gameDetails?.data ? (
        gameDetails?.data?.detail ? (
          <>
            <SEO title="error" />
            <Box px={[12, null, 24, 32]} py={16}>
              <Heading as="h1">Couldn't find game data</Heading>
            </Box>
          </>
        ) : (
          <>
            <SEO
              title={gameDetails.data.name}
              description={gameDetails.data.description}
            />

            <Container py="16">
              <Heading fontSize="8xl" as="h1" pt="2" color="brand.800">
                {gameDetails.data.name}
              </Heading>
              <Text fontSize="xs" fontStyle="italic">
                The data presented in this page was fetched from the{' '}
                <Link
                  href="https://rawg.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RAWG Videogame Database
                </Link>
              </Text>

              <Box pt="8" h="500px">
                <Image
                  h="100%"
                  w="full"
                  borderColor="blue.300"
                  borderTopRadius="md"
                  objectFit="cover"
                  src={gameDetails.data.background_image}
                  fallbackSrc="/assets/img/placeholder.png"
                  alt={`${gameDetails.data.name} Image`}
                />
              </Box>
              <Flex
                py="8"
                color="white"
                flexDir="column"
                borderBottomRadius="md"
                px={['4', null, '10', '12']}
                bgGradient="linear(to-br, brand.300, brand.700)"
              >
                <Flex flexDir="row" flexWrap="wrap" gap="5" pb="10">
                  <Text>
                    <b>Released date:</b> {gameDetails.data.released}
                  </Text>

                  <Text>
                    <b>Developers:</b>{' '}
                    {gameDetails.data.developers
                      .map(dev => dev.name)
                      .join(', ')}
                  </Text>

                  {gameDetails.data.genres.length ? (
                    <Text>
                      <b>Genres:</b>{' '}
                      {gameDetails.data.genres
                        .map(item => _cap(item.name))
                        .join(', ')}
                    </Text>
                  ) : null}

                  <Text>
                    <b>Platforms:</b>{' '}
                    {gameDetails.data?.platforms
                      .map(item => item.platform.name)
                      .join(', ')}
                  </Text>

                  <Text>
                    <b>Metacritic:</b> {gameDetails.data.metacritic}
                  </Text>
                </Flex>
                <Text>{gameDetails.data.description_raw}</Text>
              </Flex>

              <Box pt="20">
                <Heading fontSize="6xl" as="h1" pt="2" color="brand.800">
                  Here, some tags, trailers and screenshots
                </Heading>
                <Text fontSize="3xl" mt="-2" color="brand.800">
                  to help you establish an image of the game in your head
                </Text>

                <Box pt="10">
                  <Heading fontSize="5xl" as="h2" pb="2" color="brand.600">
                    The <i>'fantasytags'</i>
                  </Heading>
                  {gameDetails.data.tags.length ? (
                    <Flex flexDir="row" flexWrap="wrap" gap="2">
                      {gameDetails.data.tags.map((item, i) => (
                        <Button
                          key={i}
                          as={Link}
                          colorScheme="blue"
                          borderRadius="md"
                          fontWeight="normal"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://rawg.io/tags/${item.slug}`}
                        >
                          # {_cap(item.name)}
                        </Button>
                      ))}
                    </Flex>
                  ) : (
                    <Text>I guess this game doesn't have any tags...</Text>
                  )}
                </Box>

                <Box pt="10">
                  <Heading fontSize="5xl" as="h2" pb="2" color="brand.600">
                    Trailers / Screenshots
                  </Heading>

                  {gameDetails.data.tags.length ||
                  gameDetails.data.tags.length ? (
                    <GameMediaCarousel slides={[]} />
                  ) : (
                    <Text>I guess this game doesn't have any tags...</Text>
                  )}
                </Box>
              </Box>

              <Box pt="10">
                <Heading fontSize="6xl" as="h1" color="brand.800">
                  To conclude... Should you partake on this "Final Fantasy"?
                </Heading>

                <Text fontSize="3xl" mt="-2" color="brand.800">
                  well, check out some ratings and/or reviews to help you decide
                </Text>

                <Box pt="6">
                  <SimpleGrid
                    templateColumns={['1fr', null, '1fr 1fr', null, '']}
                    gap="4"
                  >
                    {gameDetails.data.ratings.map((item, i) => (
                      <Box
                        key={i}
                        pt="4"
                        pb="1"
                        px="8"
                        color="white"
                        borderRadius="md"
                        bgColor="brand.400"
                        bgGradient="linear(to-br, brand.300, brand.700)"
                      >
                        <Text pb="1">
                          <Text as="span" fontWeight="bold">
                            {item.percent}%
                          </Text>{' '}
                          players rated
                        </Text>
                        <Text
                          fontSize="5xl"
                          letterSpacing="widest"
                          fontFamily="heading"
                        >
                          {item.title}
                        </Text>
                      </Box>
                    ))}
                  </SimpleGrid>

                  <Text pt="4" fontSize="xs" fontStyle="italic">
                    The data presented in this page was fetched from the{' '}
                    <Link
                      href="https://rawg.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      RAWG Videogame Database
                    </Link>
                  </Text>

                  <Box pt="16">
                    <Heading
                      textAlign="center"
                      fontSize="5xl"
                      as="h2"
                      color="brand.600"
                    >
                      The Overall Rating for this <i>'fantasy'</i> is
                    </Heading>
                    <Heading
                      textAlign="center"
                      fontSize="7xl"
                      as="h2"
                      color="brand.600"
                    >
                      <Text as="span" color="blue.500">
                        {gameDetails.data.rating}
                      </Text>{' '}
                      / 5
                    </Heading>
                  </Box>
                </Box>
              </Box>

              <Box></Box>
            </Container>
          </>
        )
      ) : null}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params: { gameId },
  query
}) => {
  const res = await fetch(`${server}/api/rawg/game/${query.id}`);

  const json = await res.json();

  return {
    props: {
      gameId,
      json
    }
  };
};

export default GamePage;
