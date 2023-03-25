import type { IArmoire } from '@ts/interfaces/ffxivCollectInterfaces';

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

import { indexArmoires } from '@services/ffxivCollectApi';
import { FFXIV_COLLECT_API } from '@utils/constants';
import { _chunk } from '@utils/helpers/arr';
import { _add, _sub } from '@utils/helpers/math';
import { _cap } from '@utils/helpers/string';
import useUpdateEffect from '@utils/hooks/useUpdateEffect';

const Armoires = () => {
  const router = useRouter();

  /**
   * query to get all the armoires from the FFXIV Collect API
   */
  const { data, error, isLoading } = useQuery({
    queryKey: ['armoires'],
    queryFn: indexArmoires,
    refetchOnWindowFocus: false
  });

  // state to control the client-side pagination/filter/sort stuff
  const [armoires, setArmoires] = useState<{
    data: IArmoire[];
    areItemsPopulated: boolean;
    allItems: IArmoire[][];
    currentItems: IArmoire[][];
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
  const [armoireName, setArmoireName] = useState('');
  const [selectedArmoire, setSelectedArmoire] = useState<IArmoire | null>(null);

  const isResetButtonDisabled =
    armoireName === '' && filter === '' && sort === '';

  /**
   * func to change the page of the state, adding more items to the displayed items
   */
  const setNextPage = () => {
    const nextPage = _add(armoires.currentPage, 1);

    setArmoires({
      ...armoires,
      currentItems: [...armoires.currentItems, armoires.allItems[nextPage]],
      currentPage: nextPage,
      hasNextPage: nextPage !== armoires.allItems.length - 1
    });
  };

  /**
   * func to reset the states that are related to the sorting and
   * filtering of the armoires
   */
  const resetSearchSortFilter = () => {
    const chunkedData = _chunk(armoires.data, 12);

    flushSync(() => {
      setFilter('');
      setSort('');
      setArmoireName('');
    });
    setArmoires({
      ...armoires,
      allItems: chunkedData,
      currentItems: [chunkedData[0]],
      pages: chunkedData.length
    });
  };

  /**
   * effect to sort the displayed armoires according
   * to the value of the option chosen by the user in the sorting input
   */
  useUpdateEffect(() => {
    if (sort !== undefined) {
      const destructSort = sort.split('-');
      const sortProp = destructSort[0];
      const sortOrder = destructSort[1];

      const arr = [...armoires.data];
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

      setArmoires({
        ...armoires,
        allItems: allSortedItemsChunked,
        currentItems: [allSortedItemsChunked[0]],
        currentPage: 0,
        hasNextPage: allSortedItemsChunked.length - 1 > 1
      });
    }
  }, [sort]);

  /**
   * effect to filter the displayed armoires according
   * to the value of the option chosen by the user in the filter input
   */
  useUpdateEffect(() => {
    if (filter !== undefined) {
      const destructFilter = filter.split('-');
      const filterProp = destructFilter[0];
      const filterEquals = destructFilter[1];

      const allFilteredItems = armoires.data.filter(armoire => {
        switch (filterProp) {
          case 'category':
            return armoire.category.name === _cap(filterEquals);

          default:
            break;
        }
      });

      const allFilteredItemsChunked = _chunk(allFilteredItems, 12);

      setArmoires({
        ...armoires,
        allItems: allFilteredItemsChunked,
        currentItems: [allFilteredItemsChunked[0]],
        currentPage: 0,
        pages: allFilteredItemsChunked.length,

        hasNextPage: allFilteredItemsChunked.length - 1 > 1
      });
    }
  }, [filter]);

  /**
   * effect to filter the displayed armoires according
   * to the value the user typed in the search input
   */
  useUpdateEffect(() => {
    if (armoireName !== '') {
      const allFilteredNameItems = armoires.data.filter(armoire => {
        return armoire.name.toLowerCase().includes(armoireName);
      });

      const allFilteredNameItemsChunked = _chunk(allFilteredNameItems, 12);

      setArmoires({
        ...armoires,
        allItems: allFilteredNameItemsChunked,
        currentItems: !allFilteredNameItemsChunked.length
          ? []
          : [allFilteredNameItemsChunked[0]],
        currentPage: 0,
        pages: allFilteredNameItemsChunked.length,
        hasNextPage: allFilteredNameItemsChunked.length - 1 > 1
      });
    } else {
      const chunkedData = _chunk(armoires.data, 12);

      setArmoires({
        ...armoires,
        allItems: chunkedData,
        currentItems: [chunkedData[0]],
        pages: chunkedData.length
      });
    }
  }, [armoireName]);

  /**
   * effect to wait for data to get populated
   * and then populate the state in order to create a client-side
   * pagination system with an infinite scroll mechanic
   */
  useEffect(() => {
    if (data !== undefined) {
      const chunkedData = _chunk(data.results, 12);
      setArmoires({
        ...armoires,
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
      title="Armoires"
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
                  color={!armoireName ? 'gray.300' : 'brand.500'}
                  pointerEvents="none"
                >
                  <Icon icon="bx-search" />
                </InputLeftElement>
                <Input
                  shadow="base"
                  value={armoireName}
                  variant="filled"
                  colorScheme="gray"
                  color="brand.500"
                  placeholder="type armoire name"
                  onChange={val => setArmoireName(val.target.value)}
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
                    <MenuItemOption value="category-seasonal">
                      Seasonal
                    </MenuItemOption>
                    <MenuItemOption value="category-exclusive">
                      Exclusive
                    </MenuItemOption>
                    <MenuItemOption value="category-achievements">
                      Achievements
                    </MenuItemOption>
                    <MenuItemOption value="category-artifact">
                      Artifact
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
            hasNextPage={armoires.hasNextPage}
            hasItems={armoires.pages !== 0}
            hasActiveFilters={filter !== '' || armoireName !== ''}
            name="armoires"
          >
            <AnimatePresence key="armoires" mode="sync">
              {isLoading || !armoires.areItemsPopulated ? (
                Array.from(Array(12).keys()).map(i => (
                  <CollectableCardSkeleton
                    imgH="10"
                    imgW="10"
                    key={`skeleton ${i}`}
                    skeletonContentH="20"
                  />
                ))
              ) : !data?.results.length ? (
                <EmptyData api={FFXIV_COLLECT_API} expression="armoires" />
              ) : (
                armoires.currentItems &&
                armoires.currentItems.map((page, pageI) =>
                  page?.map((armoire: IArmoire, i: number) => {
                    return (
                      <InfiniteScrollClientItemsWrapper
                        key={armoire.id}
                        hasNextPage={armoires.hasNextPage}
                        setNextPage={() => setNextPage()}
                        isLastAvailablePage={
                          pageI === armoires.currentItems.length - 1
                        }
                      >
                        <CollectableCard
                          isButton={true}
                          onClick={() => {
                            router.push(
                              `${router.pathname}?armoire=${armoire.id}`,
                              {},
                              { scroll: false }
                            );
                            setSelectedArmoire(armoire);
                          }}
                        >
                          <Image
                            w="10"
                            h="10"
                            opacity="65%"
                            src={armoire.icon}
                            alt={armoire.name}
                            transition="ease-in-out"
                            transitionDuration="0.2s"
                          />
                          <Heading noOfLines={2} fontSize="4xl" as="h1">
                            {armoire.name}
                          </Heading>

                          <Box>
                            <Text>{armoire.category.name} Armoire</Text>
                          </Box>

                          <VStack
                            w="full"
                            spacing="1"
                            textAlign="left"
                            fontStyle="italic"
                            alignItems="flex-start"
                          >
                            <Text fontSize="16">
                              Owned by {armoire.owned} players
                            </Text>

                            <Text fontSize="16">
                              Introduced in patch {armoire.patch}
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

      {selectedArmoire !== null ? (
        <BaseModal
          open={router.query?.armoire ? true : false}
          title={selectedArmoire.name}
          whileClosing={() => {
            router.push(router.pathname, {}, { scroll: false });
          }}
          body={
            <VStack w="full" alignItems="flex-start" gap="3" fontSize="18px">
              <Box>
                <Heading color="brand.500" fontSize="3xl" as="h4">
                  Type
                </Heading>
                <Text>{selectedArmoire.category.name} Armoire</Text>
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
                  <Text>Owned by {selectedArmoire.owned} players</Text>

                  <Text>Introduced in patch {selectedArmoire.patch}</Text>
                </VStack>
              </Box>

              <Box>
                <Heading color="brand.500" fontSize="3xl" as="h4">
                  Source(s)
                </Heading>

                {selectedArmoire.sources.length > 0 ? (
                  <VStack w="full" spacing="1" alignItems="flex-start">
                    {selectedArmoire.sources.map((item, i) => (
                      <Text key={i}>
                        <u>{item.type}:</u> {item.text}
                      </Text>
                    ))}
                  </VStack>
                ) : (
                  <Text>No source(s) found for this armoire</Text>
                )}
              </Box>
            </VStack>
          }
        />
      ) : null}
    </CollectablesLayout>
  );
};

export default Armoires;
