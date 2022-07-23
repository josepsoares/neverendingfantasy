import { NextPage } from 'next';

import { useIndexInstancesQuery } from '@services/api/ffxivApi';
import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import SEO from '@components/common/seo';
import Link from 'next/link';
import { capitalizeString } from '@utils/helpers/capitalizeString';
import Image from 'next/image';
import { FFXIV_API } from '@utils/constants';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';

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
        <Heading as="h1">Instances</Heading>
        <Box>
          {error ? (
            <Error />
          ) : isLoading ? (
            <Loading />
          ) : data ? (
            <SimpleGrid minChildWidth="400px" gap="small">
              {data.Results.map((instance, i) =>
                instance?.Name ? (
                  <Link key={i} href={`/ffxiv/instances/${instance.ID}`}>
                    <a>
                      <Box
                        justify="center"
                        align="center"
                        direction="column"
                        pad="small"
                      >
                        <Image
                          src={`${FFXIV_API}${instance.Icon}`}
                          width="85px"
                          height="80px"
                          alt={`${instance.Name} Icon`}
                        />
                        <Heading margin={{ vertical: 'medium' }} level={4}>
                          {capitalizeString(instance.Name)}
                        </Heading>
                      </Box>
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
