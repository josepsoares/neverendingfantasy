import type { IOrchestrion } from '@ts/interfaces/ffxivCollectInterfaces';
import type { GetServerSideProps, NextPage } from 'next';

import { useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
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

import {
  CollectableCard,
  CollectableCardSkeleton
} from '@components/cards/collectableCard';
import EmptyData from '@components/feedback/emptyData';
import Error from '@components/feedback/error';
import Loading from '@components/feedback/loading';
import {
  InfiniteScroll,
  InfiniteScrollItemsWrapper
} from '@components/infiniteScroll';
import CollectablesLayout from '@components/layouts/collectables';
import { indexOrchestrions } from '@services/ffxivCollectApi';
import { _mutiply } from '@utils/helpers/math';

const Orchestrions: NextPage = () => {
  const [filters, setFilters] = useState('');
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ['orchestrions', filters],
    queryFn: indexOrchestrions,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.count > 0
        ? {
            start: _mutiply(pages.length, 10) + 11,
            end: _mutiply(pages.length, 10) + 21
          }
        : undefined;
    }
  });

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
        <InfiniteScroll
          data={data}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          skeleton={<CollectableCardSkeleton />}
          endMessage="Well, there you have it, all the FFXIV achievements, is there even a player who got them all?"
        >
          {data?.pages.map((page, pageI) =>
            page?.results.map((orchestrion: IOrchestrion, i: number) => {
              return (
                <InfiniteScrollItemsWrapper
                  key={i}
                  hasNextPage={hasNextPage}
                  fetchNextPage={fetchNextPage}
                  isLastAvailablePage={pageI === data.pages.length - 1}
                >
                  <CollectableCard isButton={false}>
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
                  </CollectableCard>
                </InfiniteScrollItemsWrapper>
              );
            })
          ) || <EmptyData expression="orchestrions" />}
        </InfiniteScroll>
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
