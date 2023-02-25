import type { IMinion } from '@ts/interfaces/ffxivCollectInterfaces';
import type { GetServerSideProps, NextPage } from 'next';

import { useRouter } from 'next/router';
import { useState } from 'react';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  Box,
  FormControl,
  FormLabel,
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
import BaseModal from '@components/modal';
import { indexMinions } from '@services/ffxivCollectApi';
import { _mutiply } from '@utils/helpers/math';

const Minions: NextPage = () => {
  const router = useRouter();

  const [filters, setFilters] = useState('');
  const [selectedMinion, setSelectedMinion] = useState<IMinion | null>(null);
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
    queryKey: ['minions', filters],
    queryFn: indexMinions,
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
  <FormControl label="Race">
  <FormControl label="Behaviour">
  <FormControl label="Tradeable">
  <FormControl label="Owned">
  <FormControl label="Patch">
  */

  return (
    <CollectablesLayout
      seo="Minions - FFXIV Colectables"
      title="Minions"
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
            page?.results.map((minion: IMinion, i: number) => {
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
                      setSelectedMinion(minion);
                      router.push(
                        `${router.pathname}?minion=${minion.id}`,
                        {},
                        { scroll: false }
                      );
                    }}
                  >
                    <Image
                      src={`${minion.image}`}
                      width="28"
                      height="28"
                      borderRadius="lg"
                      alt={`${minion.name} Icon`}
                    />

                    <Heading
                      textAlign="center"
                      noOfLines={2}
                      fontSize="2xl"
                      as="h4"
                    >
                      {minion.name}
                    </Heading>

                    <Text>
                      {minion.race.name} - {minion.behavior.name}
                    </Text>

                    <Text textAlign="left" noOfLines={2}>
                      {minion.description.split('. ')[1]}
                    </Text>
                  </CollectableCard>
                </InfiniteScrollItemsWrapper>
              );
            })
          ) || <EmptyData expression="minions" />}
        </InfiniteScroll>
      ) : null}

      {selectedMinion !== null ? (
        <BaseModal
          open={router.query?.minion ? true : false}
          title={selectedMinion.name}
          whileClosing={() =>
            router.push(router.pathname, {}, { scroll: false })
          }
          body={
            <>
              <Image
                mx="auto"
                width="28"
                height="28"
                borderRadius="lg"
                src={`${selectedMinion.image}`}
                alt={`${selectedMinion.name} Icon`}
              />
              <Text pt="2" pb="4" textAlign="center">
                {selectedMinion.tooltip}
              </Text>

              <Heading color="brand.500" fontSize="2xl" as="h4" pt={5} pb={2}>
                General Info
              </Heading>
              <Text>{selectedMinion.owned} players own this minion</Text>
              <Text>Minion introduced in patch {selectedMinion.patch}</Text>
              <Text>
                This minion is{' '}
                <b>{selectedMinion.tradeable ? 'tradable' : 'non-tradable'}</b>
              </Text>

              <Text pt={2}>
                <u>Race:</u> {selectedMinion.race.name}
              </Text>
              <Text>
                <u>Behavior:</u> {selectedMinion.behavior.name}
              </Text>

              {selectedMinion?.description && (
                <>
                  <Heading
                    color="brand.500"
                    fontSize="2xl"
                    as="h4"
                    pt={5}
                    pb={2}
                  >
                    Description
                  </Heading>
                  <Text>{selectedMinion.description}</Text>
                </>
              )}

              <Heading color="brand.500" fontSize="2xl" as="h4" pt={5} pb={2}>
                Source(s)
              </Heading>

              {selectedMinion.sources.length > 0 ? (
                <SimpleGrid gap={1} pt={2}>
                  {selectedMinion.sources.map((item, i) => (
                    <Text key={i}>
                      <u>{item.type}:</u> {item.text}
                    </Text>
                  ))}
                </SimpleGrid>
              ) : (
                <Text>There are no available sources for this minion</Text>
              )}

              <Heading color="brand.500" fontSize="2xl" as="h4" pt={5} pb={2}>
                Lord of Verminion (Minigame)
              </Heading>
              <Box pt={2}>
                <Text fontWeight="medium">Stats</Text>
                <Text>
                  <u>HP:</u> {selectedMinion.verminion.hp}
                </Text>
                <Text>
                  <u>Attack:</u> {selectedMinion.verminion.attack}
                </Text>
                <Text>
                  <u>Defense:</u> {selectedMinion.verminion.defense}
                </Text>
                <Text>
                  <u>Speed:</u> {selectedMinion.verminion.speed}
                </Text>
                <Text>
                  <u>Cost:</u> {selectedMinion.verminion.cost}
                </Text>
              </Box>

              <Box pt={2}>
                <Text fontWeight="medium">Skill</Text>
                {selectedMinion.verminion?.skill ? (
                  <>
                    <Text>
                      <u>Name:</u> {selectedMinion.verminion.skill}
                    </Text>
                    <Text>
                      <u>Description:</u>{' '}
                      {selectedMinion.verminion.skill_description}
                    </Text>
                    <Text>
                      <u>Cost:</u> {selectedMinion.verminion.skill_cost}
                    </Text>
                    <Text>
                      <u>Type:</u> {selectedMinion.verminion.skill_type.name}
                    </Text>
                  </>
                ) : (
                  <Text>No source(s) found for this minion</Text>
                )}
              </Box>
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

export default Minions;
