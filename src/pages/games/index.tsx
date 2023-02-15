import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Icon } from '@iconify/react';

import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
  useToast
} from '@chakra-ui/react';

import SEO from '@components/seo';
import Error from '@components/feedback/error';
import Loading from '@components/feedback/loading';

import { indexGames } from '@services/rawgApi';

import { server } from '@utils/config/server';
import { addParamsToGetRequest } from '@utils/helpers/addParamsToGetRequest';

import type { GetServerSideProps, NextPage } from 'next';
import type { IGame, IGamesResponse } from '@ts/interfaces/rawgInterfaces';
import { AnimatePresence } from 'framer-motion';

const filters = [
  { name: 'Date Released ↓', val: '-released' },
  { name: 'Date Released ↑', val: 'released' },
  { name: 'Name ↓', val: '-name' },
  { name: 'Name ↑', val: 'name' },
  { name: 'Rating ↓', val: '-rating' },
  { name: 'Rating ↑', val: 'rating' },
  { name: 'Metacritic ↓', val: '-metacritic' },
  { name: 'Metacritic ↑', val: 'metacritic' }
];

const Games: NextPage<{ initialGames: IGamesResponse }> = ({
  initialGames
}) => {
  const toast = useToast();
  const [intersectionRef, setIntersectionRef] = useState(null);
  const [didIntersect, setDidIntersect] = useState(false);
  const [orderBy, setOrderBy] = useState(filters[0]);
  const [platform, setPlatform] = useState(null);

  // refs
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const observer = useRef(
    typeof window !== 'undefined'
      ? new IntersectionObserver(entries => {
          const el = entries[entries.length - 1];
          setDidIntersect(el.isIntersecting);
        })
      : null
  );

  /**
   * start observing the intersectionRef when its possible
   * the ref starts as null so we need to wait a bit
   */
  useEffect(() => {
    if (intersectionRef) {
      observer?.current.observe(intersectionRef);
    }

    return () => {
      if (intersectionRef) {
        observer?.current.unobserve(intersectionRef);
      }
    };
  }, [intersectionRef]);

  /**
   * check the didIntersect state that is changing
   * if so we add 1 to the pageNum and check if it's less or equal tha maxPage
   */
  useEffect(() => {
    if (didIntersect) {
      if (hasNextPage) {
        fetchNextPage();
      } else {
        observer?.current.unobserve(intersectionRef);
      }
    }
  }, [didIntersect]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    isSuccess,
    refetch
  } = useInfiniteQuery({
    queryKey: ['games', orderBy.val],
    queryFn: ({ pageParam }) =>
      indexGames({
        pageParam,
        filters: {
          search: 'Final Fantasy',
          ordering: orderBy.val,
          search_exact: true,
          publishers: 308
        }
      }),
    getNextPageParam: lastPage => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const getParam = url.searchParams.get('page');

        return { page: +getParam };
      } else {
        return false;
      }
    }
    /*  initialData: {
      pageParams: [undefined],
      pages: [initialGames]
    },
    staleTime: 1000 */
  });

  useEffect(() => {
    console.log(error);
  }, [isError]);

  // TODO => finish platform filter
  // TODO => for initial loading set skeleton cards
  // TODO => test error scenarios

  console.log('fetching np =>', isFetchingNextPage);

  return (
    <>
      <SEO
        title="Games"
        description="Find all, really all, the games the final fantasy franchise has to offer"
      />
      <Box mx="auto" maxW={['91.666667%%', '83.333333%', null, '75%']} py="16">
        <Heading fontSize="8xl" as="h1" pt="2" color="brand.800">
          All Games
        </Heading>

        <Text mt="-1" mb="5">
          Look at all the final fantasies bellow! Do they even end?
        </Text>

        <Box>
          {error ? (
            <Error />
          ) : (
            <>
              <Flex flexDir="row" flexWrap="wrap" gap="6" mb="10">
                <Skeleton
                  height="40px"
                  isLoaded={!isLoading}
                  fadeDuration={0.3}
                >
                  <Box>
                    <Menu>
                      <MenuButton
                        as={Button}
                        shadow="base"
                        colorScheme="gray"
                        fontWeight="normal"
                        rightIcon={<Icon icon="bx:chevron-down" />}
                      >
                        <Box as="span" color="brand.300">
                          Order by:
                        </Box>{' '}
                        {orderBy.name}
                      </MenuButton>
                      <MenuList
                        bgColor="gray.200"
                        fontSize="sm"
                        fontWeight="normal"
                      >
                        {filters.map((item, i) => (
                          <MenuItem
                            key={i}
                            value={item.val}
                            onClick={() => setOrderBy(item)}
                            fontWeight={
                              orderBy.val === item.val ? 'bold' : 'normal'
                            }
                            _hover={{
                              bgColor: 'brand.500',
                              color: 'white'
                            }}
                            _active={{
                              bgColor: 'brand.500',
                              color: 'white'
                            }}
                          >
                            <Flex
                              w="full"
                              flex="row"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Box as="span">{item.name}</Box>
                              {orderBy.val === item.val ? (
                                <Icon icon="bx-check" width={20} height={20} />
                              ) : null}
                            </Flex>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </Box>
                </Skeleton>

                <Skeleton
                  height="40px"
                  isLoaded={!isLoading}
                  fadeDuration={0.3}
                >
                  <Box>
                    <Menu>
                      <MenuButton
                        as={Button}
                        shadow="base"
                        colorScheme="gray"
                        fontWeight="normal"
                        rightIcon={<Icon icon="bx:chevron-down" />}
                      >
                        Platforms
                      </MenuButton>
                      <MenuList fontSize="sm" fontWeight="normal">
                        <MenuItem>Download</MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>
                </Skeleton>
              </Flex>

              <SimpleGrid columns={[1, null, 2, 3, 4]} gap={8}>
                {data?.pages.map((page, pageIndex) =>
                  page?.results.map((game: IGame, i: number) => {
                    return (
                      <Flex
                        top="0"
                        as={Link}
                        key={game.id}
                        border="2px"
                        boxShadow="md"
                        display="flex"
                        flexDir="column"
                        borderRadius="lg"
                        bgColor="brand.600"
                        borderColor="blue.300"
                        position="relative"
                        href={`/games/${game.id}`}
                        bgGradient="linear(to-br, brand.300, brand.700)"
                        transition="all"
                        transitionDuration="0.2s"
                        ref={
                          !hasNextPage
                            ? null
                            : pageIndex === data.pages.length - 1
                            ? setIntersectionRef
                            : null
                        }
                        _hover={{
                          top: '-5px',

                          img: {
                            opacity: '100%'
                          }
                        }}
                        _active={{
                          top: '-5px',
                          img: {
                            opacity: '100%'
                          }
                        }}
                      >
                        <Box w="100%" position="relative">
                          <Image
                            borderBottomRightRadius={0}
                            borderBottomLeftRadius={0}
                            borderTopLeftRadius="md"
                            borderTopRightRadius="md"
                            height="48"
                            w="full"
                            opacity="65%"
                            objectFit="cover"
                            transition="ease-in-out"
                            transitionDuration="0.2s"
                            src={game.background_image}
                            fallbackSrc="/assets/img/placeholder.png"
                            alt={
                              game.background_image
                                ? `${game.name} Image`
                                : 'Placeholder'
                            }
                          />
                        </Box>
                        <Box py="6" px="8" w="100%" textColor="white">
                          <Heading
                            as="h4"
                            h="90px"
                            pb="4"
                            noOfLines={2}
                            fontSize="4xl"
                            letterSpacing="wide"
                          >
                            {game.name}
                          </Heading>
                          <Flex gap="2" flexDir="row" alignItems="center">
                            <Icon icon="bx:bxs-game" />
                            <Text fontSize="md" noOfLines={1}>
                              {game.genres.map(genre => genre.name).join(', ')}
                            </Text>
                          </Flex>
                          <Flex gap="2" flexDir="row" alignItems="center">
                            <Icon icon="bx:bx-calendar" />
                            <Text fontSize="md">
                              {game.tba ? 'To be announced' : game.released}
                            </Text>
                          </Flex>
                          <Flex gap="2" flexDir="row" alignItems="center">
                            <Icon icon="bx:bxs-star" />
                            <Text fontSize="md">
                              {game.rating || 'No rating yet'}
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                    );
                  })
                )}
                {isFetchingNextPage || isLoading
                  ? Array.from(Array(10).keys()).map(i => (
                      <AnimatePresence key={`skeleton ${i}`} mode="sync">
                        <Box
                          gap="4"
                          border="2px"
                          boxShadow="md"
                          display="flex"
                          flexDir="column"
                          borderRadius="lg"
                          bgColor="brand.600"
                          borderColor="blue.300"
                        >
                          <Skeleton
                            borderBottomRightRadius={0}
                            borderBottomLeftRadius={0}
                            borderTopLeftRadius="md"
                            borderTopRightRadius="md"
                            height="48"
                            w="full"
                          />
                          <Box py="6" px="8" w="100%" textColor="white">
                            <SkeletonText
                              h="90px"
                              pb="4"
                              noOfLines={2}
                              fontSize="4xl"
                              letterSpacing="wide"
                            />
                            <Flex gap="2" flexDir="row" alignItems="center">
                              <Icon icon="bx:bxs-game" />
                              <SkeletonText fontSize="md" noOfLines={1} />
                            </Flex>
                            <Flex gap="2" flexDir="row" alignItems="center">
                              <Icon icon="bx:bx-calendar" />
                              <SkeletonText fontSize="md" noOfLines={1} />
                            </Flex>
                            <Flex gap="2" flexDir="row" alignItems="center">
                              <Icon icon="bx:bxs-star" />
                              <SkeletonText fontSize="md" noOfLines={1} />
                            </Flex>
                          </Box>
                        </Box>
                      </AnimatePresence>
                    ))
                  : null}
              </SimpleGrid>
              {data?.pages && !hasNextPage ? (
                <Flex justifyContent="center" textAlign="center">
                  Well, you found all the fantasy games, but, will the keep
                  coming out until the end?
                </Flex>
              ) : null}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const initialParams = addParamsToGetRequest({
    search: 'Final Fantasy',
    ordering: 'descending',
    search_exact: true,
    publishers: 308
  });

  const res = await fetch(`${server}/api/rawg/games?page=1&${initialParams}`);
  const json: IGamesResponse = await res.json();

  return {
    props: {
      initialGames: json
    }
  };
};

export default Games;
