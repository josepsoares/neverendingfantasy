import type { IOrchestrion } from '@ts/interfaces/ffxivCollectInterfaces';
import type { GetServerSideProps, NextPage } from 'next';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
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
import {
  InfiniteScrollClient,
  InfiniteScrollClientItemsWrapper
} from '@components/infiniteScrollClient';
import CollectablesLayout from '@components/layouts/collectables';
import { indexOrchestrions } from '@services/ffxivCollectApi';
import { _chunk } from '@utils/helpers/arr';
import { _add, _mutiply } from '@utils/helpers/math';

const Orchestrions: NextPage = () => {
  const [orchestrions, setOrchestrions] = useState({
    all: [],
    current: [],
    currentPage: 0,
    pages: 1,
    hasNextPage: true
  });

  const [filters, setFilters] = useState('');
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ['orchestrions'],
    queryFn: indexOrchestrions,
    onSuccess(data) {
      const chunkedData = _chunk(data.results, 10);
      setOrchestrions({
        ...orchestrions,
        all: chunkedData,
        current: [chunkedData[0]],
        pages: chunkedData.length
      });
    }
  });

  const setNextPage = () => {
    const nextPage = _add(orchestrions.currentPage, 1);

    setOrchestrions({
      ...orchestrions,
      current: [...orchestrions.current, orchestrions.all[nextPage]],
      currentPage: nextPage,
      hasNextPage: nextPage !== orchestrions.all.length - 1
    });
  };

  /*
  <FormControl label="Name">
  <FormControl label="Owned">
  */

  return (
    <CollectablesLayout
      title="Orchestrions"
      description=" Look at all the final fantasies bellow! Do they even end?"
    >
      {error ? (
        <Error />
      ) : isLoading ? (
        <SimpleGrid gap={8} w="full" columns={[1, null, 2, 3, 4, null, 5]}>
          {Array.from(Array(10).keys()).map(i => (
            <CollectableCardSkeleton key={i} imgH="16" />
          ))}
        </SimpleGrid>
      ) : data ? (
        <InfiniteScrollClient
          hasNextPage={orchestrions.hasNextPage}
          endMessage="Well, there you have it, all the FFXIV achievements, is there even a player who got them all?"
        >
          {orchestrions.current.map((page, pageI) =>
            page.map((orchestrion: IOrchestrion, i: number) => {
              return (
                <InfiniteScrollClientItemsWrapper
                  key={i}
                  hasNextPage={orchestrions.hasNextPage}
                  setNextPage={() => setNextPage()}
                  isLastAvailablePage={
                    pageI === orchestrions.current.length - 1
                  }
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
                </InfiniteScrollClientItemsWrapper>
              );
            })
          ) || <EmptyData expression="orchestrions" />}
        </InfiniteScrollClient>
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
