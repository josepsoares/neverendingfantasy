import type { IFashion } from '@ts/interfaces/ffxivCollectInterfaces';
import type { GetServerSideProps, NextPage } from 'next';

import { useRouter } from 'next/router';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Heading, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import {
  CollectableCard,
  CollectableCardSkeleton
} from '@components/cards/collectableCard';
import EmptyData from '@components/feedback/emptyData';
import Error from '@components/feedback/error';
import CollectablesLayout from '@components/layouts/collectables';
import BaseModal from '@components/modal';
import { indexAccessories } from '@services/ffxivCollectApi';

const Accessories: NextPage = () => {
  const router = useRouter();

  const [selectedAccessory, setSelectedAccessory] = useState<IFashion | null>(
    null
  );

  const { isLoading, error, data } = useQuery({
    queryKey: ['accessories'],
    queryFn: () => indexAccessories()
  });

  return (
    <CollectablesLayout
      title="Acessories"
      seo="Accessories - FFXIV Colectables"
      description="Want to make your characters pop out and highlight it from others? Fear not, fashion accessories come to the rescue"
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
          {data.results.map((accessory, i) => (
            <CollectableCard
              key={i}
              isButton={true}
              onClick={() => {
                setSelectedAccessory(accessory);
                router.push(
                  `${router.pathname}?accessory=${accessory.id}`,
                  {},
                  { scroll: false }
                );
              }}
            >
              <Image
                h="32"
                w="auto"
                mx="auto"
                src={`${accessory.image}`}
                alt={`${accessory.name} Icon`}
              />

              <VStack
                w="100%"
                spacing="3"
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Heading noOfLines={2} fontSize="3xl" as="h1">
                  {accessory.name}
                </Heading>

                <VStack
                  w="full"
                  spacing="1"
                  textAlign="left"
                  fontStyle="italic"
                  alignItems="flex-start"
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
          whileClosing={() =>
            router.push(router.pathname, {}, { scroll: false })
          }
          body={
            <>
              <Heading
                as="h2"
                pb="2"
                fontSize="2xl"
                fontFamily="body"
                color="brand.500"
                letterSpacing="normal"
              >
                Description
              </Heading>
              <Text>{selectedAccessory.description}</Text>

              <Heading
                as="h2"
                pt="5"
                pb="2"
                fontFamily="body"
                color="brand.500"
                fontSize="2xl"
                letterSpacing="normal"
              >
                Source(s)
              </Heading>

              {selectedAccessory.sources.length > 0 ? (
                <SimpleGrid gap={1}>
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
