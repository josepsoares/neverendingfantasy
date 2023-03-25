import type { IOrchestrion } from '@ts/interfaces/ffxivCollectInterfaces';
import type { GetServerSideProps, NextPage } from 'next';

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

import { indexOrchestrions } from '@services/ffxivCollectApi';
import { FFXIV_COLLECT_API } from '@utils/constants';
import { _chunk } from '@utils/helpers/arr';
import { _add, _mutiply } from '@utils/helpers/math';
import { _cap } from '@utils/helpers/string';

const Orchestrions: NextPage = () => {
  const router = useRouter();

  /**
   * query to get all the orchestrions from the FFXIV Collect API
   */
  const { data, error, isLoading } = useQuery({
    queryKey: ['orchestrions'],
    queryFn: indexOrchestrions,
    refetchOnWindowFocus: false
  });

  // state to control the client-side pagination/filter/sort stuff
  const [orchestrions, setOrchestrions] = useState<{
    data: IOrchestrion[];
    areItemsPopulated: boolean;
    allItems: IOrchestrion[][];
    currentItems: IOrchestrion[][];
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
  const [orchestrionName, setOrchestrionName] = useState('');
  const [selectedOrchestrion, setSelectedOrchestrion] =
    useState<IOrchestrion | null>(null);

  const isResetButtonDisabled =
    orchestrionName === '' && filter === '' && sort === '';

  /**
   * func to change the page of the state, adding more items to the displayed items
   */
  const setNextPage = () => {
    const nextPage = _add(orchestrions.currentPage, 1);

    setOrchestrions({
      ...orchestrions,
      currentItems: [
        ...orchestrions.currentItems,
        orchestrions.allItems[nextPage]
      ],
      currentPage: nextPage,
      hasNextPage: nextPage !== orchestrions.allItems.length - 1
    });
  };

  /**
   * func to reset the states that are related to the sorting and
   * filtering of the orchestrions
   */
  const resetSearchSortFilter = () => {
    const chunkedData = _chunk(orchestrions.data, 12);

    flushSync(() => {
      setFilter('');
      setSort('');
      setOrchestrionName('');
    });
    setOrchestrions({
      ...orchestrions,
      allItems: chunkedData,
      currentItems: [chunkedData[0]],
      pages: chunkedData.length
    });
  };

  /**
   * effect to sort the displayed orchestrions according
   * to the value of the option chosen by the user in the sorting input
   */
  useEffect(() => {
    if (sort !== undefined) {
      const destructSort = sort.split('-');
      const sortProp = destructSort[0];
      const sortOrder = destructSort[1];

      const arr = [...orchestrions.data];
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

      setOrchestrions({
        ...orchestrions,
        allItems: allSortedItemsChunked,
        currentItems: [allSortedItemsChunked[0]],
        currentPage: 0,
        hasNextPage: allSortedItemsChunked.length - 1 > 1
      });
    }
  }, [sort]);

  /**
   * effect to filter the displayed orchestrions according
   * to the value of the option chosen by the user in the filter input
   */
  // TODO => adapt filter
  useEffect(() => {
    if (filter !== undefined) {
      const destructFilter = filter.split('-');
      const filterProp = destructFilter[0];
      const filterEquals = destructFilter[1];

      const allFilteredItems = orchestrions.data.filter(orchestrion => {
        switch (filterProp) {
          case 'tradeable':
            const filterEqualBool = filterEquals === 'true' ? true : false;
            return orchestrion.tradeable === filterEqualBool;
          case 'category':
            return orchestrion.category.name === _cap(filterEquals);

          default:
            break;
        }
      });

      const allFilteredItemsChunked = _chunk(allFilteredItems, 12);

      setOrchestrions({
        ...orchestrions,
        allItems: allFilteredItemsChunked,
        currentItems: [allFilteredItemsChunked[0]],
        currentPage: 0,
        pages: allFilteredItemsChunked.length,

        hasNextPage: allFilteredItemsChunked.length - 1 > 1
      });
    }
  }, [filter]);

  /**
   * effect to filter the displayed orchestrions according
   * to the value the user typed in the search input
   */
  useEffect(() => {
    if (orchestrionName !== '') {
      const allFilteredNameItems = orchestrions.data.filter(orchestrion => {
        return orchestrion.name.toLowerCase().includes(orchestrionName);
      });

      const allFilteredNameItemsChunked = _chunk(allFilteredNameItems, 12);

      setOrchestrions({
        ...orchestrions,
        allItems: allFilteredNameItemsChunked,
        currentItems: !allFilteredNameItemsChunked.length
          ? []
          : [allFilteredNameItemsChunked[0]],
        currentPage: 0,
        pages: allFilteredNameItemsChunked.length,
        hasNextPage: allFilteredNameItemsChunked.length - 1 > 1
      });
    } else {
      const chunkedData = _chunk(orchestrions.data, 12);

      setOrchestrions({
        ...orchestrions,
        allItems: chunkedData,
        currentItems: [chunkedData[0]],
        pages: chunkedData.length
      });
    }
  }, [orchestrionName]);

  /**
   * effect to wait for data to get populated
   * and then populate the state in order to create a client-side
   * pagination system with an infinite scroll mechanic
   */
  useEffect(() => {
    if (data !== undefined) {
      const chunkedData = _chunk(data.results, 12);
      setOrchestrions({
        ...orchestrions,
        areItemsPopulated: true,
        data: data.results,
        allItems: chunkedData,
        currentItems: [chunkedData[0]],
        pages: chunkedData.length
      });
    }
  }, [data]);

  console.log(data);

  return (
    <CollectablesLayout
      title="Orchestrions"
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
                  color={!orchestrionName ? 'gray.300' : 'brand.500'}
                  pointerEvents="none"
                >
                  <Icon icon="bx-search" />
                </InputLeftElement>
                <Input
                  shadow="base"
                  value={orchestrionName}
                  variant="filled"
                  colorScheme="gray"
                  color="brand.500"
                  placeholder="type orchestrion name"
                  onChange={val => setOrchestrionName(val.target.value)}
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
                    <MenuItemOption value="category-dungeons">
                      Dungeons
                    </MenuItemOption>
                    <MenuItemOption value="category-trials">
                      Trials
                    </MenuItemOption>
                    <MenuItemOption value="category-locales">
                      Locales
                    </MenuItemOption>
                    <MenuItemOption value="category-seasonal">
                      Seasonal
                    </MenuItemOption>
                    <MenuItemOption value="category-others">
                      Other
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
            hasNextPage={orchestrions.hasNextPage}
            hasItems={orchestrions.pages !== 0}
            hasActiveFilters={filter !== '' || orchestrionName !== ''}
            name="orchestrions"
          >
            <AnimatePresence key="orchestrions" mode="sync">
              {isLoading || !orchestrions.areItemsPopulated ? (
                Array.from(Array(12).keys()).map(i => (
                  <CollectableCardSkeleton
                    imgH="14"
                    imgW="14"
                    key={`skeleton ${i}`}
                    skeletonContentH="28"
                  />
                ))
              ) : !data?.results.length ? (
                <EmptyData api={FFXIV_COLLECT_API} expression="orchestrions" />
              ) : (
                orchestrions.currentItems &&
                orchestrions.currentItems.map((page, pageI) =>
                  page?.map((orchestrion: IOrchestrion, i: number) => {
                    return (
                      <InfiniteScrollClientItemsWrapper
                        key={orchestrion.id}
                        hasNextPage={orchestrions.hasNextPage}
                        setNextPage={() => setNextPage()}
                        isLastAvailablePage={
                          pageI === orchestrions.currentItems.length - 1
                        }
                      >
                        <CollectableCard isButton={false}>
                          <Image
                            w="10"
                            h="10"
                            opacity="65%"
                            src={orchestrion.icon}
                            alt={orchestrion.name}
                            transition="ease-in-out"
                            transitionDuration="0.2s"
                          />
                          <Heading noOfLines={2} fontSize="4xl" as="h1">
                            {orchestrion.name}
                          </Heading>

                          <Box>
                            <Text>{orchestrion.category.name} Orchestrion</Text>
                          </Box>

                          <Box>
                            <Text>{orchestrion.description}</Text>
                          </Box>

                          <VStack
                            w="full"
                            spacing="1"
                            textAlign="left"
                            fontStyle="italic"
                            alignItems="flex-start"
                          >
                            <Text fontSize="16">
                              {orchestrion.tradeable
                                ? 'Tradeable'
                                : 'Non-tradeable'}
                            </Text>
                            <Text fontSize="16">
                              Owned by {orchestrion.owned} players
                            </Text>

                            <Text fontSize="16">
                              Introduced in patch {orchestrion.patch}
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
    </CollectablesLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {}
  };
};

export default Orchestrions;
