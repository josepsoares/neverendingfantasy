import type { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  FormControl,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text
} from '@chakra-ui/react';

import { useIndexFashionsQuery } from '@services/api/ffxivCollectApi';

import Loading from '@components/common/feedback/loading';
import Error from '@components/common/feedback/error';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import HeadingWithFilter from '@components/common/headingWithFilter';
import EmptyData from '@components/common/feedback/emptyData';
import Card from '@components/common/card';
import BaseModal from '@components/common/modal';
import SEO from '@components/common/seo';

import { IFashion } from '@ts/interfaces/ffxivCollectInterfaces';

const Accessories: NextPage = () => {
  const router = useRouter();
  const accessories = useIndexFashionsQuery({});
  const { isLoading, error, data } = accessories;

  const { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose } =
    useFilterDrawer();

  const [selectedAccessory, setSelectedAccessory] = useState<IFashion | null>(
    null
  );

  console.log(data);

  return (
    <>
      <SEO title="Accessories - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter
          title="Accessories"
          data={data}
          onOpen={onFilterDrawerOpen}
        />
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
                  <>
                    <FormControl label="Name">
                      <Input placeholder="name of the minion" />
                    </FormControl>
                    <FormControl label="Source">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Owned">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Patch">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                  </>
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

export default Accessories;
