import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { Box, Heading, SimpleGrid } from '@chakra-ui/react';

import Loading from '@components/feedback/loading';
import Error from '@components/feedback/error';
import Card from '@components/card';
import SEO from '@components/seo';

import { capitalizeString } from '@utils/helpers/capitalizeString';
import { FFXIV_API } from '@utils/constants';

const Instances: NextPage = () => {
  const { isLoading, error, data } = useIndexInstancesQuery({
    query: {
      size: 100,
      sort: [
        {
          ID: 'asc'
        }
      ]
    }
  });

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
              gridTemplateColumns={[
                '1fr',
                '1fr 1fr',
                'repeat(3, 1fr)',
                'repeat(4, 1fr)',
                'repeat(5, 1fr)',
                'repeat(6, 1fr)'
              ]}
              gap={8}
            >
              {data.Results.map((instance, i) =>
                instance?.Name ? (
                  <Link key={i} href={`/ffxiv/instances/${instance.ID}`}>
                    <Card isButton={true}>
                      <Image
                        src={`${FFXIV_API}${instance.Icon}`}
                        width="40"
                        height="40"
                        alt={`${instance.Name} Icon`}
                      />
                      <Heading noOfLines={2} fontSize="2xl" as="h4">
                        {capitalizeString(instance.Name)}
                      </Heading>
                    </Card>
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
