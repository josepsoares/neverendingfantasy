import type { IArmoire } from '@ts/interfaces/ffxivCollectInterfaces';
import type { GetServerSideProps, NextPage } from 'next';

import { useState } from 'react';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
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
  InfiniteScrollClient,
  InfiniteScrollClientItemsWrapper
} from '@components/infiniteScrollClient';
import CollectablesLayout from '@components/layouts/collectables';
import BaseModal from '@components/modal';
import { indexArmoires } from '@services/ffxivCollectApi';
import { _chunk } from '@utils/helpers/arr';
import { _add, _mutiply } from '@utils/helpers/math';

const Armoires: NextPage = () => {
  const [armoires, setArmoires] = useState({
    all: [],
    current: [],
    currentPage: 0,
    pages: 1,
    hasNextPage: true
  });

  const [filters, setFilters] = useState('');
  const [selectedArmoire, setSelectedArmoire] = useState<IArmoire | null>(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ['armoires'],
    queryFn: indexArmoires,
    onSuccess(data) {
      const chunkedData = _chunk(data.results, 10);
      setArmoires({
        ...armoires,
        all: chunkedData,
        current: [chunkedData[0]],
        pages: chunkedData.length
      });
    }
  });

  const setNextPage = () => {
    const nextPage = _add(armoires.currentPage, 1);
    console.log(nextPage, nextPage !== armoires.all.length);

    setArmoires({
      ...armoires,
      current: [...armoires.current, armoires.all[nextPage]],
      currentPage: nextPage,
      hasNextPage: nextPage !== armoires.all.length - 1
    });
  };

  /*
  <FormControl label="Name">                  
  <FormControl label="Category">
  <FormControl label="Owned">                  
  */

  return (
    <CollectablesLayout
      title="Armoire"
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
          hasNextPage={armoires.hasNextPage}
          endMessage="Well, there you have it, all the FFXIV achievements, is there even a player who got them all?"
        >
          {armoires.current.map((page, pageI) =>
            page.map((armoire: IArmoire, i: number) => {
              return (
                <InfiniteScrollClientItemsWrapper
                  key={i}
                  hasNextPage={armoires.hasNextPage}
                  setNextPage={() => setNextPage()}
                  isLastAvailablePage={pageI === armoires.current.length - 1}
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
                </InfiniteScrollClientItemsWrapper>
              );
            })
          )}
        </InfiniteScrollClient>
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
