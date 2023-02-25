import type { IEmote } from '@ts/interfaces/ffxivCollectInterfaces';

import { useRouter } from 'next/router';
import { useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import {
  Box,
  Button,
  Flex,
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
import {
  InfiniteScroll,
  InfiniteScrollItemsWrapper
} from '@components/infiniteScroll';
import CollectablesLayout from '@components/layouts/collectables';
import BaseModal from '@components/modal';
import { indexEmotes } from '@services/ffxivCollectApi';
import { _mutiply } from '@utils/helpers/math';

const Emotes = () => {
  const router = useRouter();

  const [filters, setFilters] = useState('');
  const [selectedEmote, setSelectedEmote] = useState<IEmote | null>(null);
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
    queryKey: ['emotes', filters],
    queryFn: indexEmotes,
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
  <FormControl label="Tradeable">
  <FormControl label="Owned">
  <FormControl label="Patch">
  */

  return (
    <CollectablesLayout
      seo="Emotes - FFXIV Colectables"
      title="Emotes"
      description=" Look at all the final fantasies bellow! Do they even end?"
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
            page?.results.map((emote: IEmote, i: number) => {
              return (
                <InfiniteScrollItemsWrapper
                  key={i}
                  hasNextPage={hasNextPage}
                  fetchNextPage={fetchNextPage}
                  isLastAvailablePage={pageI === data.pages.length - 1}
                >
                  <CollectableCard isButton={false}>
                    <Image
                      width="16"
                      height="16"
                      src={emote.icon}
                      alt={emote.name}
                    />
                    <Heading
                      textAlign="center"
                      noOfLines={2}
                      fontSize="2xl"
                      as="h4"
                    >
                      {emote.name}
                    </Heading>

                    <Box textAlign="center">
                      <Text fontWeight="medium">{emote.command}</Text>
                      <Text>{emote.category.name} Emote</Text>
                    </Box>

                    <Box textAlign="center">
                      <Text fontSize="16">
                        {emote.owned} players own this emote
                      </Text>

                      <Text fontSize="16">
                        Introduced in patch {emote.patch}
                      </Text>

                      <Text fontSize="16">
                        This emote is{' '}
                        {emote.tradeable ? 'tradable' : 'non-tradable'}
                      </Text>
                    </Box>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSelectedEmote(emote);
                        router.push(`${router.pathname}?emote=${emote.id}`);
                      }}
                      _active={{
                        color: 'brand.500',
                        bgColor: 'white'
                      }}
                      _hover={{
                        color: 'brand.500',
                        bgColor: 'white'
                      }}
                    >
                      Check source(s)
                    </Button>
                  </CollectableCard>
                </InfiniteScrollItemsWrapper>
              );
            })
          ) || <EmptyData expression="emotes" />}
        </InfiniteScroll>
      ) : null}

      {selectedEmote !== null ? (
        <BaseModal
          open={router.query?.emote ? true : false}
          title={selectedEmote.name}
          whileClosing={() => router.push(router.pathname)}
          body={
            <>
              <>
                <Heading color="brand.500" fontSize="2xl" as="h4" pb={2}>
                  Source(s)
                </Heading>

                {selectedEmote.sources.length > 0 ? (
                  <SimpleGrid gap={1} pt={2}>
                    {selectedEmote.sources.map((item, i) => (
                      <Text key={i}>
                        <u>{item.type}:</u> {item.text}
                      </Text>
                    ))}
                  </SimpleGrid>
                ) : (
                  <Text>No source(s) found for this emote</Text>
                )}
              </>
            </>
          }
        />
      ) : null}
    </CollectablesLayout>
  );
};

export default Emotes;
