import type { IHairstyle } from '@ts/interfaces/ffxivCollectInterfaces';
import type { GetServerSideProps, NextPage } from 'next';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';
import { Heading, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import {
  CollectableCard,
  CollectableCardSkeleton
} from '@components/cards/collectableCard';
import EmptyData from '@components/feedback/emptyData';
import Error from '@components/feedback/error';
import CollectablesLayout from '@components/layouts/collectables';
import { indexHairstyles } from '@services/ffxivCollectApi';

const Hairstyles: NextPage = () => {
  const router = useRouter();

  const [filters, setFilters] = useState('');
  const [selectedAchievement, setSelectedAchievement] =
    useState<IHairstyle | null>(null);

  // id_in: '1...21'
  const { data, error, isLoading } = useQuery({
    queryKey: ['hairstyles'],
    queryFn: indexHairstyles
  });

  /* 
  <FormControl label="Name">
  <FormControl label="Category">
  <FormControl label="Points Rewarded">
  <FormControl label="Completed Percentage">
  */

  return (
    <CollectablesLayout
      title="Hairstyles"
      description="Look at all the final fantasies bellow! Do they even end?"
    >
      {error ? (
        <Error />
      ) : isLoading ? (
        <SimpleGrid gap={8} w="full" columns={[1, null, 2, 3, 4, null, 5]}>
          {Array.from(Array(10).keys()).map(i => (
            <CollectableCardSkeleton key={i} imgH="32" />
          ))}
        </SimpleGrid>
      ) : data?.results?.length ? (
        <SimpleGrid gap={8} columns={[1, null, 2, 3, 4, null, 5]}>
          {data.results.map((hairstyle, i) => (
            <CollectableCard key={i} isButton={false}>
              <Image
                h="32"
                w="auto"
                mx="auto"
                src={`${hairstyle.icon}`}
                alt={`${hairstyle.name} Icon`}
              />

              <VStack
                w="100%"
                spacing="3"
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Heading noOfLines={2} fontSize="3xl" as="h1">
                  {hairstyle.name}
                </Heading>

                <VStack
                  w="full"
                  spacing="1"
                  textAlign="left"
                  fontStyle="italic"
                  alignItems="flex-start"
                >
                  <Text fontSize="16">{hairstyle.owned} players own this</Text>
                  <Text fontSize="16">
                    Introduced in patch {hairstyle.patch}
                  </Text>
                  <Text fontSize="16">
                    This hairstyle is{' '}
                    {hairstyle.tradeable === true ? 'tradable' : 'non-tradable'}
                  </Text>
                </VStack>

                <Text noOfLines={3}>{hairstyle.description}</Text>
              </VStack>
            </CollectableCard>
          ))}
        </SimpleGrid>
      ) : (
        <EmptyData expression="hairstyles" />
      )}
    </CollectablesLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {}
  };
};

export default Hairstyles;
