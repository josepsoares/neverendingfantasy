import type {
  ICard,
  ICardsResponse
} from '@ts/interfaces/tripleTriadInterfaces';
import type { GetServerSideProps, NextPage } from 'next';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';
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
  InfiniteScrollClient,
  InfiniteScrollClientItemsWrapper
} from '@components/infiniteScrollClient';
import CollectablesLayout from '@components/layouts/collectables';
import BaseModal from '@components/modal';
import { TRIPLE_TRIAD_API } from '@utils/constants';
import { _chunk } from '@utils/helpers/arr';
//import { addParamsToGetRequest } from '@utils/helpers/addParamsToGetRequest';
import { _add, _mutiply } from '@utils/helpers/math';

const Cards: NextPage = () => {
  const router = useRouter();

  const [cards, setCards] = useState({
    all: [],
    current: [],
    currentPage: 0,
    pages: 1,
    hasNextPage: true
  });

  const [filters, setFilters] = useState('');
  const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  //* in the pagination we start with 20 results, id_in=1...21
  //* and then fetch 10 items and the user scrolls and hits a threshold
  const { data, error, isLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: async ({ pageParam = { start: 1, end: 21 } }) => {
      const { data }: AxiosResponse<ICardsResponse> = await axios.get(
        `${TRIPLE_TRIAD_API}/cards?id_in=${pageParam.start}...${pageParam.end}&${filters}`
      );

      return data;
    },
    onSuccess(data) {
      const chunkedData = _chunk(data.results, 10);
      setCards({
        ...cards,
        all: chunkedData,
        current: [chunkedData[0]],
        pages: chunkedData.length
      });
    }
  });

  const setNextPage = () => {
    const nextPage = _add(cards.currentPage, 1);

    setCards({
      ...cards,
      current: [...cards.current, cards.all[nextPage]],
      currentPage: nextPage,
      hasNextPage: nextPage !== cards.all.length - 1
    });
  };

  /*
  <FormLabel as="legend">Name</FormLabel>
  <FormLabel as="legend">Stars</FormLabel>
  <FormLabel as="legend">Sell Price</FormLabel>
  <FormLabel as="legend">Owned</FormLabel>
  */

  return (
    <CollectablesLayout
      title="Triple Triad Cards"
      description="Look at all the final fantasies bellow! Do they even end?"
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
          hasNextPage={cards.hasNextPage}
          endMessage="Well, there you have it, all the FFXIV achievements, is there even a player who got them all?"
        >
          {cards.current.map((page, pageI) =>
            page.map((card: ICard, i: number) => {
              return (
                <InfiniteScrollClientItemsWrapper
                  key={i}
                  hasNextPage={cards.hasNextPage}
                  setNextPage={() => setNextPage()}
                  isLastAvailablePage={pageI === cards.current.length - 1}
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
                </InfiniteScrollClientItemsWrapper>
              );
            })
          ) || <EmptyData expression="emotes" />}
        </InfiniteScrollClient>
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
