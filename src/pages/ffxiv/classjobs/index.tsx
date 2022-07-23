import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Grid, Heading } from '@chakra-ui/react';

import { useIndexClassJobsQuery } from '@services/api/ffxivApi';
import Loading from '@components/common/feedback/loading';
import Error from '@components/common/feedback/error';
import SEO from '@components/common/seo';
import { FFXIV_API } from '@utils/constants';
import { capitalizeString } from '@utils/helpers/capitalizeString';

const ClassJob: NextPage = () => {
  const classJobs = useIndexClassJobsQuery();
  const { data, error, isLoading } = classJobs;

  // console.log(data);

  return (
    <>
      <SEO title="Class Jobs - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <Heading as="h1">Class Jobs</Heading>
        <Box>
          {error ? (
            <Error />
          ) : isLoading ? (
            <Loading />
          ) : data ? (
            <Grid
              gridTemplateColumns={[
                '1fr',
                '1fr 1fr',
                'repeat(3, 1fr)',
                null,
                'repeat(5, 1fr)'
              ]}
              gap={8}
            >
              {data.Results.map((classJob, i) => (
                <Link key={i} href={`/ffxiv/classjobs/${classJob.ID}`}>
                  <a>
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      flexDir="column"
                      p={8}
                    >
                      <Image
                        src={`${FFXIV_API}${classJob.Icon}`}
                        width="85px"
                        height="80px"
                        alt={`${classJob.Name} Icon`}
                      />
                      <Heading mt={6} fontSize="2xl" as="h4">
                        {capitalizeString(classJob.Name)}
                      </Heading>
                    </Flex>
                  </a>
                </Link>
              ))}
            </Grid>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default ClassJob;
