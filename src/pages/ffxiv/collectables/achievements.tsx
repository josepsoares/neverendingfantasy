import { useState } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Box, Heading, Image, Text } from '@chakra-ui/react';

import BaseModal from '@components/modal';
import Error from '@components/feedback/error';
import {
  InfiniteScroll,
  InfiniteScrollItemsWrapper
} from '@components/infiniteScroll';
import {
  CollectableCard,
  CollectableCardSkeleton
} from '@components/cards/collectableCard';
import CollectablesLayout from '@components/layouts/collectables';

import { indexAchievements } from '@services/ffxivCollectApi';
import { _mutiply } from '@utils/helpers/math';

import type { GetServerSideProps, NextPage } from 'next';
import type { IAchievement } from '@ts/interfaces/ffxivCollectInterfaces';

const Achievements: NextPage = () => {
  const router = useRouter();

  const [filters, setFilters] = useState('');
  const [selectedAchievement, setSelectedAchievement] =
    useState<IAchievement | null>(null);

  // id_in: '1...21'
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch
  } = useInfiniteQuery(['achievements', filters], indexAchievements, {
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
            page?.results.map((achievement: IAchievement, i: number) => {
              return (
                <InfiniteScrollItemsWrapper
                  key={i}
                  hasNextPage={hasNextPage}
                  fetchNextPage={fetchNextPage}
                  isLastAvailablePage={pageI === data.pages.length - 1}
                >
                  <CollectableCard
                    isButton={true}
                    onClick={() => {
                      setSelectedAchievement(achievement);
                      router.push(
                        `${router.pathname}?achievement=${achievement.id}`
                      );
                    }}
                  >
                    <Box
                      borderRadius="lg"
                      borderWidth="thin"
                      borderColor="white"
                    >
                      <Image
                        src={`${achievement.icon}`}
                        width="full"
                        height="full"
                        borderRadius="lg"
                        alt={`Achievement ${achievement.name} Icon`}
                      />
                    </Box>

                    <Heading noOfLines={2} fontSize="2xl" as="h4">
                      {achievement.name}
                    </Heading>

                    <Box>
                      {achievement.category?.id ? (
                        <Text fontSize="16">
                          Category: {achievement.category?.name}
                        </Text>
                      ) : null}
                      {achievement.type?.id ? (
                        <Text fontSize="16">
                          Type: {achievement.type?.name}
                        </Text>
                      ) : null}
                    </Box>
                  </CollectableCard>
                </InfiniteScrollItemsWrapper>
              );
            })
          )}
        </InfiniteScroll>
      )}

      {selectedAchievement !== null ? (
        <BaseModal
          open={router.query?.achievement ? true : false}
          title={selectedAchievement.name}
          whileClosing={() => router.push(router.pathname)}
          body={
            <>
              <Heading color="brand.500" fontSize="2xl" as="h4" pb={2}>
                General Info
              </Heading>
              <Text>{selectedAchievement.owned} players achieved this</Text>
              <Text>Introduced in patch {selectedAchievement.patch}</Text>

              <Text pt={2}>
                <u>Points:</u> {selectedAchievement.points}
              </Text>
              <Text>
                <u>Category:</u> {selectedAchievement.category.name}
              </Text>
              <Text>
                <u>Type:</u> {selectedAchievement.type.name}
              </Text>

              {selectedAchievement?.description && (
                <>
                  <Heading
                    pt={5}
                    pb={2}
                    as="h4"
                    fontSize="2xl"
                    color="brand.500"
                  >
                    Description
                  </Heading>
                  <Text>{selectedAchievement.description}</Text>
                </>
              )}

              <Heading color="brand.500" fontSize="2xl" as="h4" pt={5} pb={2}>
                Reward
              </Heading>

              {selectedAchievement?.reward ? (
                <Text>
                  <u>{selectedAchievement.reward.type}:</u>{' '}
                  {selectedAchievement.reward.name}
                </Text>
              ) : (
                <Text>This achievement has no reward</Text>
              )}
            </>
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

export default Achievements;
