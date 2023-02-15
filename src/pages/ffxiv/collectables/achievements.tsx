import type { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';

import {
  Box,
  FormControl,
  Heading,
  Input,
  Select,
  Image,
  Text,
  SimpleGrid,
  FormLabel
} from '@chakra-ui/react';

import Error from '@components/feedback/error';
import Loading from '@components/feedback/loading';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import SEO from '@components/seo';
import EmptyData from '@components/feedback/emptyData';
import Card from '@components/card';
import BaseModal from '@components/modal';

import { IAchievement } from '@ts/interfaces/ffxivCollectInterfaces';
import { useInfiniteQuery } from '@tanstack/react-query';
import { indexAchievements } from '@services/ffxivCollectApi';

const Achievements: NextPage = () => {
  const router = useRouter();

  const [filters, setFilters] = useState('');
  const [selectedAchievement, setSelectedAchievement] =
    useState<IAchievement | null>(null);

  const { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose } =
    useFilterDrawer();

  // id_in: '1...21'
  const { data, error, isLoading, refetch } = useInfiniteQuery(
    ['achievements', filters],
    indexAchievements,
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor
    }
  );

  return (
    <>
      <SEO title="Achievements - FFXIV" />

      <Box px={[12, null, 24, 32]} py={16}>
        <Heading fontSize="8xl" as="h1" pt={2} m={0} color="brand.800">
          Achievements
        </Heading>

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
                      <FormLabel as="legend">Name</FormLabel>
                      <Input placeholder="name of the achievement" />
                    </FormControl>
                    <FormControl label="Category">
                      <FormLabel as="legend">Category</FormLabel>
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Points Rewarded">
                      <FormLabel as="legend">Points Rewarded</FormLabel>
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Completed Percentage">
                      <FormLabel as="legend">Completed Percentage</FormLabel>
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Patch">
                      <FormLabel as="legend">Patch</FormLabel>
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                  </>
                }
              />
              <SimpleGrid gap={8} columns={[1, null, 2, 3, 4, 5]}>
                {data.results.map((achievement, i) => (
                  <Card
                    p={6}
                    key={i}
                    isButton={true}
                    onClick={() => {
                      setSelectedAchievement(achievement);
                      router.push(
                        `${router.pathname}?achievement=${achievement.id}`
                      );
                    }}
                  >
                    <Box
                      borderRadius="lg"
                      borderWidth="thin"
                      borderColor="white"
                    >
                      <Image
                        src={`${achievement.icon}`}
                        width="full"
                        height="full"
                        borderRadius="lg"
                        alt={`Achievement ${achievement.name} Icon`}
                      />
                    </Box>

                    <Heading noOfLines={2} fontSize="2xl" as="h4">
                      {achievement.name}
                    </Heading>

                    <Box>
                      {achievement.category?.id ? (
                        <Text fontSize="16">
                          Category: {achievement.category?.name}
                        </Text>
                      ) : null}
                      {achievement.type?.id ? (
                        <Text fontSize="16">
                          Type: {achievement.type?.name}
                        </Text>
                      ) : null}
                    </Box>
                  </Card>
                ))}
              </SimpleGrid>
            </>
          ) : (
            <EmptyData expression="achievements" />
          )}
        </Box>
      </Box>

      {selectedAchievement !== null ? (
        <BaseModal
          open={router.query?.achievement ? true : false}
          title={selectedAchievement.name}
          whileClosing={() => router.push(router.pathname)}
          body={
            <>
              <Heading color="brand.500" fontSize="2xl" as="h4" pb={2}>
                General Info
              </Heading>
              <Text>{selectedAchievement.owned} players achieved this</Text>
              <Text>Introduced in patch {selectedAchievement.patch}</Text>

              <Text pt={2}>
                <u>Points:</u> {selectedAchievement.points}
              </Text>
              <Text>
                <u>Category:</u> {selectedAchievement.category.name}
              </Text>
              <Text>
                <u>Type:</u> {selectedAchievement.type.name}
              </Text>

              {selectedAchievement?.description && (
                <>
                  <Heading
                    pt={5}
                    pb={2}
                    as="h4"
                    fontSize="2xl"
                    color="brand.500"
                  >
                    Description
                  </Heading>
                  <Text>{selectedAchievement.description}</Text>
                </>
              )}

              <Heading color="brand.500" fontSize="2xl" as="h4" pt={5} pb={2}>
                Reward
              </Heading>

              {selectedAchievement?.reward ? (
                <Text>
                  <u>{selectedAchievement.reward.type}:</u>{' '}
                  {selectedAchievement.reward.name}
                </Text>
              ) : (
                <Text>This achievement has no reward</Text>
              )}
            </>
          }
        />
      ) : null}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {}
  };
};

export default Achievements;
