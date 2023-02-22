import { GetServerSideProps, NextPage } from 'next';
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

import Error from '@components/feedback/error';
import Loading from '@components/feedback/loading';
import EmptyData from '@components/feedback/emptyData';
import Card from '@components/card';
import CollectablesLayout from '@components/layouts/collectables';

import { IMinion } from '@ts/interfaces/ffxivCollectInterfaces';
import BaseModal from '@components/modal';
import { indexMinions } from '@services/ffxivCollectApi';

const Minions: NextPage = () => {
  const router = useRouter();

  const [filters, setFilters] = useState('');
  const [selectedMinion, setSelectedMinion] = useState<IMinion | null>(null);
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  // id_in: '1...21'
  const { data, error, isLoading, refetch } = useInfiniteQuery(
    ['minions', filters],
    indexMinions,
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor
    }
  );

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
        <>
          {data.results?.length ? (
            <SimpleGrid gap={8} columns={[1, null, 2, 3, 4, 5]}>
              {data.results.map((minion, i) => (
                <Card
                  p={6}
                  key={i}
                  isButton={true}
                  onClick={() => {
                    setSelectedMinion(minion);
                    router.push(`${router.pathname}?minion=${minion.id}`);
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
                </Card>
              ))}
            </SimpleGrid>
          ) : (
            <EmptyData expression="minions" />
          )}
        </>
      ) : null}

      {selectedMinion !== null ? (
        <BaseModal
          open={router.query?.minion ? true : false}
          title={selectedMinion.name}
          whileClosing={() => router.push(router.pathname)}
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
