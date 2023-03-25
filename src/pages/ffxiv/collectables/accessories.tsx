import type { IFashion } from '@ts/interfaces/ffxivCollectInterfaces';
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
import CollectablesLayout from '@components/layouts/collectables';
import BaseModal from '@components/modal';

import { indexAccessories } from '@services/ffxivCollectApi';
import { FFXIV_COLLECT_API } from '@utils/constants';

// check why its rendering twice

const Accessories: NextPage = () => {
  const router = useRouter();

  const { isLoading, error, data } = useQuery({
    queryKey: ['accessories'],
    queryFn: () => indexAccessories()
  });

  // state to control the client-side pagination/filter/sort stuff
  const [displayedAcessories, setDisplayedAccessories] = useState<IFashion[]>(
    []
  );

  const [accessoryName, setAccessoryName] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [selectedAccessory, setSelectedAccessory] = useState<IFashion | null>(
    null
  );

  const isResetButtonDisabled =
    accessoryName === '' && filter === '' && sort === '';

  /**
   * func to reset the states that are related to the sorting and
   * filtering of the accessories
   */
  const resetSearchSortFilter = () => {
    flushSync(() => {
      setFilter('');
      setSort('');
      setAccessoryName('');
    });

    setDisplayedAccessories(data?.results);
  };

  /**
   * effect to sort the displayed accessories according
   * to the value of the option chosen by the user in the sorting input
   */
  useEffect(() => {
    if (data !== undefined && sort !== '') {
      const destructSort = sort.split('-');
      const sortProp = destructSort[0];
      const sortOrder = destructSort[1];
      const itemsToSort = [...data.results];

      const sortedItems = itemsToSort.sort((a, b) => {
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

      setDisplayedAccessories(sortedItems);
    }
  }, [sort]);

  /**
   * effect to filter the displayed accessories according
   * to the value of the option chosen by the user in the filter input
   */
  useEffect(() => {
    if (data !== undefined && filter !== '') {
      const destructFilter = filter.split('-');
      const filterProp = destructFilter[0];
      const filterEquals = destructFilter[1];

      const filteredItems = data?.results.filter(emote => {
        switch (filterProp) {
          case 'tradeable':
            const filterEqualBool = filterEquals === 'true' ? true : false;
            return emote.tradeable === filterEqualBool;
          default:
            break;
        }
      });

      setDisplayedAccessories(filteredItems);
    }
  }, [filter]);

  /**
   * effect to filter the displayed acessories according
   * to the value the user typed in the search input
   */
  useEffect(() => {
    if (data !== undefined) {
      if (accessoryName !== '') {
        const filteredNameItems = data?.results.filter(emote => {
          return emote.name.toLowerCase().includes(accessoryName);
        });

        setDisplayedAccessories(filteredNameItems);
      } else {
        setDisplayedAccessories(data?.results);
      }
    }
  }, [accessoryName]);

  /**
   * effect to wait for data to get populated
   * and then populate the displayed items in order to create a client-side
   * sorting and filtering system
   */
  useEffect(() => {
    if (data !== undefined) {
      setDisplayedAccessories(data?.results);
    }
  }, [data]);

  console.log(selectedAccessory);

  return (
    <CollectablesLayout
      title="Acessories"
      description="Want to make your characters pop out and highlight it from others? Fear not, fashion accessories come to the rescue"
    >
      {error ? (
        <Error />
      ) : (
        <>
          <Flex flexDir="row" flexWrap="wrap" gap="6" pb="6">
            <Skeleton height="40px" isLoaded={!isLoading} fadeDuration={0.3}>
              <InputGroup w="64">
                <InputLeftElement
                  color={!accessoryName ? 'gray.300' : 'brand.500'}
                  pointerEvents="none"
                >
                  <Icon icon="bx-search" />
                </InputLeftElement>
                <Input
                  shadow="base"
                  value={accessoryName}
                  variant="filled"
                  colorScheme="gray"
                  color="brand.500"
                  placeholder="type accessory name"
                  onChange={val => setAccessoryName(val.target.value)}
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
                variant="ghost"
                colorScheme="blue"
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

          <SimpleGrid gap={8} columns={[1, null, 2, 3, 4, null, 5]}>
            <AnimatePresence key="accessories" mode="sync">
              {isLoading && !displayedAcessories.length ? (
                Array.from(Array(12).keys()).map(i => (
                  <CollectableCardSkeleton
                    imgH="32"
                    key={`skeleton ${i}`}
                    skeletonContentH="36"
                  />
                ))
              ) : !data?.results.length ? (
                <EmptyData
                  api={FFXIV_COLLECT_API}
                  expression="fashion accessories"
                />
              ) : (
                displayedAcessories.map((accessory, i) => (
                  <CollectableCard
                    key={i}
                    isButton={true}
                    onClick={() => {
                      setSelectedAccessory(accessory);
                      router.push(
                        `${router.pathname}?accessory=${accessory.id}`,
                        {},
                        { scroll: false }
                      );
                    }}
                  >
                    <Image
                      h="32"
                      w="auto"
                      mx="auto"
                      opacity="65%"
                      src={`${accessory.image}`}
                      alt={`${accessory.name} Icon`}
                    />

                    <VStack
                      w="100%"
                      spacing="3"
                      alignItems="flex-start"
                      justifyContent="flex-start"
                    >
                      <Heading noOfLines={2} fontSize="3xl" as="h1">
                        {accessory.name}
                      </Heading>

                      <Text noOfLines={3}>{accessory.description}</Text>

                      <VStack
                        w="full"
                        spacing="1"
                        textAlign="left"
                        fontStyle="italic"
                        alignItems="flex-start"
                      >
                        <Text fontSize="16">
                          {accessory.owned} players own this
                        </Text>
                        <Text fontSize="16">
                          Introduced in patch {accessory.patch}
                        </Text>
                        <Text fontSize="16">
                          This accessory is{' '}
                          {accessory.tradeable === true
                            ? 'tradable'
                            : 'non-tradable'}
                        </Text>
                      </VStack>
                    </VStack>
                  </CollectableCard>
                ))
              )}
            </AnimatePresence>
          </SimpleGrid>

          {(accessoryName !== '' || filter !== '') &&
          !displayedAcessories.length ? (
            <Flex mt="12" justifyContent="center" textAlign="center">
              Ops, it seems there are no accessories with the filters you chose
            </Flex>
          ) : null}
        </>
      )}

      {selectedAccessory ? (
        <BaseModal
          open={router.query?.accessory ? true : false}
          title={selectedAccessory.name}
          whileClosing={() => {
            setSelectedAccessory(null);
            router.push(router.pathname, {}, { scroll: false });
          }}
          body={
            <VStack w="full" alignItems="flex-start" gap="3" fontSize="18px">
              <Box>
                <Heading color="brand.500" fontSize="3xl" as="h4">
                  Description
                </Heading>
                <Text>{selectedAccessory.description}</Text>
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
                    {selectedAccessory.tradeable
                      ? 'Tradeable'
                      : 'Non-tradeable'}{' '}
                    fashion accessory
                  </Text>
                  <Text>Owned by {selectedAccessory.owned} players</Text>

                  <Text>Introduced in patch {selectedAccessory.patch}</Text>
                </VStack>
              </Box>

              <Box>
                <Heading color="brand.500" fontSize="3xl" as="h4">
                  Source(s)
                </Heading>

                {selectedAccessory.sources.length > 0 ? (
                  <VStack w="full" spacing="1" alignItems="flex-start">
                    {selectedAccessory.sources.map((item, i) => (
                      <Text key={i}>
                        <u>{item.type}:</u> {item.text}
                      </Text>
                    ))}
                  </VStack>
                ) : (
                  <Text>No source(s) found for this fashion accessory</Text>
                )}
              </Box>
            </VStack>
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

export default Accessories;
