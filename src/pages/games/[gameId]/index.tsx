import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import Loading from '@components/feedback/loading';
import Error from '@components/feedback/error';
import SEO from '@components/seo';
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

import {
  getGame,
  getGameScreenshots,
  getGameStoreLinks,
  getGameTrailers
} from '@services/rawgApi';

import { capitalizeString } from '@utils/helpers/capitalizeString';
import { server } from '@utils/config/server';

import type { IGameDetail } from '@ts/interfaces/rawgInterfaces';

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

            <Flex
              alignItems="center"
              bgColor="brand.500"
              justify="center"
              opacity="0.9"
              position="absolute"
              zIndex="-100"
              h="2xl"
              w="full"
            >
              {gameDetails.data.background_image && (
                <Image
                  top={0}
                  w="full"
                  h="full"
                  objectFit="cover"
                  objectPosition="center"
                  opacity={0.2}
                  position="absolute"
                  filter="sepia(100%) hue-rotate(173deg)"
                  alt={`${gameDetails.data.name} Image`}
                  src={gameDetails.data.background_image_additional}
                />
              )}
            </Flex>

            <Flex
              mx="auto"
              maxW={['91.666667%%', '83.333333%', null, '75%']}
              flexDir="row"
              flexWrap="wrap"
            >
              <Box>
                <Image
                  h="80"
                  w="48"
                  borderColor="blue.300"
                  borderRadius="md"
                  objectFit="cover"
                  src={gameDetails.data.background_image}
                  fallbackSrc="/assets/img/placeholder.png"
                  alt={`${gameDetails.data.name} Image`}
                />
              </Box>
              <Box w="75%" mx="auto">
                <Heading
                  p="8"
                  as="h1"
                  fontSize="9xl"
                  color="brand.800"
                  textAlign="center"
                >
                  {gameDetails.data.name}
                </Heading>
                {gameDetails.data?.website && (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={gameDetails.data.website}
                  >
                    <Button
                      variant="ghost"
                      aria-label="Game Website"
                      leftIcon={
                        <Icon icon="bx:bx-link" width="25px" height="25px" />
                      }
                    >
                      official website
                    </Button>
                  </Link>
                )}
              </Box>
              <Box px={[12, null, 24, 32]} py={16}>
                <Box pb={10}>
                  <Text textAlign="center">
                    Released at {gameDetails.data.released}
                  </Text>
                </Box>

                <Box>
                  <Text>{gameDetails.data.description_raw}</Text>
                </Box>
              </Box>
            </Flex>

            <Box py="24" bgColor="brand.400" textColor="white">
              <Box mx="auto" maxW={['91.666667%%', '83.333333%', null, '75%']}>
                <Heading textAlign="center" as="h2" pb={10}>
                  Info
                </Heading>
                <Grid
                  gridTemplateColumns={['1fr', null, null, '1fr 1fr 1fr']}
                  pb={10}
                >
                  <Box>
                    <Heading as="h3" pb={4}>
                      Developers
                    </Heading>

                    <Text>
                      {gameDetails.data.developers.map((dev, i) =>
                        i === gameDetails.data.developers.length - 1
                          ? dev.name
                          : `${dev.name}, `
                      )}
                    </Text>
                  </Box>

                  <Box>
                    <Heading as="h3" pb={4}>
                      Misc
                    </Heading>

                    <Text>Metacritic: {gameDetails.data.metacritic}</Text>
                    <Text>
                      Achievements:{' '}
                      {gameDetails.data?.achievements_count
                        ? gameDetails.data.achievements_count
                        : 'This game has no achievements'}
                    </Text>
                  </Box>
                </Grid>

                <Grid
                  pt={8}
                  gridTemplateColumns={['1fr', null, '1fr 1fr']}
                  gap={[10, null, 20]}
                >
                  <Box width="100%">
                    <Heading as="h2" pb={8}>
                      Tags that describe this game:
                    </Heading>

                    {gameDetails.data.genres.length ? (
                      <Text>
                        {gameDetails.data.genres.map((item, i) =>
                          gameDetails.data.genres.length !== i && i !== 0
                            ? `${capitalizeString(item.name)}, `
                            : capitalizeString(item.name)
                        )}
                      </Text>
                    ) : (
                      <>
                        <Text>
                          I guess this game doesn't have any genres...
                        </Text>
                      </>
                    )}
                  </Box>
                  <Box height="medium" width="100%">
                    <Heading as="h2" pb={8}>
                      Tags that describe this game:
                    </Heading>

                    {gameDetails.data.tags.length ? (
                      <Text>
                        {gameDetails.data.tags.map((item, i) =>
                          gameDetails.data.tags.length !== i && i !== 0
                            ? `${capitalizeString(item.name)}, `
                            : capitalizeString(item.name)
                        )}
                      </Text>
                    ) : (
                      <>
                        <Text>I guess this game doesn't have any tags...</Text>
                      </>
                    )}
                  </Box>
                </Grid>
              </Box>
            </Box>

            <SimpleGrid columns={[1, null, null, 2]}>
              <Box textAlign="center" px={[12, null, 24, 32]} pt={16} pb={10}>
                <Heading textAlign="center" as="h2" pb={10}>
                  Trailers
                </Heading>
              </Box>

              <Box textAlign="center" px={[12, null, 24, 32]} pt={16} pb={10}>
                <Heading textAlign="center" as="h2" pb={10}>
                  Screenshots
                </Heading>
              </Box>
            </SimpleGrid>
          </>
        )
      ) : null}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params: { gameId }
}) => {
  const res = await fetch(`${server}/api/rawg/game/${gameId}`);

  const json = await res.json();

  console.log(json);

  return {
    props: {
      gameId,
      json
    }
  };
};

export default GamePage;
