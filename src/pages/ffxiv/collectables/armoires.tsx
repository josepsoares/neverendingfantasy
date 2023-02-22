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

import Card from '@components/card';
import BaseModal from '@components/modal';
import Loading from '@components/feedback/loading';
import Error from '@components/feedback/error';
import CollectablesLayout from '@components/layouts/collectables';

import { indexArmoires } from '@services/ffxivCollectApi';
import { IArmoire } from '@ts/interfaces/ffxivCollectInterfaces';

const Armoires: NextPage = () => {
  const [filters, setFilters] = useState('');
  const [selectedArmoire, setSelectedArmoire] = useState<IArmoire | null>(null);

  const { data, error, isLoading, refetch } = useInfiniteQuery(
    ['armoires', filters],
    indexArmoires,
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor
    }
  );

  return (
    <CollectablesLayout
      seo="Armoire - FFXIV Colectables"
      title="Armoire"
      description="Look at all the final fantasies bellow! Do they even end?"
    >
      {error ? (
        <Error />
      ) : isLoading ? (
        <Loading />
      ) : data ? (
        <>
          {/* <FormControl label="Name">
                      <FormLabel as="legend">Name</FormLabel>
                      <Input placeholder="name of the armor" />
                    </FormControl>
                    <FormControl label="Category">
                      <FormLabel as="legend">Category</FormLabel>
                      <Select value={'one'}></Select>
                    </FormControl>
                    <FormControl label="Owned">
                      <FormLabel as="legend">Owned</FormLabel>
                      <Select value={'one'}></Select>
                    </FormControl>
                    <FormControl label="Patch">
                      <FormLabel as="legend">Patch</FormLabel>
                      <Select value={'one'}></Select>
                    </FormControl> */}

          <SimpleGrid gap={8} columns={[1, null, 2, 3, 4, 5]}>
            {data.results.map((armoire, i) => (
              <Card p={6} key={i}>
                <Image w={12} h={12} src={armoire.icon} alt={armoire.name} />
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
                  <Text fontSize="16">{armoire.owned} players own this</Text>

                  <Text fontSize="16">Introduced in patch {armoire.patch}</Text>
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
              </Card>
            ))}
          </SimpleGrid>
        </>
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