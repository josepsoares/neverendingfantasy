import type { IEmote } from '@ts/interfaces/ffxivCollectInterfaces';

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
import { indexEmotes } from '@services/ffxivCollectApi';
import { FFXIV_COLLECT_API } from '@utils/constants';
import { _chunk } from '@utils/helpers/arr';
import { _add, _sub } from '@utils/helpers/math';
import { _cap } from '@utils/helpers/string';

const Emotes = () => {
  const router = useRouter();

  // state to control the client-side pagination stuff
  const [emotes, setEmotes] = useState<{
    data: IEmote[];
    allItems: IEmote[][];
    currentItems: IEmote[][];
    currentPage: number;
    pages: number;
    hasNextPage: boolean;
  }>({
    data: [],
    allItems: [],
    currentItems: [],
    currentPage: 0,
    pages: 1,
    hasNextPage: true
  });

  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [emoteName, setEmoteName] = useState('');
  const [selectedEmote, setSelectedEmote] = useState<IEmote | null>(null);

  /**
   * query to get all the emotes from the FFXIV Collect API
   */
  const { data, error, isLoading } = useQuery({
    queryKey: ['emotes'],
    queryFn: indexEmotes,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  /**
   * effect to wait for data to get populated
   * and then populate the state in order to create a client-side
   * pagination system with an infinite scroll mechanic
   */
  useEffect(() => {
    if (data !== undefined) {
      const chunkedData = _chunk(data.results, 10);
      setEmotes({
        ...emotes,
        data: data.results,
        allItems: chunkedData,
        currentItems: [chunkedData[0]],
        pages: chunkedData.length
      });
    }
  }, [data]);

  /**
   * func to change the page of the state, adding more items to the displayed items
   */
  const setNextPage = () => {
    const nextPage = _add(emotes.currentPage, 1);

    setEmotes({
      ...emotes,
      currentItems: [...emotes.currentItems, emotes.allItems[nextPage]],
      currentPage: nextPage,
      hasNextPage: nextPage !== emotes.allItems.length - 1
    });
  };

  /**
   * func to reset the states that are related to the sorting and
   * filtering of the emotes
   */
  const resetSearchSortFilter = () => {
    const chunkedData = _chunk(emotes.data, 10);

    flushSync(() => {
      setFilter('');
      setSort('');
      setEmoteName('');
    });
    setEmotes({
      ...emotes,
      allItems: chunkedData,
      currentItems: [chunkedData[0]],
      pages: chunkedData.length
    });
  };

  /**
   * effect to sort the displayed emotes according
   * to the value of the option chosen by the user in the sorting input
   */
  useEffect(() => {
    if (sort !== undefined) {
      const destructSort = sort.split('-');
      const sortProp = destructSort[0];
      const sortOrder = destructSort[1];

      const arr = [...emotes.data];
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

      const allSortedItemsChunked = _chunk(allSortedItems, 10);

      setEmotes({
        ...emotes,
        allItems: allSortedItemsChunked,
        currentItems: [allSortedItemsChunked[0]],
        currentPage: 0,
        hasNextPage: allSortedItemsChunked.length - 1 > 1
      });
    }
  }, [sort]);

  /**
   * effect to filter the displayed emotes according
   * to the value of the option chosen by the user in the filter input
   */
  useEffect(() => {
    if (filter !== undefined) {
      const destructFilter = filter.split('-');
      const filterProp = destructFilter[0];
      const filterEquals = destructFilter[1];

      const allFilteredItems = emotes.data.filter(emote => {
        switch (filterProp) {
          case 'tradeable':
            const filterEqualBool = filterEquals === 'true' ? true : false;
            return emote.tradeable === filterEqualBool;
          case 'category':
            return emote.category.name === _cap(filterEquals);

          default:
            break;
        }
      });

      const allFilteredItemsChunked = _chunk(allFilteredItems, 10);

      setEmotes({
        ...emotes,
        allItems: allFilteredItemsChunked,
        currentItems: [allFilteredItemsChunked[0]],
        currentPage: 0,
        pages: allFilteredItemsChunked.length,

        hasNextPage: allFilteredItemsChunked.length - 1 > 1
      });
    }
  }, [filter]);

  /**
   * effect to filter the displayed emotes according
   * to the value the user typed in the search input
   */
  useEffect(() => {
    if (emoteName !== '') {
      const allFilteredNameItems = emotes.data.filter(emote => {
        return emote.name.toLowerCase().includes(emoteName);
      });

      const allFilteredNameItemsChunked = _chunk(allFilteredNameItems, 10);

      setEmotes({
        ...emotes,
        allItems: allFilteredNameItemsChunked,
        currentItems: [allFilteredNameItemsChunked[0]],
        currentPage: 0,
        pages: allFilteredNameItemsChunked.length,
        hasNextPage: allFilteredNameItemsChunked.length - 1 > 1
      });
    } else {
      const chunkedData = _chunk(emotes.data, 10);

      setEmotes({
        ...emotes,
        allItems: chunkedData,
        currentItems: [chunkedData[0]],
        pages: chunkedData.length
      });
    }
  }, [emoteName]);

  console.log(emotes.currentItems.length);

  return (
    <CollectablesLayout
      title="Emotes"
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
                  color={!emoteName ? 'gray.300' : 'brand.500'}
                  pointerEvents="none"
                >
                  <Icon icon="bx-search" />
                </InputLeftElement>
                <Input
                  shadow="base"
                  value={emoteName}
                  variant="filled"
                  colorScheme="gray"
                  color="brand.500"
                  placeholder="type emote name"
                  onChange={val => {
                    console.log(val);
                    setEmoteName(val.target.value);
                  }}
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
                    title="Category"
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
                    title="Tradeable"
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
                onClick={() => {
                  resetSearchSortFilter();
                }}
              >
                reset
              </Button>
            </Skeleton>
          </Flex>
          <InfiniteScrollClient
            hasNextPage={emotes.hasNextPage}
            hasItems={emotes.currentItems.length !== 0}
            hasActiveFilters={filter !== '' || emoteName !== ''}
            name="emotes"
          >
            <AnimatePresence mode="wait">
              {isLoading || !emotes.currentItems.length ? (
                Array.from(Array(10).keys()).map(i => (
                  <CollectableCardSkeleton
                    key={i}
                    imgH="14"
                    imgW="14"
                    skeletonContentH="28"
                  />
                ))
              ) : !data?.results.length ? (
                <EmptyData api={FFXIV_COLLECT_API} expression="emotes" />
              ) : (
                emotes.currentItems &&
                emotes.currentItems.map((page, pageI) =>
                  page?.map((emote: IEmote, i: number) => {
                    return (
                      <InfiniteScrollClientItemsWrapper
                        key={i}
                        hasNextPage={emotes.hasNextPage}
                        setNextPage={() => setNextPage()}
                        isLastAvailablePage={
                          pageI === emotes.currentItems.length - 1
                        }
                      >
                        <CollectableCard
                          isButton={true}
                          onClick={() => {
                            router.push(
                              `${router.pathname}?emote=${emote.id}`,
                              {},
                              { scroll: false }
                            );
                            setSelectedEmote(emote);
                          }}
                        >
                          <Image
                            w="14"
                            h="14"
                            opacity="65%"
                            src={emote.icon}
                            alt={emote.name}
                            transition="ease-in-out"
                            transitionDuration="0.2s"
                          />
                          <Heading noOfLines={1} fontSize="4xl" as="h1">
                            {emote.name}
                          </Heading>

                          <Box>
                            <Text noOfLines={1}>{emote.command}</Text>
                            <Text>{emote.category.name} Emote</Text>
                          </Box>

                          <VStack
                            w="full"
                            spacing="1"
                            textAlign="left"
                            fontStyle="italic"
                            alignItems="flex-start"
                          >
                            <Text fontSize="16">
                              {emote.tradeable ? 'Tradeable' : 'Non-tradeable'}
                            </Text>
                            <Text fontSize="16">
                              Owned by {emote.owned} players
                            </Text>

                            <Text fontSize="16">
                              Introduced in patch {emote.patch}
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

      {selectedEmote !== null ? (
        <BaseModal
          open={router.query?.emote ? true : false}
          title={selectedEmote.name}
          whileClosing={() =>
            router.push(router.pathname, {}, { scroll: false })
          }
          body={
            <>
              <Heading color="brand.500" fontSize="2xl" as="h4" pb={2}>
                Source(s)
              </Heading>

              {selectedEmote.sources.length > 0 ? (
                <SimpleGrid gap={1} pt={2}>
                  {selectedEmote.sources.map((item, i) => (
                    <Text key={i}>
                      <u>{item.type}:</u> {item.text}
                    </Text>
                  ))}
                </SimpleGrid>
              ) : (
                <Text>No source(s) found for this emote</Text>
              )}
            </>
          }
        />
      ) : null}
    </CollectablesLayout>
  );
};

export default Emotes;
