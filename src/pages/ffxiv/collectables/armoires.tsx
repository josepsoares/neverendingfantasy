import type { IArmoire } from '@ts/interfaces/ffxivCollectInterfaces';
import type { GetServerSideProps, NextPage } from 'next';

import { useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import {
  Box,
  Button,
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
import Error from '@components/feedback/error';
import {
  InfiniteScroll,
  InfiniteScrollItemsWrapper
} from '@components/infiniteScroll';
import CollectablesLayout from '@components/layouts/collectables';
import BaseModal from '@components/modal';
import { indexArmoires } from '@services/ffxivCollectApi';
import { _mutiply } from '@utils/helpers/math';

const Armoires: NextPage = () => {
  const [filters, setFilters] = useState('');
  const [selectedArmoire, setSelectedArmoire] = useState<IArmoire | null>(null);

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ['armoires', filters],
    queryFn: indexArmoires,
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
  <FormControl label="Category">
  <FormControl label="Owned">                  
  <FormControl label="Patch">
  */

  return (
    <CollectablesLayout
      seo="Armoire - FFXIV Colectables"
      title="Armoire"
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
            page?.results.map((armoire: IArmoire, i: number) => {
              return (
                <InfiniteScrollItemsWrapper
                  key={i}
                  hasNextPage={hasNextPage}
                  fetchNextPage={fetchNextPage}
                  isLastAvailablePage={pageI === data.pages.length - 1}
                >
                  <CollectableCard isButton={false}>
                    <Image
                      w={12}
                      h={12}
                      src={armoire.icon}
                      alt={armoire.name}
                    />
                    <Heading
                      textAlign="center"
                      noOfLines={2}
                      fontSize="2xl"
                      as="h4"
                    >
                      {armoire.name}
                    </Heading>

                    <Text>{armoire.category.name}</Text>

                    <Box textAlign="center">
                      <Text fontSize="16">
                        {armoire.owned} players own this
                      </Text>

                      <Text fontSize="16">
                        Introduced in patch {armoire.patch}
                      </Text>
                    </Box>

                    <Button
                      variant="ghost"
                      onClick={() => setSelectedArmoire(armoire)}
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
          )}
        </InfiniteScroll>
      ) : null}

      {selectedArmoire !== null ? (
        <BaseModal
          open={selectedArmoire !== null}
          title={selectedArmoire.name}
          whileClosing={() => setSelectedArmoire(null)}
          body={
            <>
              <Heading color="brand.500" fontSize="2xl" as="h4" pb={2}>
                Source(s)
              </Heading>

              {selectedArmoire.sources.length > 0 ? (
                <SimpleGrid gap={1} pt={2}>
                  {selectedArmoire.sources.map((item, i) => (
                    <Text key={i}>
                      <u>{item.type}:</u> {item.text}
                    </Text>
                  ))}
                </SimpleGrid>
              ) : (
                <Text>No source(s) found for this armoire</Text>
              )}
            </>
          }
        />
      ) : null}
    </CollectablesLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const armoires = await indexArmoires({});
  return {
    props: {
      armoires
    }
  };
};

export default Armoires;
