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
import EmptyData from '@components/feedback/emptyData';
import Card from '@components/card';
import CollectablesLayout from '@components/layouts/collectables';

import type { IOrchestrion } from '@ts/interfaces/ffxivCollectInterfaces';
import { indexOrchestrions } from '@services/ffxivCollectApi';
import { useInfiniteQuery } from '@tanstack/react-query';

const Orchestrions: NextPage = () => {
  const [filters, setFilters] = useState('');
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  // id_in: '1...21'
  const { data, error, isLoading, refetch } = useInfiniteQuery(
    ['emotes', filters],
    indexOrchestrions,
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor
    }
  );

  /*
  <FormControl label="Name">
  <FormControl label="Source">
  <FormControl label="Owned">
  <FormControl label="Patch">
  */

  return (
    <CollectablesLayout
      seo="Orchestrions - FFXIV Colectables"
      title="Orchestrions"
      description=" Look at all the final fantasies bellow! Do they even end?"
    >
      {error ? (
        <Error />
      ) : isLoading ? (
        <Loading />
      ) : data ? (
        <>
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
    </CollectablesLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {}
  };
};

export default Orchestrions;
