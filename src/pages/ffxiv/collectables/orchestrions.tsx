import type { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';

import {
  Box,
  FormControl,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text
} from '@chakra-ui/react';

import Error from '@components/feedback/error';
import Loading from '@components/feedback/loading';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import EmptyData from '@components/feedback/emptyData';
import Card from '@components/card';
import SEO from '@components/seo';

import type { IOrchestrion } from '@ts/interfaces/ffxivCollectInterfaces';
import { indexOrchestrions } from '@services/ffxivCollectApi';
import { useInfiniteQuery } from '@tanstack/react-query';

const Orchestrions: NextPage = () => {
  const [filters, setFilters] = useState('');
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  const { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose } =
    useFilterDrawer();

  // id_in: '1...21'
  const { data, error, isLoading, refetch } = useInfiniteQuery(
    ['emotes', filters],
    indexOrchestrions,
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor
    }
  );

  return (
    <>
      <SEO title="Relic Weapons - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <Heading fontSize="8xl" as="h1" pt={2} m={0} color="brand.800">
          Orchestrions
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
                  <>
                    <FormControl label="Name">
                      <Input placeholder="name of the weapon" />
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
                  {data.results.map((orchestrion: IOrchestrion, i) => (
                    <Card p={6} key={i}>
                      <Image
                        width="12"
                        height="12"
                        src={orchestrion.icon}
                        alt={orchestrion.name}
                      />
                      <Heading
                        textAlign="center"
                        noOfLines={2}
                        fontSize="2xl"
                        as="h4"
                      >
                        {orchestrion.name}
                      </Heading>

                      <Box textAlign="center">
                        <Text fontSize="16">
                          {orchestrion.owned} players own this
                        </Text>

                        <Text fontSize="16">
                          Introduced in patch {orchestrion.patch}
                        </Text>

                        <Text fontSize="16">
                          This orchestrion is{' '}
                          {orchestrion.tradeable ? 'tradable' : 'non-tradable'}
                        </Text>
                      </Box>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <EmptyData expression="orchestrion" />
              )}
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {}
  };
};

export default Orchestrions;
