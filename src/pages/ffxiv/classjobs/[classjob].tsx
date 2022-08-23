import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import Image from 'next/image';

import { Box, Flex, Grid, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import { makeStore, store } from '@redux/store';
import {
  getClassJob,
  getRunningOperationPromises,
  indexClassJobs,
  useGetClassJobQuery
} from '@services/api/ffxivApi';

import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import SEO from '@components/common/seo';
import { FFXIV_API } from '@utils/constants';
import { _add } from '@utils/helpers/add';
import ExternalLink from '@components/common/externalLink';

export async function getStaticPaths() {
  const store = makeStore();
  const result = await store.dispatch(indexClassJobs.initiate());

  const paths = result.data?.Results.map((cjob: any) => ({
    params: { classjob: `${cjob.ID}` }
  }));

  return {
    paths,
    fallback: true
  };
}

const ClassJob: NextPage = () => {
  const router = useRouter();

  console.log('ROUTER =>', router);

  const classJobId = router.query.classjob;
  const classJob = useGetClassJobQuery(
    typeof classJobId === 'string' ? classJobId : skipToken,
    { skip: router.isFallback }
  );
  const { isLoading, error, data } = classJob;

  console.log(data);

  const limitBreaks = [data.LimitBreak1, data.LimitBreak2, data.LimitBreak3];
  const modifiers = {
    'Hit Points': data.ModifierHitPoints,
    'Mana Points': data.ModifierManaPoints,
    Strength: data.ModifierStrength,
    Dexterity: data.ModifierDexterity,
    Intelligence: data.ModifierIntelligence,
    Vitality: data.ModifierVitality,
    Piety: data.ModifierPiety,
    Mind: data.ModifierMind
  };

  /*   for (const [key, value] of Object.entries(data)) {
    key.includes('Modifier') && modifiers.push({ name: key, value: value });
    key.includes('LimitBreak') &&
      !key.includes('Target') &&
      limitBreaks.push({ name: key, value: value });
  } */

  // console.log(modifiers, limitBreaks, data);

  return (
    <Box>
      <SEO
        title={`${data?.NameEnglish} - Class Job - FFXIV`}
        description={`Check some stuff about the ${data?.NameEnglish} class job`}
      />
      <Box px={[12, null, 24, 32]} py={16}>
        {error ? (
          <Error />
        ) : isLoading ? (
          <Loading />
        ) : data ? (
          <>
            <Flex alignItems="center" flexDir="row" gap={4} pb={10}>
              <Image
                src={`${FFXIV_API}${data?.Icon}`}
                width="75px"
                height="75px"
                alt={`${data?.NameEnglish} Icon`}
              />
              <Heading
                as="h1"
                color="brand.800"
                fontSize={['5xl', null, null, '8xl']}
                pt={2}
              >
                {data?.NameEnglish} ({data?.Abbreviation})
              </Heading>
            </Flex>

            <Box pb={10}>
              <Heading as="h2" pb={4}>
                General Details
              </Heading>

              <Grid
                gap={4}
                gridTemplateColumns={[
                  '1fr',
                  '1fr 1fr',
                  'repeat(auto-fill, 200px)'
                ]}
              >
                <Box>
                  <Heading fontSize="xl" as="h4">
                    Category
                  </Heading>
                  <Text>{data?.ClassJobCategory.Name}</Text>
                </Box>

                <Box>
                  <Heading fontSize="xl" as="h4">
                    Role
                  </Heading>
                  <Text>
                    {data?.Role === 0
                      ? 'Crafter'
                      : data?.Role === 1
                      ? 'Tank'
                      : data?.Role === 2
                      ? 'Melee DPS'
                      : data?.Role === 3
                      ? 'Ranged DPS'
                      : data?.Role === 4
                      ? 'Healer'
                      : data?.Role}
                  </Text>
                </Box>

                {data.StartingLevel && (
                  <Box>
                    <Heading fontSize="xl" as="h4">
                      Starting Level
                    </Heading>
                    <Text>{data?.StartingLevel}</Text>
                  </Box>
                )}

                <Box>
                  <Heading fontSize="xl" as="h4">
                    Can Queue for Duty
                  </Heading>
                  <Text>{data?.CanQueueForDuty === 1 ? 'True' : 'False'}</Text>
                </Box>

                {data.StartingTown !== null && (
                  <Box>
                    <Heading fontSize="xl" as="h4">
                      Starting Town
                    </Heading>
                    <Image
                      src={`${FFXIV_API}${data.StartingTown.IconHD}`}
                      width="75px"
                      height="75px"
                      alt={`${data.StartingTown?.Name} Icon`}
                    />
                    <Text>{data.StartingTown.Name}</Text>
                  </Box>
                )}

                {data.ClassJobParent !== null && (
                  <Box>
                    <Heading fontSize="xl" as="h4">
                      Class
                    </Heading>
                    {/* colocar aqui um link */}
                    <Text>{data.ClassJobParent.NameEnglish}</Text>
                  </Box>
                )}

                {data.ItemSoulCrystal !== null && (
                  <Box>
                    <Heading fontSize="xl" as="h4">
                      Soul Crystal
                    </Heading>
                    <Image
                      src={`${FFXIV_API}${data.ItemSoulCrystal.IconHD}`}
                      width="75px"
                      height="75px"
                      alt={`${data.NameEnglish} Soul Crystal Icon`}
                    />
                    <Text>{data?.ItemSoulCrystal.Name}</Text>
                  </Box>
                )}
              </Grid>
            </Box>

            <Box pb={10}>
              <Heading as="h2" pb={4}>
                Modifiers
              </Heading>
              <SimpleGrid
                columns={[1, 2, 4, Object.keys(modifiers).length]}
                gap={4}
              >
                {Object.keys(modifiers).map((key, index) => (
                  <Box key={index}>
                    <Heading fontSize="xl" as="h4">
                      {key}
                    </Heading>
                    <Text>{modifiers[key]}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>

            <Box pb={10}>
              <Heading as="h2" pb={4}>
                Actions
              </Heading>
            </Box>

            <Box pb={10}>
              <Heading as="h2" pb={4}>
                Traits
              </Heading>
            </Box>

            <Box pb={16}>
              <Heading as="h2" pb={4}>
                Limit Breaks
              </Heading>
              {data.LimitBreak1 === null &&
              data.LimitBreak2 === null &&
              data.LimitBreak3 === null ? (
                <Text>This class/job doesn't have any Limit Break action</Text>
              ) : (
                <SimpleGrid columns={[1, null, 3]} gap={8}>
                  {limitBreaks.map((item, i) => (
                    <Flex
                      p={6}
                      gap={4}
                      borderRadius="lg"
                      flexDir="column"
                      justify="center"
                      alignItems="center"
                      bgColor="brand.600"
                      textColor="white"
                      boxShadow="md"
                      key={i}
                    >
                      <Image
                        src={`${FFXIV_API}${item.IconHD}`}
                        width="75px"
                        height="75px"
                        alt={`${item?.Name} Icon`}
                      />
                      <Text color="white">{_add(i, 1)} Bar Limit Break</Text>
                      <Heading color="white" fontSize="xl" as="h4">
                        {item?.Name}
                      </Heading>
                    </Flex>
                  ))}
                </SimpleGrid>
              )}
            </Box>

            <Flex justifyContent="center" alignItems="center" flexDir="column">
              <Text fontSize="2xl">
                Of course, this page only contains a droplet of info of this
                class/job but you can always look in other places for more
                information
              </Text>
              <Text pt={2} fontSize="xl">
                <ExternalLink
                  link={`https://www.google.com/search?q=ffxiv+${data.NameEnglish.toLowerCase()}`}
                >
                  Search in Google for {data.NameEnglish} info
                </ExternalLink>
              </Text>
            </Flex>
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export const getStaticProps = store.getStaticProps(store => async context => {
  const classjob = context.params?.classjob;

  if (typeof classjob === 'string') {
    store.dispatch(getClassJob.initiate(classjob));
  }

  await Promise.all(getRunningOperationPromises());

  return {
    props: {}
  };
});

export default ClassJob;
