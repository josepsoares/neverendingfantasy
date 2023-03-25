import type { IMinion } from '@ts/interfaces/ffxivCollectInterfaces';

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

import { indexMinions } from '@services/ffxivCollectApi';
import { FFXIV_COLLECT_API } from '@utils/constants';
import { _chunk } from '@utils/helpers/arr';
import { _add, _sub } from '@utils/helpers/math';
import { _cap } from '@utils/helpers/string';
import useUpdateEffect from '@utils/hooks/useUpdateEffect';

const Minions = () => {
  const router = useRouter();

  /**
   * query to get all the minions from the FFXIV Collect API
   */
  const { data, error, isLoading } = useQuery({
    queryKey: ['minions'],
    queryFn: indexMinions,
    refetchOnWindowFocus: false
  });

  // state to control the client-side pagination/filter/sort stuff
  const [minions, setMinions] = useState<{
    data: IMinion[];
    areItemsPopulated: boolean;
    allItems: IMinion[][];
    currentItems: IMinion[][];
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
  const [minionName, setMinionName] = useState('');
  const [selectedMinion, setSelectedMinion] = useState<IMinion | null>(null);

  const isResetButtonDisabled =
    minionName === '' && filter === '' && sort === '';

  /**
   * func to change the page of the state, adding more items to the displayed items
   */
  const setNextPage = () => {
    const nextPage = _add(minions.currentPage, 1);

    setMinions({
      ...minions,
      currentItems: [...minions.currentItems, minions.allItems[nextPage]],
      currentPage: nextPage,
      hasNextPage: nextPage !== minions.allItems.length - 1
    });
  };

  /**
   * func to reset the states that are related to the sorting and
   * filtering of the minions
   */
  const resetSearchSortFilter = () => {
    const chunkedData = _chunk(minions.data, 12);

    flushSync(() => {
      setFilter('');
      setSort('');
      setMinionName('');
    });
    setMinions({
      ...minions,
      allItems: chunkedData,
      currentItems: [chunkedData[0]],
      pages: chunkedData.length
    });
  };

  /**
   * effect to sort the displayed minions according
   * to the value of the option chosen by the user in the sorting input
   */
  // TODO => adapt sort
  useUpdateEffect(() => {
    if (sort !== undefined) {
      const destructSort = sort.split('-');
      const sortProp = destructSort[0];
      const sortOrder = destructSort[1];

      const arr = [...minions.data];
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

      setMinions({
        ...minions,
        allItems: allSortedItemsChunked,
        currentItems: [allSortedItemsChunked[0]],
        currentPage: 0,
        hasNextPage: allSortedItemsChunked.length - 1 > 1
      });
    }
  }, [sort]);

  /**
   * effect to filter the displayed minions according
   * to the value of the option chosen by the user in the filter input
   */
  // TODO => adapt filter
  useUpdateEffect(() => {
    if (filter !== undefined) {
      const destructFilter = filter.split('-');
      const filterProp = destructFilter[0];
      const filterEquals = destructFilter[1];

      const allFilteredItems = minions.data.filter(minion => {
        switch (filterProp) {
          case 'tradeable':
            const filterEqualBool = filterEquals === 'true' ? true : false;
            return minion.tradeable === filterEqualBool;

          default:
            break;
        }
      });

      const allFilteredItemsChunked = _chunk(allFilteredItems, 12);

      setMinions({
        ...minions,
        allItems: allFilteredItemsChunked,
        currentItems: [allFilteredItemsChunked[0]],
        currentPage: 0,
        pages: allFilteredItemsChunked.length,

        hasNextPage: allFilteredItemsChunked.length - 1 > 1
      });
    }
  }, [filter]);

  /**
   * effect to filter the displayed minions according
   * to the value the user typed in the search input
   */
  useUpdateEffect(() => {
    if (minionName !== '') {
      const allFilteredNameItems = minions.data.filter(minion => {
        return minion.name.toLowerCase().includes(minionName);
      });

      const allFilteredNameItemsChunked = _chunk(allFilteredNameItems, 12);

      setMinions({
        ...minions,
        allItems: allFilteredNameItemsChunked,
        currentItems: !allFilteredNameItemsChunked.length
          ? []
          : [allFilteredNameItemsChunked[0]],
        currentPage: 0,
        pages: allFilteredNameItemsChunked.length,
        hasNextPage: allFilteredNameItemsChunked.length - 1 > 1
      });
    } else {
      const chunkedData = _chunk(minions.data, 12);

      setMinions({
        ...minions,
        allItems: chunkedData,
        currentItems: [chunkedData[0]],
        pages: chunkedData.length
      });
    }
  }, [minionName]);

  /**
   * effect to wait for data to get populated
   * and then populate the state in order to create a client-side
   * pagination system with an infinite scroll mechanic
   */
  useEffect(() => {
    if (data !== undefined) {
      const chunkedData = _chunk(data.results, 12);
      setMinions({
        ...minions,
        areItemsPopulated: true,
        data: data.results,
        allItems: chunkedData,
        currentItems: [chunkedData[0]],
        pages: chunkedData.length,
        hasNextPage: true
      });
    }
  }, [data]);

  return (
    <CollectablesLayout
      title="Minions"
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
                  color={!minionName ? 'gray.300' : 'brand.500'}
                  pointerEvents="none"
                >
                  <Icon icon="bx-search" />
                </InputLeftElement>
                <Input
                  shadow="base"
                  value={minionName}
                  variant="filled"
                  colorScheme="gray"
                  color="brand.500"
                  placeholder="type minion name"
                  onChange={val => setMinionName(val.target.value)}
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
            hasNextPage={minions.hasNextPage}
            hasItems={minions.pages !== 0}
            hasActiveFilters={filter !== '' || minionName !== ''}
            name="minions"
          >
            <AnimatePresence key="minions" mode="sync">
              {isLoading || !minions.areItemsPopulated ? (
                Array.from(Array(12).keys()).map(i => (
                  <CollectableCardSkeleton
                    imgH="28"
                    imgW="28"
                    key={`skeleton ${i}`}
                    skeletonContentH="28"
                  />
                ))
              ) : !data?.results.length ? (
                <EmptyData api={FFXIV_COLLECT_API} expression="minions" />
              ) : (
                minions.currentItems &&
                minions.currentItems.map((page, pageI) =>
                  page?.map((minion: IMinion, i: number) => {
                    return (
                      <InfiniteScrollClientItemsWrapper
                        key={minion.id}
                        hasNextPage={minions.hasNextPage}
                        setNextPage={() => setNextPage()}
                        isLastAvailablePage={
                          pageI === minions.currentItems.length - 1
                        }
                      >
                        <CollectableCard
                          isButton={true}
                          onClick={() => {
                            router.push(
                              `${router.pathname}?minion=${minion.id}`,
                              {},
                              { scroll: false }
                            );
                            setSelectedMinion(minion);
                          }}
                        >
                          <Image
                            width="28"
                            height="28"
                            opacity="65%"
                            src={minion.image}
                            alt={minion.name}
                            transition="ease-in-out"
                            transitionDuration="0.2s"
                          />
                          <Heading noOfLines={1} fontSize="4xl" as="h1">
                            {minion.name}
                          </Heading>

                          <VStack w="full" spacing="1" alignItems="flex-start">
                            <Text>
                              {minion?.race.name} and {minion?.behavior.name}{' '}
                              Minion
                            </Text>
                            <Text noOfLines={2}>{minion.tooltip}</Text>
                          </VStack>

                          <VStack
                            w="full"
                            spacing="1"
                            textAlign="left"
                            fontStyle="italic"
                            alignItems="flex-start"
                          >
                            <Text fontSize="16">
                              {minion.tradeable ? 'Tradeable' : 'Non-tradeable'}
                            </Text>
                            <Text fontSize="16">
                              Owned by {minion.owned} players
                            </Text>

                            <Text fontSize="16">
                              Introduced in patch {minion.patch}
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

      {selectedMinion !== null ? (
        <BaseModal
          open={router.query?.minion ? true : false}
          title={selectedMinion.name}
          whileClosing={() => {
            router.push(router.pathname, {}, { scroll: false });
          }}
          body={
            <VStack w="full" alignItems="flex-start" gap="3" fontSize="18px">
              <Box>
                <Heading color="brand.500" fontSize="3xl" as="h4">
                  Description
                </Heading>
                <Text>{selectedMinion.description}</Text>
              </Box>

              <Box>
                <Heading color="brand.500" fontSize="3xl" as="h4">
                  Tooltip
                </Heading>
                <Text>{selectedMinion.tooltip}</Text>
              </Box>

              <Box>
                <Heading color="brand.500" fontSize="3xl" as="h4">
                  Race
                </Heading>
                <Text>{selectedMinion.race.name}</Text>
              </Box>

              <Box>
                <Heading color="brand.500" fontSize="3xl" as="h4">
                  Behavior
                </Heading>
                <Text>{selectedMinion.behavior.name}</Text>
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
                  <Text>
                    {selectedMinion.tradeable ? 'Tradeable' : 'Non-tradeable'}{' '}
                    minion
                  </Text>
                  <Text>Owned by {selectedMinion.owned} players</Text>

                  <Text>Introduced in patch {selectedMinion.patch}</Text>
                </VStack>
              </Box>

              <Box>
                <Heading color="brand.500" fontSize="3xl" as="h4">
                  Source(s)
                </Heading>

                {selectedMinion.sources.length > 0 ? (
                  <VStack w="full" spacing="1" alignItems="flex-start">
                    {selectedMinion.sources.map((item, i) => (
                      <Text key={i}>
                        <u>{item.type}:</u> {item.text}
                      </Text>
                    ))}
                  </VStack>
                ) : (
                  <Text>No source(s) found for this minion</Text>
                )}
              </Box>
            </VStack>
          }
        />
      ) : null}
    </CollectablesLayout>
  );
};

export default Minions;
