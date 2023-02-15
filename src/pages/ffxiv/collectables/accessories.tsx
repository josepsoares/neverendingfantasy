import type { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text
} from '@chakra-ui/react';

import Loading from '@components/feedback/loading';
import Error from '@components/feedback/error';
import EmptyData from '@components/feedback/emptyData';
import Card from '@components/card';
import BaseModal from '@components/modal';
import SEO from '@components/seo';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';

import { indexAccessories } from '@services/ffxivCollectApi';
import { IFashion } from '@ts/interfaces/ffxivCollectInterfaces';

const Accessories: NextPage = () => {
  const router = useRouter();

  const [filters, setFilters] = useState('');
  const [selectedAccessory, setSelectedAccessory] = useState<IFashion | null>(
    null
  );

  const { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose } =
    useFilterDrawer();

  const { isLoading, error, data } = useQuery(
    ['accessories', { filters }],
    () => indexAccessories({ filters })
  );

  return (
    <>
      <SEO title="Accessories - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <Heading fontSize="8xl" as="h1" pt={2} m={0} color="brand.800">
          Acessories
        </Heading>
        <Box>
          {error ? (
            <Error />
          ) : isLoading ? (
            <Loading />
          ) : data ? (
            <>
              <FilterDrawer
                visible={isFilterDrawerOpen}
                close={onFilterDrawerClose}
                filtersJSX={
                  <Flex flexDir="column" gap={4}>
                    <FormControl label="Name">
                      <FormLabel as="legend">Name</FormLabel>
                      <Input placeholder="name of the acessory" />
                    </FormControl>
                    <FormControl label="Owned">
                      <FormLabel as="legend">Owned</FormLabel>
                      <Select bgColor="white" value={'one'}>
                        <Box as="option" color="brand.500" value="one">
                          one
                        </Box>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Patch">
                      <FormLabel as="legend">Patch</FormLabel>
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                  </Flex>
                }
              />

              {data.results?.length ? (
                <SimpleGrid gap={8} columns={[1, null, 2, 3, 4, 5]}>
                  {data.results.map((accessory, i) => (
                    <Card
                      p={6}
                      key={i}
                      isButton={true}
                      onClick={() => {
                        setSelectedAccessory(accessory);
                        router.push(
                          `${router.pathname}?accessory=${accessory.id}`
                        );
                      }}
                    >
                      <Image
                        src={`${accessory.image}`}
                        alt={`${accessory.name} Icon`}
                      />

                      <Heading
                        textAlign="center"
                        noOfLines={2}
                        fontSize="2xl"
                        as="h4"
                      >
                        {accessory.name}
                      </Heading>

                      <Box alignSelf="center">
                        <Text textAlign="center" fontSize="16">
                          {accessory.owned} players own this
                        </Text>

                        <Text textAlign="center" fontSize="16">
                          Introduced in patch {accessory.patch}
                        </Text>

                        <Text textAlign="center" fontSize="16">
                          This accessory is{' '}
                          {accessory.tradeable === true
                            ? 'tradable'
                            : 'non-tradable'}
                        </Text>
                      </Box>

                      <Text noOfLines={3}>{accessory.description}</Text>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <EmptyData expression="fashion accessories" />
              )}
            </>
          ) : null}
        </Box>
      </Box>
      {selectedAccessory !== null ? (
        <BaseModal
          open={router.query?.accessory ? true : false}
          title={selectedAccessory.name}
          whileClosing={() => router.push(router.pathname)}
          body={
            <>
              <Heading color="brand.500" fontSize="2xl" as="h4" pb={2}>
                Description
              </Heading>
              <Text>{selectedAccessory.description}</Text>

              <Heading color="brand.500" fontSize="2xl" as="h4" pt={5} pb={2}>
                Source(s)
              </Heading>

              {selectedAccessory.sources.length > 0 ? (
                <SimpleGrid gap={1} pt={2}>
                  {selectedAccessory.sources.map((item, i) => (
                    <Text key={i}>
                      <u>{item.type}:</u> {item.text}
                    </Text>
                  ))}
                </SimpleGrid>
              ) : (
                <Text>No source(s) found for this fashion accessory</Text>
              )}
            </>
          }
        />
      ) : null}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {}
  };
};

export default Accessories;
