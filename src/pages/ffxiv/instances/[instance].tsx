import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import {
  getInstance,
  getRunningOperationPromises,
  indexInstances,
  useGetInstanceQuery
} from '@services/api/ffxivApi';
import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import { makeStore, store } from '@redux/store';

import SEO from '@components/common/seo';
import { FFXIV_API } from '@utils/constants';

export async function getStaticPaths() {
  const store = makeStore();
  const result = await store.dispatch(indexInstances.initiate({ limit: 20 }));

  const paths = result.data?.Results.map((inst: any) => ({
    params: { instance: `${inst.ID}` }
  }));

  return {
    paths,
    fallback: true
  };
}

const InstancePage: NextPage = () => {
  const router = useRouter();

  const instanceId = router.query.instance;
  const instance = useGetInstanceQuery(
    typeof instanceId === 'string' ? instanceId : skipToken
  );
  const { isLoading, error, data } = instance;

  console.log(data);

  return (
    <Box>
      <SEO
        title={`${data?.Name} - Insntaces - FFXIV`}
        description={`Check some stuff about the ${data?.Name} instance`}
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
                alt={`${data.Name} Icon`}
              />
              <Heading as="h1" pt={2}>
                {data?.Name}
              </Heading>
            </Flex>
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export const getStaticProps = store.getStaticProps(store => async context => {
  const instance = context.params?.classjob;

  if (typeof instance === 'string') {
    store.dispatch(getInstance.initiate(instance));
  }

  await Promise.all(getRunningOperationPromises());

  return {
    props: {}
  };
});

export default InstancePage;
