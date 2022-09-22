import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  Box,
  FormControl,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text
} from '@chakra-ui/react';

import { useIndexMinionsQuery } from '@services/api/ffxivCollectApi';

import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import HeadingWithFilter from '@components/common/headingWithFilter';
import EmptyData from '@components/common/feedback/emptyData';
import Card from '@components/common/card';
import SEO from '@components/common/seo';

import { IMinion } from '@ts/interfaces/ffxivCollectInterfaces';
import BaseModal from '@components/common/modal';

const Minions: NextPage = () => {
  const router = useRouter();
  const minions = useIndexMinionsQuery({ limit: 20 });
  const { isLoading, error, data } = minions;

  const { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose } =
    useFilterDrawer();

  console.log(data);

  const [selectedMinion, setSelectedMinion] = useState<IMinion | null>(null);
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  return (
    <>
      <SEO title="Minions - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter
          title="Minions"
          data={data}
          onOpen={onFilterDrawerOpen}
        />
        <Box>
          {error ? (
            <Error />
          ) : isLoading ? (
            <Loading />
          ) : data ? (
            <>
              <FilterDrawer
                visible={isFilterDrawerOpen}
                close={onFilterDrawerClose}
                filtersJSX={
                  <>
                    <FormControl label="Name">
                      <Input placeholder="name of the minion" />
                    </FormControl>
                    <FormControl label="Race">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Behaviour">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Skill Type">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Source">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Owned">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Patch">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                  </>
                }
              />

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
        </Box>
      </Box>
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
    </>
  );
};

export default Minions;
