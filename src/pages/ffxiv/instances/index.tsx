import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useIndexInstancesQuery } from '@services/api/ffxivApi';

import { Box, Heading, SimpleGrid } from '@chakra-ui/react';

import Loading from '@components/common/feedback/loading';
import Error from '@components/common/feedback/error';
import SEO from '@components/common/seo';
import Card from '@components/common/card';
import { capitalizeString } from '@utils/helpers/capitalizeString';
import { FFXIV_API } from '@utils/constants';

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
                    <a>
                      <Card isButton={true}>
                        <Image
                          src={`${FFXIV_API}${instance.Icon}`}
                          width="40px"
                          height="40px"
                          alt={`${instance.Name} Icon`}
                        />
                        <Heading noOfLines={2} fontSize="2xl" as="h4">
                          {capitalizeString(instance.Name)}
                        </Heading>
                      </Card>
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
