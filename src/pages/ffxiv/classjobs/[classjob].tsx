import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import { makeStore, store } from '@redux/store';
import {
  getClassJob,
  getRunningOperationPromises,
  indexClassJobs,
  useGetClassJobQuery
} from '@services/api/ffxivApi';

import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import SEO from '@components/common/seo';
import Image from 'next/image';
import { FFXIV_API } from '@utils/constants';

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

  const classJobId = router.query.classjob;
  const classJob = useGetClassJobQuery(
    typeof classJobId === 'string' ? classJobId : skipToken,
    { skip: router.isFallback }
  );
  const { isLoading, error, data } = classJob;

  const limitBreaks = [];
  const modifiers = [];

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
                width="40px"
                height="40px"
                alt={`${data?.NameEnglish} Icon`}
              />
              <Heading as="h1" pt={2}>
                {data?.NameEnglish} ({data?.Abbreviation})
              </Heading>
            </Flex>

            <Box pb={10}>
              <Text>Category</Text>
              <Text>{data?.ClassJobCategory.Name}</Text>
            </Box>

            <Box>
              <Heading as="h2">Modifiers</Heading>
              {/* {modifiers.map((item, i) => (
                <Box key={i}>
                  <Text>{item.name}</Text>
                   <Text>{item?.value}</Text> 
                </Box>
              ))} */}
            </Box>

            <Box>
              <Heading as="h2">Limit Breaks</Heading>
              {/* {limitBreaks.map((item, i) => (
                <Box key={i}> <Text>{item?.value.Name}</Text> </Box>
              ))} */}
            </Box>
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
