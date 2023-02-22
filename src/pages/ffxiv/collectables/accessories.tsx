import type { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
  VStack
} from '@chakra-ui/react';

import Error from '@components/feedback/error';
import EmptyData from '@components/feedback/emptyData';
import BaseModal from '@components/modal';
import CollectablesLayout from '@components/layouts/collectables';

import { indexAccessories } from '@services/ffxivCollectApi';
import { IFashion } from '@ts/interfaces/ffxivCollectInterfaces';
import {
  CollectableCard,
  CollectableCardSkeleton
} from '@components/cards/collectableCard';
import { AnimatePresence } from 'framer-motion';

const Accessories: NextPage = () => {
  const router = useRouter();

  const [filters, setFilters] = useState('');
  const [selectedAccessory, setSelectedAccessory] = useState<IFashion | null>(
    null
  );

  const { isLoading, error, data } = useQuery({
    queryKey: ['accessories', { filters }],
    queryFn: () => indexAccessories({ filters })
  });

  /*
  <FormControl label="Name">
  <FormControl label="Owned">
  <FormControl label="Patch">
  */

  return (
    <CollectablesLayout
      title="Acessories"
      seo="Accessories - FFXIV Colectables"
      description="Look at all the final fantasies bellow! Do they even end?"
    >
      {error ? (
        <Error />
      ) : isLoading ? (
        <SimpleGrid gap={8} w="full" columns={[1, null, 2, 3, 4, 5]}>
          {Array.from(Array(10).keys()).map(i => (
            <AnimatePresence key={`skeleton ${i}`} mode="sync">
              <CollectableCardSkeleton imgH="" imgW="" />
            </AnimatePresence>
          ))}
        </SimpleGrid>
      ) : data?.results?.length ? (
        <SimpleGrid gap={8} columns={[1, null, 2, 3, 4, null, 5]}>
          {data.results.map((accessory, i) => (
            <CollectableCard
              key={i}
              isButton={true}
              onClick={() => {
                setSelectedAccessory(accessory);
                router.push(`${router.pathname}?accessory=${accessory.id}`);
              }}
            >
              <Image
                src={`${accessory.image}`}
                alt={`${accessory.name} Icon`}
              />

              <VStack
                alignItems="flex-start"
                justifyContent="flex-start"
                pt="8"
                spacing="3"
                w="100%"
              >
                <Heading noOfLines={2} fontSize="3xl" as="h1">
                  {accessory.name}
                </Heading>

                <VStack
                  alignItems="flex-start"
                  w="full"
                  textAlign="left"
                  spacing="1"
                >
                  <Text fontSize="16">{accessory.owned} players own this</Text>
                  <Text fontSize="16">
                    Introduced in patch {accessory.patch}
                  </Text>
                  <Text fontSize="16">
                    This accessory is{' '}
                    {accessory.tradeable === true ? 'tradable' : 'non-tradable'}
                  </Text>
                </VStack>

                <Text noOfLines={3}>{accessory.description}</Text>
              </VStack>
            </CollectableCard>
          ))}
        </SimpleGrid>
      ) : (
        <EmptyData expression="fashion accessories" />
      )}

      {selectedAccessory !== null ? (
        <BaseModal
          open={router.query?.accessory ? true : false}
          title={selectedAccessory.name}
          whileClosing={() => router.push(router.pathname)}
          body={
            <>
              <Heading color="brand.500" fontSize="4xl" as="h2" pb={2}>
                Description
              </Heading>
              <Text>{selectedAccessory.description}</Text>

              <Heading color="brand.500" fontSize="4xl" as="h2" pt={5} pb={2}>
                Source(s)
              </Heading>

              {selectedAccessory.sources.length > 0 ? (
                <SimpleGrid gap={1} pt={2}>
                  {selectedAccessory.sources.map((item, i) => (
                    <Text key={i}>
                      <u>{item.type}:</u> {item.text}
                    </Text>
                  ))}
                </SimpleGrid>
              ) : (
                <Text>No source(s) found for this fashion accessory</Text>
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

export default Accessories;
