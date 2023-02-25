import type { IHairstyle } from '@ts/interfaces/ffxivCollectInterfaces';
import type { GetServerSideProps, NextPage } from 'next';

import { useRouter } from 'next/router';
import { useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Box, Heading, Image, Text } from '@chakra-ui/react';

import {
  CollectableCard,
  CollectableCardSkeleton
} from '@components/cards/collectableCard';
import Error from '@components/feedback/error';
import {
  InfiniteScroll,
  InfiniteScrollItemsWrapper
} from '@components/infiniteScroll';
import CollectablesLayout from '@components/layouts/collectables';
import { indexHairstyles } from '@services/ffxivCollectApi';
import { _mutiply } from '@utils/helpers/math';

const Achievements: NextPage = () => {
  const router = useRouter();

  const [filters, setFilters] = useState('');
  const [selectedAchievement, setSelectedAchievement] =
    useState<IHairstyle | null>(null);

  // id_in: '1...21'
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ['hairstyles', filters],
    queryFn: indexHairstyles,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.count > 0
        ? {
            //* eg. 2*10 = 20 and then 20 + 11 = 31
            //* eg. 3*10 = 30 and then 30 + 11 = 41
            start: _mutiply(pages.length, 10) + 11,
            //* eg. 2*10 = 20 and then 20 + 21 = 41
            //* eg. 3*10 = 30 and then 30 + 21 = 51
            end: _mutiply(pages.length, 10) + 21
          }
        : undefined;
    }
  });

  /* 
  <FormControl label="Name">
  <FormControl label="Category">
  <FormControl label="Points Rewarded">
  <FormControl label="Completed Percentage">
  <FormControl label="Patch">
  */

  return (
    <CollectablesLayout
      seo="Achievements - FFXIV Colectables"
      title="Achievements"
      description="Look at all the final fantasies bellow! Do they even end?"
    >
      {error ? (
        <Error />
      ) : (
        <InfiniteScroll
          data={data}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          skeleton={<CollectableCardSkeleton />}
          endMessage="Well, there you have it, all the FFXIV achievements, is there even a player who got them all?"
        >
          {data?.pages.map((page, pageI) =>
            page?.results.map((hairstyle: IHairstyle, i: number) => {
              return (
                <InfiniteScrollItemsWrapper
                  key={i}
                  hasNextPage={hasNextPage}
                  fetchNextPage={fetchNextPage}
                  isLastAvailablePage={pageI === data.pages.length - 1}
                >
                  <CollectableCard isButton={false}>
                    <Box
                      borderRadius="lg"
                      borderWidth="thin"
                      borderColor="white"
                    >
                      <Image
                        src={`${hairstyle.icon}`}
                        width="full"
                        height="full"
                        borderRadius="lg"
                        alt={`Achievement ${hairstyle.name} Icon`}
                      />
                    </Box>

                    <Heading noOfLines={2} fontSize="2xl" as="h4">
                      {hairstyle.name}
                    </Heading>
                  </CollectableCard>
                </InfiniteScrollItemsWrapper>
              );
            })
          )}
        </InfiniteScroll>
      )}
    </CollectablesLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {}
  };
};

export default Achievements;
