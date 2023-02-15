import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box, Flex, Heading, Image } from '@chakra-ui/react';

import Error from '@components/feedback/error';
import Loading from '@components/feedback/loading';
import SEO from '@components/seo';

import { FFXIV_API } from '@utils/constants';
import { useQuery } from '@tanstack/react-query';
import { getInstance } from '@services/ffxivApi';

const InstancePage: NextPage = () => {
  const router = useRouter();

  const instanceId = router.query.instance;
  const { isLoading, error, data } = useQuery('getInstance', getInstance);

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

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {}
  };
};

export default InstancePage;
