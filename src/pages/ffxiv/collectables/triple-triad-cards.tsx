import type {
  ICard,
  ICardsResponse
} from '@ts/interfaces/tripleTriadInterfaces';
import type { GetServerSideProps, NextPage } from 'next';

import { useRouter } from 'next/router';
import { useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Image,
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
  InfiniteScroll,
  InfiniteScrollItemsWrapper
} from '@components/infiniteScroll';
import CollectablesLayout from '@components/layouts/collectables';
import BaseModal from '@components/modal';
import { TRIPLE_TRIAD_API } from '@utils/constants';
//import { addParamsToGetRequest } from '@utils/helpers/addParamsToGetRequest';
import { _add, _mutiply } from '@utils/helpers/math';

const Cards: NextPage = () => {
  const router = useRouter();
  const [filters, setFilters] = useState('');
  const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  //* in the pagination we start with 20 results, id_in=1...21
  //* and then fetch 10 items and the user scrolls and hits a threshold
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: async ({ pageParam = { start: 1, end: 21 } }) => {
      const { data }: AxiosResponse<ICardsResponse> = await axios.get(
        `${TRIPLE_TRIAD_API}/cards?id_in=${pageParam.start}...${pageParam.end}&${filters}`
      );

      return data;
    },
    getNextPageParam: (lastPage, pages) => {
      //* check if the last request has count=0
      //* if so there are no more items to fetch
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
  <FormLabel as="legend">Name</FormLabel>
  <FormLabel as="legend">Stars</FormLabel>
  <FormLabel as="legend">Sell Price</FormLabel>
  <FormLabel as="legend">Owned</FormLabel>
  <FormLabel as="legend">Patch</FormLabel>
  */

  return (
    <CollectablesLayout
      seo="Triple Triad Cards - FFXIV Colectables"
      title="Triple Triad Cards"
      description="Look at all the final fantasies bellow! Do they even end?"
    >
      {error ? (
        <Error />
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
            page?.results.map((card: ICard, i: number) => {
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
                      setSelectedCard(card);
                      router.push(
                        `${router.pathname}?card=${card.id}`,
                        {},
                        { scroll: false }
                      );
                    }}
                  >
                    <Image
                      src={`${card.image}`}
                      width="75px"
                      height="80px"
                      alt={`${card.name} Image`}
                    />
                    <Heading noOfLines={1} fontSize="2xl" as="h4">
                      {card.name}
                    </Heading>
                    <Text>
                      {card.type.name} - {card.stars}{' '}
                      {card.stars === 1 ? 'Star' : 'Stars'}
                    </Text>
                  </CollectableCard>
                </InfiniteScrollItemsWrapper>
              );
            })
          ) || <EmptyData expression="emotes" />}
        </InfiniteScroll>
      ) : null}

      {selectedCard !== null ? (
        <BaseModal
          open={router.query?.card ? true : false}
          title={selectedCard.name}
          whileClosing={() =>
            router.push(router.pathname, {}, { scroll: false })
          }
          body={
            <>
              <Image
                src={`${selectedCard.image}`}
                width="110px"
                height="150px"
                mx="auto"
                alt={`${selectedCard.name} Image`}
              />

              <SimpleGrid
                pt={4}
                color="brand.500"
                justifyItems="center"
                columns={[1, 2, null, 4]}
              >
                <Text>
                  {selectedCard.stars}{' '}
                  {selectedCard.stars === 1 ? 'Star' : 'Stars'}
                </Text>
                <Text>Type: {selectedCard.type.name}</Text>
                <Text>Owned: {selectedCard.owned}</Text>
                <Text>Sell Price: {selectedCard.sell_price}</Text>
              </SimpleGrid>

              <Text mt={4} mb={2} noOfLines={seeAllDescription ? null : 3}>
                {selectedCard.description}
              </Text>

              <Center>
                <Button
                  mb={4}
                  variant="ghost"
                  colorScheme="brand"
                  onClick={() => setSeeAllDescription(!seeAllDescription)}
                >
                  {seeAllDescription
                    ? 'Trucante description'
                    : 'Show all description'}
                </Button>
              </Center>

              <Divider w="75%" mx="auto" mb={4} />

              <Box pb={4}>
                <Heading fontSize="2xl" color="brand.500" pb={2} as="h4">
                  Stats
                </Heading>

                <SimpleGrid columns={[1, 2, 4]}>
                  {Object.entries(selectedCard.stats.formatted).map(
                    ([key, value], i) => (
                      <Text key={i}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                      </Text>
                    )
                  )}
                </SimpleGrid>
              </Box>

              <Box>
                <Heading fontSize="2xl" color="brand.500" as="h4">
                  Sources
                </Heading>

                {selectedCard.sources.drops.length > 0 ? (
                  <Text pt={2}>
                    <u>Drops:</u>
                    {selectedCard.sources.drops
                      .map((item, _) => item)
                      .join(', ')}
                  </Text>
                ) : null}
                {selectedCard.sources.npcs.length > 0 ? (
                  <Text pt={2}>
                    <u>NPCs:</u>
                    {selectedCard.sources.npcs
                      .map(
                        (item, i) => `${item.name} (in ${item.location.name})`
                      )
                      .join(', ')}
                  </Text>
                ) : null}
                {selectedCard.sources.packs.length > 0 ? (
                  <Text pt={2}>
                    <u>Packs:</u>
                    {selectedCard.sources.packs
                      .map((item, _) => `${item.name} - ${item.cost} MGP`)
                      .join(', ')}
                  </Text>
                ) : null}
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

export default Cards;
