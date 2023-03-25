import type { ICard } from '@ts/interfaces/tripleTriadInterfaces';

import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  SimpleGrid,
  Skeleton,
  Text,
  VStack
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';

import {
  CollectableCard,
  CollectableCardSkeleton
} from '@components/cards/collectableCard';
import EmptyData from '@components/feedback/emptyData';
import Error from '@components/feedback/error';
import {
  InfiniteScrollClient,
  InfiniteScrollClientItemsWrapper
} from '@components/infiniteScrollClient';
import CollectablesLayout from '@components/layouts/collectables';
import BaseModal from '@components/modal';

import { indexCards } from '@services/ffxivTripleTriadApi';
import { FFXIV_COLLECT_API } from '@utils/constants';
import { _chunk } from '@utils/helpers/arr';
import { _add, _sub } from '@utils/helpers/math';
import { _cap } from '@utils/helpers/string';
import useUpdateEffect from '@utils/hooks/useUpdateEffect';

const TripleTriadCards = () => {
  const router = useRouter();

  /**
   * query to get all the tripleTriadCards from the FFXIV Collect API
   */
  const { data, error, isLoading } = useQuery({
    queryKey: ['tripleTriadCards'],
    queryFn: indexCards,
    refetchOnWindowFocus: false
  });

  // state to control the client-side pagination/filter/sort stuff
  const [tripleTriadCards, setTripleTriadCards] = useState<{
    data: ICard[];
    areItemsPopulated: boolean;
    allItems: ICard[][];
    currentItems: ICard[][];
    currentPage: number;
    pages: number;
    hasNextPage: boolean;
  }>({
    data: [],
    areItemsPopulated: false,
    allItems: [],
    currentItems: [],
    currentPage: 0,
    pages: 0,
    hasNextPage: false
  });

  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [tripleTriadCardName, setTripleTriadCardName] = useState('');
  const [selectedTripleTriadCard, setSelectedTripleTriadCard] =
    useState<ICard | null>(null);

  const isResetButtonDisabled =
    tripleTriadCardName === '' && filter === '' && sort === '';

  /**
   * func to change the page of the state, adding more items to the displayed items
   */
  const setNextPage = () => {
    const nextPage = _add(tripleTriadCards.currentPage, 1);

    setTripleTriadCards({
      ...tripleTriadCards,
      currentItems: [
        ...tripleTriadCards.currentItems,
        tripleTriadCards.allItems[nextPage]
      ],
      currentPage: nextPage,
      hasNextPage: nextPage !== tripleTriadCards.allItems.length - 1
    });
  };

  /**
   * func to reset the states that are related to the sorting and
   * filtering of the tripleTriadCards
   */
  const resetSearchSortFilter = () => {
    const chunkedData = _chunk(tripleTriadCards.data, 12);

    flushSync(() => {
      setFilter('');
      setSort('');
      setTripleTriadCardName('');
    });
    setTripleTriadCards({
      ...tripleTriadCards,
      allItems: chunkedData,
      currentItems: [chunkedData[0]],
      pages: chunkedData.length
    });
  };

  /**
   * effect to sort the displayed tripleTriadCards according
   * to the value of the option chosen by the user in the sorting input
   */
  // TODO => adapt sort
  useUpdateEffect(() => {
    if (sort !== undefined) {
      const destructSort = sort.split('-');
      const sortProp = destructSort[0];
      const sortOrder = destructSort[1];

      const arr = [...tripleTriadCards.data];
      const allSortedItems = arr.sort((a, b) => {
        if (sortProp === 'name') {
          return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else {
          const parsedA =
            typeof a[sortProp] === 'string'
              ? parseInt(a[sortProp])
              : a[sortProp];
          const parsedB =
            typeof b[sortProp] === 'string'
              ? parseInt(b[sortProp])
              : b[sortProp];

          return sortOrder === 'asc' ? parsedA - parsedB : parsedB - parsedA;
        }
      });

      const allSortedItemsChunked = _chunk(allSortedItems, 12);

      setTripleTriadCards({
        ...tripleTriadCards,
        allItems: allSortedItemsChunked,
        currentItems: [allSortedItemsChunked[0]],
        currentPage: 0,
        hasNextPage: allSortedItemsChunked.length - 1 > 1
      });
    }
  }, [sort]);

  /**
   * effect to filter the displayed tripleTriadCards according
   * to the value of the option chosen by the user in the filter input
   */
  // TODO => adapt filter
  useUpdateEffect(() => {
    if (filter !== undefined) {
      const destructFilter = filter.split('-');
      const filterProp = destructFilter[0];
      const filterEquals = destructFilter[1];

      const allFilteredItems = tripleTriadCards.data.filter(tripleTriadCard => {
        switch (filterProp) {
          case 'stars':
            return tripleTriadCard.stars === 5;

          default:
            break;
        }
      });

      const allFilteredItemsChunked = _chunk(allFilteredItems, 12);

      setTripleTriadCards({
        ...tripleTriadCards,
        allItems: allFilteredItemsChunked,
        currentItems: [allFilteredItemsChunked[0]],
        currentPage: 0,
        pages: allFilteredItemsChunked.length,

        hasNextPage: allFilteredItemsChunked.length - 1 > 1
      });
    }
  }, [filter]);

  /**
   * effect to filter the displayed tripleTriadCards according
   * to the value the user typed in the search input
   */
  useUpdateEffect(() => {
    if (tripleTriadCardName !== '') {
      const allFilteredNameItems = tripleTriadCards.data.filter(
        tripleTriadCard => {
          return tripleTriadCard.name
            .toLowerCase()
            .includes(tripleTriadCardName);
        }
      );

      const allFilteredNameItemsChunked = _chunk(allFilteredNameItems, 12);

      setTripleTriadCards({
        ...tripleTriadCards,
        allItems: allFilteredNameItemsChunked,
        currentItems: !allFilteredNameItemsChunked.length
          ? []
          : [allFilteredNameItemsChunked[0]],
        currentPage: 0,
        pages: allFilteredNameItemsChunked.length,
        hasNextPage: allFilteredNameItemsChunked.length - 1 > 1
      });
    } else {
      const chunkedData = _chunk(tripleTriadCards.data, 12);

      setTripleTriadCards({
        ...tripleTriadCards,
        allItems: chunkedData,
        currentItems: [chunkedData[0]],
        pages: chunkedData.length
      });
    }
  }, [tripleTriadCardName]);

  /**
   * effect to wait for data to get populated
   * and then populate the state in order to create a client-side
   * pagination system with an infinite scroll mechanic
   */
  useEffect(() => {
    if (data !== undefined) {
      const chunkedData = _chunk(data.results, 12);
      setTripleTriadCards({
        ...tripleTriadCards,
        areItemsPopulated: true,
        data: data.results,
        allItems: chunkedData,
        currentItems: [chunkedData[0]],
        pages: chunkedData.length,
        hasNextPage: true
      });
    }
  }, [data]);

  console.log(data);

  return (
    <CollectablesLayout
      title="Triple Triad Cards"
      description="What would be life be without expressing yourself? Not good, obviously, that's why you can express yourself in so many ways in FFXIV, it makes the experience so much richer!"
    >
      {error ? (
        <Error />
      ) : (
        <>
          <Flex flexDir="row" flexWrap="wrap" gap="6" pb="6">
            <Skeleton height="40px" isLoaded={!isLoading} fadeDuration={0.3}>
              <InputGroup w="64">
                <InputLeftElement
                  color={!tripleTriadCardName ? 'gray.300' : 'brand.500'}
                  pointerEvents="none"
                >
                  <Icon icon="bx-search" />
                </InputLeftElement>
                <Input
                  shadow="base"
                  value={tripleTriadCardName}
                  variant="filled"
                  colorScheme="gray"
                  color="brand.500"
                  placeholder="type card name"
                  onChange={val => setTripleTriadCardName(val.target.value)}
                />
              </InputGroup>
            </Skeleton>

            <Skeleton height="40px" isLoaded={!isLoading} fadeDuration={0.3}>
              <Menu>
                <MenuButton
                  px="5"
                  as={Button}
                  fontWeight="light"
                  colorScheme="gray"
                  color={!filter ? 'gray.400' : 'brand.500'}
                  leftIcon={<Box as={Icon} icon="bx-filter" />}
                  _expanded={{ bgColor: 'brand.100', color: 'white' }}
                  shadow="base"
                >
                  filter
                </MenuButton>
                <MenuList
                  borderColor="brand.100"
                  boxShadow="md"
                  bgColor="gray.100"
                  fontSize="md"
                  zIndex="modal"
                >
                  <MenuOptionGroup
                    title="Type"
                    color="brand.200"
                    value={filter}
                    onChange={(val: string) => setFilter(val)}
                  >
                    <MenuItemOption value="category-general">
                      General
                    </MenuItemOption>
                    <MenuItemOption value="category-expressions">
                      Expressions
                    </MenuItemOption>
                    <MenuItemOption value="category-special">
                      Special
                    </MenuItemOption>
                  </MenuOptionGroup>
                  <MenuOptionGroup
                    title="Order"
                    color="brand.200"
                    value={filter}
                    onChange={(val: string) => setFilter(val)}
                  >
                    <MenuItemOption value="tradeable-true">
                      Tradeable
                    </MenuItemOption>
                    <MenuItemOption value="tradeable-false">
                      Non-tradeable
                    </MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Skeleton>

            <Skeleton height="40px" isLoaded={!isLoading} fadeDuration={0.3}>
              <Menu>
                <MenuButton
                  px="5"
                  as={Button}
                  fontWeight="light"
                  colorScheme="gray"
                  color={!sort ? 'gray.400' : 'brand.500'}
                  leftIcon={<Box as={Icon} icon="bx-sort" />}
                  _expanded={{ bgColor: 'brand.100', color: 'white' }}
                  shadow="base"
                >
                  sort
                </MenuButton>
                <MenuList
                  borderColor="brand.100"
                  boxShadow="md"
                  bgColor="gray.100"
                  fontSize="md"
                  zIndex="modal"
                >
                  <MenuOptionGroup
                    title="Sort"
                    color="brand.200"
                    value={sort}
                    onChange={(val: string) => setSort(val)}
                  >
                    <MenuItemOption
                      _hover={{ bgColor: 'gray.200' }}
                      _active={{ bgColor: 'gray.200' }}
                      value="name-asc"
                    >
                      <Box as="span" display="inline-flex" alignItems="center">
                        Name <Box ml="2" as={Icon} icon="bx-chevron-up" />
                      </Box>
                    </MenuItemOption>
                    <MenuItemOption
                      _hover={{ bgColor: 'gray.200' }}
                      _active={{ bgColor: 'gray.200' }}
                      value="name-desc"
                    >
                      <Box as="span" display="inline-flex" alignItems="center">
                        Name <Box ml="2" as={Icon} icon="bx-chevron-down" />
                      </Box>
                    </MenuItemOption>
                    <MenuItemOption
                      _hover={{ bgColor: 'gray.200' }}
                      _active={{ bgColor: 'gray.200' }}
                      value="id-asc"
                    >
                      <Box as="span" display="patch-flex" alignItems="center">
                        Release Date{' '}
                        <Box ml="2" as={Icon} icon="bx-chevron-up" />
                      </Box>
                    </MenuItemOption>
                    <MenuItemOption
                      _hover={{ bgColor: 'gray.200' }}
                      _active={{ bgColor: 'gray.200' }}
                      value="id-desc"
                    >
                      <Box as="span" display="inline-flex" alignItems="center">
                        Release Date{' '}
                        <Box ml="2" as={Icon} icon="bx-chevron-down" />
                      </Box>
                    </MenuItemOption>
                    <MenuItemOption
                      _hover={{ bgColor: 'gray.200' }}
                      _active={{ bgColor: 'gray.200' }}
                      value="owned-asc"
                    >
                      <Box as="span" display="inline-flex" alignItems="center">
                        Owned % <Box ml="2" as={Icon} icon="bx-chevron-up" />
                      </Box>
                    </MenuItemOption>
                    <MenuItemOption
                      _hover={{ bgColor: 'gray.200' }}
                      _active={{ bgColor: 'gray.200' }}
                      value="owned-desc"
                    >
                      <Box as="span" display="inline-flex" alignItems="center">
                        Owned % <Box ml="2" as={Icon} icon="bx-chevron-down" />
                      </Box>
                    </MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Skeleton>

            <Skeleton height="40px" isLoaded={!isLoading} fadeDuration={0.3}>
              <Button
                colorScheme="blue"
                variant="ghost"
                fontWeight="light"
                leftIcon={<Icon icon="bx-reset" />}
                disabled={isResetButtonDisabled}
                onClick={() => {
                  resetSearchSortFilter();
                }}
              >
                reset
              </Button>
            </Skeleton>
          </Flex>
          <InfiniteScrollClient
            hasNextPage={tripleTriadCards.hasNextPage}
            hasItems={tripleTriadCards.pages !== 0}
            hasActiveFilters={filter !== '' || tripleTriadCardName !== ''}
            name="tripleTriadCards"
          >
            <AnimatePresence key="tripleTriadCards" mode="sync">
              {isLoading || !tripleTriadCards.areItemsPopulated ? (
                Array.from(Array(12).keys()).map(i => (
                  <CollectableCardSkeleton
                    imgH="28"
                    imgW="28"
                    key={`skeleton ${i}`}
                    skeletonContentH="28"
                  />
                ))
              ) : !data?.results.length ? (
                <EmptyData
                  api={FFXIV_COLLECT_API}
                  expression="Triple Triad Cards"
                />
              ) : (
                tripleTriadCards.currentItems &&
                tripleTriadCards.currentItems.map((page, pageI) =>
                  page?.map((tripleTriadCard: ICard, i: number) => {
                    return (
                      <InfiniteScrollClientItemsWrapper
                        key={tripleTriadCard.id}
                        hasNextPage={tripleTriadCards.hasNextPage}
                        setNextPage={() => setNextPage()}
                        isLastAvailablePage={
                          pageI === tripleTriadCards.currentItems.length - 1
                        }
                      >
                        <CollectableCard
                          isButton={true}
                          onClick={() => {
                            router.push(
                              `${router.pathname}?tripleTriadCard=${tripleTriadCard.id}`,
                              {},
                              { scroll: false }
                            );
                            setSelectedTripleTriadCard(tripleTriadCard);
                          }}
                        >
                          <Image
                            width="28"
                            height="28"
                            opacity="65%"
                            src={tripleTriadCard.image}
                            alt={tripleTriadCard.name}
                            transition="ease-in-out"
                            transitionDuration="0.2s"
                          />
                          <Heading noOfLines={1} fontSize="4xl" as="h1">
                            {tripleTriadCard.name}
                          </Heading>

                          <VStack
                            w="full"
                            spacing="1"
                            alignItems="flex-start"
                          ></VStack>

                          <VStack
                            w="full"
                            spacing="1"
                            textAlign="left"
                            fontStyle="italic"
                            alignItems="flex-start"
                          >
                            <Text fontSize="16">
                              Owned by {tripleTriadCard.owned} players
                            </Text>
                            <Text fontSize="16">
                              Introduced in patch {tripleTriadCard.patch}
                            </Text>
                          </VStack>
                        </CollectableCard>
                      </InfiniteScrollClientItemsWrapper>
                    );
                  })
                )
              )}
            </AnimatePresence>
          </InfiniteScrollClient>
        </>
      )}

      {selectedTripleTriadCard !== null ? (
        <BaseModal
          open={router.query?.tripleTriadCard ? true : false}
          title={selectedTripleTriadCard.name}
          whileClosing={() => {
            router.push(router.pathname, {}, { scroll: false });
          }}
          body={
            <VStack w="full" alignItems="flex-start" gap="3" fontSize="18px">
              <Box>
                <Heading color="brand.500" fontSize="3xl" as="h4">
                  Description
                </Heading>
                <Text>{selectedTripleTriadCard.description}</Text>
              </Box>

              <Box>
                <Heading color="brand.500" fontSize="3xl" as="h4">
                  General Info
                </Heading>

                <VStack
                  w="full"
                  spacing="1"
                  textAlign="left"
                  alignItems="flex-start"
                >
                  <Text>Owned by {selectedTripleTriadCard.owned} players</Text>
                  <Text>
                    Introduced in patch {selectedTripleTriadCard.patch}
                  </Text>
                </VStack>
              </Box>

              <Box>
                <Heading color="brand.500" fontSize="3xl" as="h4">
                  Source(s)
                </Heading>

                <VStack w="full" spacing="1" alignItems="flex-start">
                  {selectedTripleTriadCard.sources.purchase}
                </VStack>
              </Box>
            </VStack>
          }
        />
      ) : null}
    </CollectablesLayout>
  );
};

export default TripleTriadCards;

/* import type {
  ICard,
  ICardsResponse
} from '@ts/interfaces/tripleTriadInterfaces';
import type { GetServerSideProps, NextPage } from 'next';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Text
} from '@chakra-ui/react';

import {
  CollectableCard,
  CollectableCardSkeleton
} from '@components/cards/collectableCard';
import EmptyData from '@components/feedback/emptyData';
import Error from '@components/feedback/error';
import {
  InfiniteScrollClient,
  InfiniteScrollClientItemsWrapper
} from '@components/infiniteScrollClient';
import CollectablesLayout from '@components/layouts/collectables';
import BaseModal from '@components/modal';

import { TRIPLE_TRIAD_API } from '@utils/constants';
import { _chunk } from '@utils/helpers/arr';
//import { addParamsToGetRequest } from '@utils/helpers/addParamsToGetRequest';
import { _add, _mutiply } from '@utils/helpers/math';

const Cards: NextPage = () => {
  const router = useRouter();

  const [cards, setCards] = useState({
    all: [],
    current: [],
    currentPage: 0,
    pages: 1,
    hasNextPage: true
  });

  const [filters, setFilters] = useState('');
  const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: async ({ pageParam = { start: 1, end: 21 } }) => {
      const { data }: AxiosResponse<ICardsResponse> = await axios.get(
        `${TRIPLE_TRIAD_API}/cards?id_in=${pageParam.start}...${pageParam.end}&${filters}`
      );

      return data;
    },
    onSuccess(data) {
      const chunkedData = _chunk(data.results, 10);
      setCards({
        ...cards,
        all: chunkedData,
        current: [chunkedData[0]],
        pages: chunkedData.length
      });
    }
  });

  const setNextPage = () => {
    const nextPage = _add(cards.currentPage, 1);

    setCards({
      ...cards,
      current: [...cards.current, cards.all[nextPage]],
      currentPage: nextPage,
      hasNextPage: nextPage !== cards.all.length - 1
    });
  };

  return (
    <CollectablesLayout
      title="Triple Triad Cards"
      description="Look at all the final fantasies bellow! Do they even end?"
    >
      {error ? (
        <Error />
      ) : isLoading ? (
        <SimpleGrid gap={8} w="full" columns={[1, null, 2, 3, 4, null, 5]}>
          {Array.from(Array(10).keys()).map(i => (
            <CollectableCardSkeleton key={i} imgH="16" />
          ))}
        </SimpleGrid>
      ) : data ? (
        <InfiniteScrollClient
          hasNextPage={cards.hasNextPage}
          endMessage="Well, there you have it, all the FFXIV achievements, is there even a player who got them all?"
        >
          {cards.current.map((page, pageI) =>
            page.map((card: ICard, i: number) => {
              return (
                <InfiniteScrollClientItemsWrapper
                  key={i}
                  hasNextPage={cards.hasNextPage}
                  setNextPage={() => setNextPage()}
                  isLastAvailablePage={pageI === cards.current.length - 1}
                >
                  <CollectableCard
                    isButton={true}
                    onClick={() => {
                      setSelectedCard(card);
                      router.push(
                        `${router.pathname}?card=${card.id}`,
                        {},
                        { scroll: false }
                      );
                    }}
                  >
                    <Image
                      src={`${card.image}`}
                      width="75px"
                      height="80px"
                      alt={`${card.name} Image`}
                    />
                    <Heading noOfLines={1} fontSize="2xl" as="h4">
                      {card.name}
                    </Heading>
                    <Text>
                      {card.type.name} - {card.stars}{' '}
                      {card.stars === 1 ? 'Star' : 'Stars'}
                    </Text>
                  </CollectableCard>
                </InfiniteScrollClientItemsWrapper>
              );
            })
          ) || <EmptyData expression="emotes" />}
        </InfiniteScrollClient>
      ) : null}

      {selectedCard !== null ? (
        <BaseModal
          open={router.query?.card ? true : false}
          title={selectedCard.name}
          whileClosing={() =>
            router.push(router.pathname, {}, { scroll: false })
          }
          body={
            <>
              <Image
                src={`${selectedCard.image}`}
                width="110px"
                height="150px"
                mx="auto"
                alt={`${selectedCard.name} Image`}
              />

              <SimpleGrid
                pt={4}
                color="brand.500"
                justifyItems="center"
                columns={[1, 2, null, 4]}
              >
                <Text>
                  {selectedCard.stars}{' '}
                  {selectedCard.stars === 1 ? 'Star' : 'Stars'}
                </Text>
                <Text>Type: {selectedCard.type.name}</Text>
                <Text>Owned: {selectedCard.owned}</Text>
                <Text>Sell Price: {selectedCard.sell_price}</Text>
              </SimpleGrid>

              <Text mt={4} mb={2} noOfLines={seeAllDescription ? null : 3}>
                {selectedCard.description}
              </Text>

              <Center>
                <Button
                  mb={4}
                  variant="ghost"
                  colorScheme="brand"
                  onClick={() => setSeeAllDescription(!seeAllDescription)}
                >
                  {seeAllDescription
                    ? 'Trucante description'
                    : 'Show all description'}
                </Button>
              </Center>

              <Divider w="75%" mx="auto" mb={4} />

              <Box pb={4}>
                <Heading fontSize="2xl" color="brand.500" pb={2} as="h4">
                  Stats
                </Heading>

                <SimpleGrid columns={[1, 2, 4]}>
                  {Object.entries(selectedCard.stats.formatted).map(
                    ([key, value], i) => (
                      <Text key={i}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                      </Text>
                    )
                  )}
                </SimpleGrid>
              </Box>

              <Box>
                <Heading fontSize="2xl" color="brand.500" as="h4">
                  Sources
                </Heading>

                {selectedCard.sources.drops.length > 0 ? (
                  <Text pt={2}>
                    <u>Drops:</u>
                    {selectedCard.sources.drops
                      .map((item, _) => item)
                      .join(', ')}
                  </Text>
                ) : null}
                {selectedCard.sources.npcs.length > 0 ? (
                  <Text pt={2}>
                    <u>NPCs:</u>
                    {selectedCard.sources.npcs
                      .map(
                        (item, i) => `${item.name} (in ${item.location.name})`
                      )
                      .join(', ')}
                  </Text>
                ) : null}
                {selectedCard.sources.packs.length > 0 ? (
                  <Text pt={2}>
                    <u>Packs:</u>
                    {selectedCard.sources.packs
                      .map((item, _) => `${item.name} - ${item.cost} MGP`)
                      .join(', ')}
                  </Text>
                ) : null}
              </Box>
            </>
          }
        />
      ) : null}
    </CollectablesLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {}
  };
};

export default Cards;
 */
