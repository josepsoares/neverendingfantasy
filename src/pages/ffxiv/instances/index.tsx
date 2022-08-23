import { NextPage } from 'next';

import { useIndexInstancesQuery } from '@services/api/ffxivApi';
import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import SEO from '@components/common/seo';
import Link from 'next/link';
import { capitalizeString } from '@utils/helpers/capitalizeString';
import Image from 'next/image';
import { FFXIV_API } from '@utils/constants';
import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react';

const Instances: NextPage = () => {
  const instances = useIndexInstancesQuery({
    query: {
      size: 100,
      sort: [
        {
          ID: 'asc'
        }
      ]
    }
  });
  const { isLoading, error, data } = instances;

  console.log(data);

  return (
    <>
      <SEO title="Instances - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <Heading color="brand.800" fontSize="8xl" as="h1" pb={8}>
          Instances
        </Heading>
        <Box>
          {error ? (
            <Error />
          ) : isLoading ? (
            <Loading />
          ) : data ? (
            <SimpleGrid
              minChildWidth={['400px', null, '250px']}
              gap={8}
              alignItems="stretch"
              justifyItems="stretch"
            >
              {data.Results.map((instance, i) =>
                instance?.Name ? (
                  <Link key={i} href={`/ffxiv/instances/${instance.ID}`}>
                    <a>
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
                      >
                        <Image
                          src={`${FFXIV_API}${instance.Icon}`}
                          width="40px"
                          height="40px"
                          alt={`${instance.Name} Icon`}
                        />
                        <Heading noOfLines={2} fontSize="2xl" as="h4">
                          {capitalizeString(instance.Name)}
                        </Heading>
                      </Flex>
                    </a>
                  </Link>
                ) : null
              )}
            </SimpleGrid>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default Instances;
