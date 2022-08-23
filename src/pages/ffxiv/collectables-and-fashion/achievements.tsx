import type { NextPage } from 'next';
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
  SimpleGrid
} from '@chakra-ui/react';

import { useIndexAchievementsQuery } from '@services/api/ffxivCollectApi';
import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import HeadingWithFilter from '@components/common/headingWithFilter';
import SEO from '@components/common/seo';
import EmptyData from '@components/common/feedback/emptyData';
import Card from '@components/common/card';
import BaseModal from '@components/common/modal';

import { IAchievement } from '@ts/interfaces/api/ffxiv/ffxivCollectInterfaces';

const Achievements: NextPage = () => {
  const router = useRouter();
  const achievements = useIndexAchievementsQuery({
    id_in: '1...21'
  });
  const { data, error, isLoading } = achievements;

  const { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose } =
    useFilterDrawer();

  const [selectedAchievement, setSelectedAchievement] =
    useState<IAchievement | null>(null);

  console.log(data);

  return (
    <>
      <SEO title="Achievements - FFXIV" />

      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter
          title="Achievements"
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
                    <FormControl label="Category">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Type">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Reward">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Completed Percentage">
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

                      {achievement.category?.id ? (
                        <Text>Category: {achievement.category?.name}</Text>
                      ) : null}
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <EmptyData expression="achievements" />
              )}
            </>
          ) : null}
        </Box>
      </Box>

      {selectedAchievement !== null ? (
        <BaseModal
          open={router.query?.achievement ? true : false}
          title={selectedAchievement.name}
          whileClosing={() => router.push(router.pathname)}
          body={
            <>
              <Image
                width="110px"
                height="150px"
                mx="auto"
                src={`${selectedAchievement.icon}`}
                alt={`${selectedAchievement.name} Image`}
              />

              <SimpleGrid
                pt={4}
                color="brand.500"
                justifyItems="center"
                columns={[1, 2, null, 4]}
              ></SimpleGrid>
            </>
          }
        />
      ) : null}
    </>
  );
};

export default Achievements;
